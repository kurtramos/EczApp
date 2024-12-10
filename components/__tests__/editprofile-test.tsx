import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import React from "react";

import EditProfile from "../../app/(tabs)/editprofile"; // Adjust based on your folder structure
import { firestore } from "../../app/firebaseConfig";


// Mock Firebase and Expo Router
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: { email: "test@example.com" },
  }),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  firestore: {},
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const MockDateTimePicker = ({ value, onChange }) => {
    return null; // Mock implementation of DateTimePicker
  };
  return MockDateTimePicker;
});

describe("EditProfile", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render correctly", () => {
    const { getByPlaceholderText, getByText } = render(<EditProfile />);

    // Check if fields are rendered correctly
    expect(getByPlaceholderText("First Name")).toBeTruthy();
    expect(getByPlaceholderText("Last Name")).toBeTruthy();
    expect(getByPlaceholderText("Phone Number")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByText("Save")).toBeTruthy();
  });

  it("should fetch and populate user data on mount", async () => {
    const mockUserData = {
      firstName: "John",
      lastName: "Doe",
      mobileNumber: "1234567890",
      email: "test@example.com",
      dateOfBirth: { seconds: 1000000000 },
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => mockUserData,
    });

    const { getByPlaceholderText } = render(<EditProfile />);

    await waitFor(() => {
      expect(getByPlaceholderText("First Name").props.value).toBe("John");
      expect(getByPlaceholderText("Last Name").props.value).toBe("Doe");
      expect(getByPlaceholderText("Phone Number").props.value).toBe("1234567890");
      expect(getByPlaceholderText("Email").props.value).toBe("test@example.com");
    });
  });

  it("should handle phone number input correctly", () => {
    const { getByPlaceholderText } = render(<EditProfile />);

    const phoneInput = getByPlaceholderText("Phone Number");
    fireEvent.changeText(phoneInput, "9876543210");

    expect(phoneInput.props.value).toBe("9876543210");
  });

  it("should save profile data and navigate to /myaccount", async () => {
    (updateDoc as jest.Mock).mockResolvedValueOnce(true);
    const { getByText, getByPlaceholderText } = render(<EditProfile />);

    // Fill in the fields
    fireEvent.changeText(getByPlaceholderText("First Name"), "Jane");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "Smith");
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "9876543210");
    fireEvent.changeText(getByPlaceholderText("Date of Birth"), "1990-01-01");

    // Mock the save action
    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(
        doc(firestore, "users", "test@example.com"),
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Smith",
          mobileNumber: "9876543210",
          dateOfBirth: expect.any(Date),
        })
      );
      expect(mockPush).toHaveBeenCalledWith("/myaccount");
    });
  });

  it("should show an error alert if saving fails", async () => {
    (updateDoc as jest.Mock).mockRejectedValueOnce(new Error("Error saving profile"));

    const { getByText, getByPlaceholderText } = render(<EditProfile />);

    fireEvent.changeText(getByPlaceholderText("First Name"), "Jane");
    fireEvent.changeText(getByPlaceholderText("Last Name"), "Smith");

    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const POEMScreen = () => {
  const router = useRouter();
  const [response, setResponse] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
  });

  const selectOption = (question, option) => {
    setResponse((prev) => ({ ...prev, [question]: option }));
  };

  const handleSubmit = async () => {
    // Validate that all questions are answered
    const allQuestionsAnswered = Object.values(response).every(
      (answer) => answer !== null
    );

    if (!allQuestionsAnswered) {
      Alert.alert("Incomplete Survey", "Please answer all questions before submitting.");
      return;
    }

    // Save the responses and redirect to treatment based on score
    await handleSave();
    const totalScore = calculateScore();
    router.push(`/treatment?score=${totalScore}`); // Redirect to treatment page with the score

    resetSurvey();
  };

  const handleSave = async () => {
    const user = getAuth().currentUser;
    const userEmail = user?.email;

    if (!userEmail) {
      console.error("No user is currently logged in.");
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    const totalScore = calculateScore();
    const timestamp = new Date();
    const timestampString = timestamp.toISOString();

    try {
      const docRef = doc(
        firestore,
        "users",
        userEmail,
        "POEMScores",
        timestampString
      );

      await setDoc(docRef, {
        responses: response,
        totalScore: totalScore,
        timestamp: timestamp,
      });

      Alert.alert("Success", "Responses saved successfully!");
    } catch (error) {
      console.error("Error saving responses: ", error);
      Alert.alert("Error", "Failed to save responses.");
    }
  };

  const resetSurvey = () => {
    setResponse({
      question1: null,
      question2: null,
      question3: null,
      question4: null,
      question5: null,
      question6: null,
      question7: null,
    });
  };

  const calculateScore = () => {
    const scoreMapping = {
      "0": 0,
      "1-2": 1,
      "3-4": 2,
      "5-6": 3,
      "7": 4,
    };

    return Object.values(response).reduce((acc, curr) => {
      return acc + (curr ? scoreMapping[curr] : 0);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.title}>POEM</Text>
          <Text style={styles.description}>
            Complete the POEM questionnaire once a week to monitor changes in
            your skin condition. Please answer the following questions
            carefully, rating each on a scale from 0 (lowest) to 7 (highest).
            Your responses will be totaled at the end to indicate the severity
            of your eczema.
          </Text>
        </View>

        {/* Survey Questions */}
        {[
          "Over the last week, on how many days has your/your child’s skin been itchy because of the eczema?",
          "Over the last week, on how many nights has your/your child's sleep been disturbed because of the eczema?",
          "Over the last week, on how many days has your/your child’s skin been bleeding because of the eczema?",
          "Over the last week, on how many days has your/your child’s skin been weeping or oozing clear fluid because of the eczema?",
          "Over the last week, on how many days has your/your child’s skin been cracked because of the eczema?",
          "Over the last week, on how many days has your/your child’s skin been flaking off because of the eczema?",
          "Over the last week, on how many days has your/your child’s skin felt dry or rough because of the eczema?",
        ].map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question}</Text>
            <View style={styles.optionsContainer}>
              {["0", "1-2", "3-4", "5-6", "7"].map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.option,
                    response[`question${index + 1}`] === option &&
                      styles.selectedOption,
                  ]}
                  onPress={() =>
                    selectOption(`question${index + 1}`, option)
                  }
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 35,
    alignItems: "center",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    color: "#74BDB3",
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    color: "black",
    textAlign: "center",
    marginTop: 15,
  },
  questionContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "rgba(195, 239, 228, 0.5)",
    borderRadius: 15,
  },
  question: {
    fontSize: 13,
    color: "black",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  option: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#85D3C0",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: "#85D3C0",
  },
  optionText: {
    fontSize: 13,
    textAlign: "center",
  },
  submitButtonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: "#74BDB3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default POEMScreen;

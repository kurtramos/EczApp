import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
} from "react-native";
import BackArrow from "../components/BackArrow";
import BottomNav from "../components/BottomNav";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { firestore, storage } from "../firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";

const getAccessToken = async () => {
  const user = getAuth().currentUser;
  if (user) {
    console.log(user);
    const token = await user.getIdToken(true);
    console.log("Firebase ID Token:", token);
    return token;
  }
  throw new Error("User not authenticated");
};

const screenWidth = Dimensions.get("window").width;

const CameraScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<any | string>("Processing");
  const [modalMessage, setModalMessage] = useState<any | string>(null);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [saveImageAvailable, setSaveImageAvailable] = useState(true);
  const [surveyDone, setSurveyDone] = useState(false);

  // Check latest image
  useFocusEffect(
    React.useCallback(() => {
      const auth = getAuth();
      const user = auth.currentUser;

      // Get start of week week
      const now = new Date();
      const startOfWeek = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      );

      const checkSurveyDone = async () => {
        if (user) {
          try {
            // Get latest survey
            const poemScoresRef = collection(
              firestore,
              "users",
              user.email,
              "POEMScores"
            );

            const latestSurveyQuery = query(
              poemScoresRef,
              orderBy("timestamp", "desc"),
              limit(1)
            );
            const querySnapshot = await getDocs(latestSurveyQuery);

            // Get latest survey timestamp
            if (!querySnapshot.empty) {
              const latestDoc = querySnapshot.docs[0].data();
              const latestTimestamp = latestDoc.timestamp.toDate();

              // Check if the timestamp is within the current week
              if (latestTimestamp >= startOfWeek) {
                setSurveyDone(true);
              } else {
                setSurveyDone(false);
              }
            } else {
              // No surveys found
              setSurveyDone(false);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert
            (t("camera.alerts.error", "camera.alerts.firestore_retrieve_failed"))
          }
        }
      };

      const checkLastImage = async () => {
        if (user) {
          try {
            // Get latest image
            const poemScoresRef = collection(
              firestore,
              "users",
              user.email,
              "images"
            );

            const latestImageQuery = query(
              poemScoresRef,
              orderBy("timestamp", "desc"),
              limit(1)
            );
            const querySnapshot = await getDocs(latestImageQuery);

            // Get latest image timestamp
            if (!querySnapshot.empty) {
              const latestDoc = querySnapshot.docs[0].data();
              const latestTimestamp = latestDoc.timestamp.toDate();

              // Check if the timestamp is within the current week
              if (latestTimestamp >= startOfWeek) {
                setSaveImageAvailable(false);
              } else {
                setSaveImageAvailable(true);
              }
            } else {
              // No image found
              setSaveImageAvailable(true);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert
            (t("camera.alerts.error", "camera.alerts.firestore_retrieve_failed"))
          }
        }
      };

      checkLastImage();
      checkSurveyDone();
    }, [])
  );

  // Function to open the camera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled && result.assets && result.assets[0].uri) {
        setImageUri(result.assets[0].uri); // Set the captured image URI
        console.log("Camera image URI:", result.assets[0].uri);
      } else {
        console.log("Camera capture was cancelled or URI is undefined");
        Alert.alert(t("camera.alerts.camera_cancelled"));
      }
    } else {
      Alert.alert(t("camera.alerts.camera_permission_not_granted"));
    }
  };

  const openImageGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled && result.assets && result.assets[0].uri) {
        setImageUri(result.assets[0].uri); // Set the selected image URI
        console.log("Gallery image URI:", result.assets[0].uri);
      } else {
        console.log("Image selection was cancelled or URI is undefined");
        Alert.alert(t("camera.alerts.image_selection_cancelled"));
      }
    } else {
      Alert.alert(t("camera.alerts.gallery_permission_not_granted"));
    }
  };

  // Function to save image to Firebase Storage and Firestore
  const saveImage = async () => {
    if (!surveyDone) {
      Alert.alert(
        t("camera.alerts.survey_required")
      );
      return;
    }

    if (!saveImageAvailable) {
      Alert.alert(t("camera.alerts.picture_submitted"));
      return;
    }

    if (!imageUri) {
      Alert.alert(t("camera.alerts.no_image_selected"));
      return;
    }

    try {
      const user = getAuth().currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        Alert.alert(t("camera.alerts.user_not_logged_in"));
        return;
      }

      setModalVisible(true);
      setModalTitle(t("camera.modal.processing"));
      setCloseButtonVisible(false);
      setModalMessage(t("camera.modal.saving_image"));

      // Create a unique path for each image
      const imageName = `images/${userEmail}/${Date.now()}_image.jpg`;
      const storageRef = ref(storage, imageName);

      console.log("Fetching image as blob...");
      const response = await fetch(imageUri);
      const blob = await response.blob();
      console.log("Uploading blob to Firebase Storage...");
      await uploadBytes(storageRef, blob);

      console.log("Getting download URL...");
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);

      // Save the image URL to Firestore
      const imagesCollectionRef = collection(
        firestore,
        "users",
        userEmail,
        "images"
      );
      await addDoc(imagesCollectionRef, {
        imageUrl: downloadURL,
        timestamp: new Date(),
      });

      Alert.alert(t("camera.alerts.image_saved"));

      // Now analyze the severity by sending the image to Vertex AI
      const base64Image = await getBase64FromUri(imageUri);
      analyzeSeverity(base64Image);
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert(t("camera.alerts.image_save_failed"));
    }
  };

  const analyzeSeverity = async (base64Image) => {
    setModalMessage(t("camera.modal.analyzing_image"));
    const BACKEND_URL =
      "https://us-central1-eczemacare-1195e.cloudfunctions.net/predictImage";

    const body = {
      base64Image: base64Image,
    };

    try {
      const token = await getAccessToken(); // Firebase Auth token

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setModalTitle(t("camera.modal.error"));
        setModalMessage(t("camera.modal.cloud_run_error"));
        setCloseButtonVisible(true);
        throw new Error(t("camera.modal.cloud_run_error"))
      }

      const result = await response.json();

      setModalTitle(t("camera.modal.success"));
      setModalMessage(t("camera.modal.saved_and_analyzed"));
      saveAnalysis(result);
      console.log("Cloud Run results:", result);
    } catch (error) {
      setModalTitle(t("camera.modal.error"));
      setModalMessage(t("camera.modal.cloud_run_connect_error"))
      setCloseButtonVisible(true);
      console.error("Something went wrong in connecting to Cloud Run:", error);
      Alert.alert(t("camera.alerts.prediction_error", "camera.alerts.analyze_failed"))
    }
  };

  const saveAnalysis = async (analysisResult) => {
    try {
      const user = getAuth().currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        console.error("No user is logged in.");
        Alert.alert(t("camera.alerts.error", "camera.alerts.user_not_logged_in"))
        return;
      }

      const timestamp = new Date();
      const timestampString = timestamp.toISOString();

      const docRef = doc(
        firestore,
        "users",
        userEmail,
        "skinAnalysis",
        timestampString
      );

      // Save analysis result to Firestore
      await setDoc(docRef, {
        result: analysisResult,
        timestamp: timestamp,
      });

      console.log("Analysis saved successfully:", analysisResult);

      // Update modal and navigate
      setModalTitle(t("camera.modal.success"));
      setModalMessage(t("camera.modal.analysis_saved"))
      setModalVisible(false);
      router.push("/treatment");
    } catch (error) {
      console.error("Error saving analysis to Firestore:", error);
      setModalTitle(t("camera.modal.error"));
      setModalMessage(t("camera.modal.analysis_save_failed"))
      setCloseButtonVisible(true);
      Alert.alert(t("camera.alerts.error", "camera.alerts.analysis_save_failed"))
    }
  };

  const getBase64FromUri = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.back()} />

        <Text style={styles.header}> {t("camera.header")}</Text>


      {/* Display the selected image in the placeholder area if it exists */}
      <TouchableOpacity
        style={styles.cameraPlaceholder}
        onPress={!imageUri ? openCamera : null}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.cameraPlaceholderImage}
          />
        ) : (
          <Text style={styles.placeholderText}>
            {t("camera.placeholder_text")}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
          <Text style={styles.buttonText}>{t("camera.retake_button")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={openImageGallery}
        >
          <Text style={styles.buttonText}>
            {t("camera.image_upload_button")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={saveImage}>
          <Text style={styles.buttonText}>{t("camera.save_button")}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.galleryButton}
        onPress={() => router.push("/gallery")}
      >
        <Text style={styles.galleryText}>{t("camera.gallery_button")}</Text>
      </TouchableOpacity>

      <BottomNav />

      {/* Result modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>{modalTitle}</Text>
          <Text style={styles.message}>{modalMessage}</Text>
          {closeButtonVisible && (
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{t("camera.button.close")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 35,
    color: "#74BDB3",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 32,
    color: "#85D3C0",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 3,
  },
  cameraPlaceholder: {
    width: screenWidth - 40,
    height: 330,
    backgroundColor: "black",
    borderRadius: 13,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPlaceholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
    resizeMode: "cover",
  },
  placeholderText: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#85D3C0",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
  },
  galleryButton: {
    backgroundColor: "rgba(132.89, 211.21, 192.41, 0.42)",
    borderRadius: 13,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  galleryText: {
    color: "#5D9386",
    fontSize: 14,
    fontWeight: "400",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E8E8E8",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 4,
  },
  message: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  closeModalButton: {
    backgroundColor: "#85D3C0",
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 150,
    marginTop: 20,
  },
});

export default CameraScreen;

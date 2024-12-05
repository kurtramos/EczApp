import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";

const POEMScreen = () => {
  const { t } = useTranslation();
  const [surveyAvailable, setSurveyAvailable] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [modalTitle, setModalTitle] = useState<any | string>("Processing");
  const [modalMessage, setModalMessage] = useState<any | string>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseButtonVisible, setresponseButtonVisible] = useState(false);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      const checkLastSurvey = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

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
              const now = new Date();
              const startOfWeek = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - now.getDay()
              );

              if (latestTimestamp >= startOfWeek) {
                setSurveyAvailable(false);
              } else {
                setSurveyAvailable(true);
              }
            } else {
              // No surveys found
              setSurveyAvailable(true);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert(
              "Error",
              "Failed to retrieve user data from Firestore."
            );
          }
        }
        setLoading(false); // Set loading to false once the data is fetched
      };

      checkLastSurvey();
    }, [])
  );

  const selectOption = (question, option) => {
    setResponse((prev) => ({ ...prev, [question]: option }));
  };

  const handleSubmit = async () => {
    const allQuestionsAnswered = Object.values(response).every(
      (answer) => answer !== null
    );

    if (!allQuestionsAnswered) {
      Alert.alert(
        t("poem_survey.alerts.incomplete_survey.title"),
        t("poem_survey.alerts.incomplete_survey.message")
      );
      return;
    }

    setModalTitle(t("modal.submit_title"));
    setModalMessage(t("modal.submit_message"));
    setresponseButtonVisible(true);
    setCloseButtonVisible(false);
    setNextButtonVisible(false);
    setModalVisible(true);
  };

  const handleSave = async () => {
    setModalTitle(t("modal.saving_title"));
    setModalMessage(t("modal.saving_message"));
    setresponseButtonVisible(false);

    const user = getAuth().currentUser;
    const userEmail = user?.email;

    if (!userEmail) {
      console.error(t("errors.no_user_logged_in"));
      Alert.alert(t("errors.error_title"), t("errors.no_user_logged_in"));
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

      setModalTitle(t("modal.success_title"));
      setModalMessage(t("modal.success_message"));
      setCloseButtonVisible(false);
      setNextButtonVisible(true);
      resetSurvey();
    } catch (error) {
      setCloseButtonVisible(true);
      console.error("Error saving responses: ", error);
      Alert.alert(
        t("poem_survey.alerts.error.title"),
        t("poem_survey.alerts.error.message")
      );
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

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.titleloading}>{t("poem_survey.titleloading")}</Text>
          <Text style={styles.loadingText}>{t("poem_survey.loading")}</Text>
        </View>
      ) : !surveyAvailable ? (
        <View style={styles.header}>
          <Text style={styles.title}>{t("poem_survey.title")}</Text>
          <Text style={styles.description}>{t("poem_survey.unavailable")}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("poem_survey.title")}</Text>
            <Text style={styles.description}>
              {t("poem_survey.description")}
            </Text>
          </View>

          {/* Survey Questions */}
          {t("poem_survey.questions", { returnObjects: true }).map(
            (question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>{question}</Text>
                <View style={styles.optionsContainer}>
                  {["0", "1-2", "3-4", "5-6", "7"].map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.option, response[`question${index + 1}`] === option && styles.selectedOption]}
                      onPress={() => selectOption(`question${index + 1}`, option)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )
          )}

          {/* Submit Button */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>{t("poem_survey.submit_button")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <BottomNav />

      {/* Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{modalTitle}</Text>
          <Text style={styles.message}>{modalMessage}</Text>
          {responseButtonVisible && (
            <View>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={handleSave}
              >
                <Text style={styles.submitButtonText}>{t("modal.submit")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.submitButtonText}>{t("modal.cancel")}</Text>
              </TouchableOpacity>
            </View>
          )}
          {closeButtonVisible && (
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitButtonText}>{t("modal.close")}</Text>
            </TouchableOpacity>
          )}
          {nextButtonVisible && (
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => router.push("/camera")}
            >
              <Text style={styles.submitButtonText}>{t("modal.next")}</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
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
    fontSize: 36,
    color: "#74BDB3",
    fontWeight: "700",
  },
  titleloading: {
    fontSize: 36,
    color: "#74BDB3",
    fontWeight: "700",
    padding: 5,
    textAlign: "center",
    
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
  cancelButton: {
    backgroundColor: "#DD6764",
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 150,
    marginTop: 20,
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

export default POEMScreen;

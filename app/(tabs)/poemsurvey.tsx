import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Notifications from 'expo-notifications';
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

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

  const handleSubmit = () => {
    const allQuestionsAnswered = Object.values(response).every((answer) => answer !== null);
  
    if (allQuestionsAnswered) {
      handleSave();
    } else {
      alert("Please answer all questions before submitting.");
    }
  };
  
  const handleSave = async () => {
    const user = getAuth().currentUser;
    const userEmail = user?.email;

    if (!userEmail) {
      console.error("No user is currently logged in.");
      alert("No user is currently logged in.");
      return;
    }

    const totalScore = calculateScore();
    const timestamp = new Date();
    const timestampString = timestamp.toISOString();

    try {
      const docRef = doc(firestore, "users", userEmail, "POEMSurvey", "lastSurvey");
      await setDoc(docRef, {
        responses: response,
        totalScore: totalScore,
        lastSurveyDate: timestampString,
      });
  // Add notification document in Firestore
  const notificationsRef = collection(firestore, "users", userEmail, "notifications");
  await addDoc(notificationsRef, {
    title: "Please Take Your Survey",
    details: "It has been a week since your last POEM survey.",
    timestamp: timestamp,
  });
      alert("Responses saved successfully!");
      scheduleSurveyReminder();
      router.push("/treatment");
    } catch (error) {
      console.error("Error saving responses: ", error);
      alert("Failed to save responses.");
    }
  };

  const calculateScore = () => {
    const scoreMapping = {
      "0": 0,
      "1-2": 1,
      "3-4": 2,
      "5-6": 3,
      "7": 4,
    };

    const totalScore = Object.values(response).reduce((acc, curr) => {
      return acc + (curr ? scoreMapping[curr] : 0);
    }, 0);

    return totalScore;
  };

  const scheduleSurveyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Survey Reminder",
        body: "It's time to take your weekly POEM survey!",
        sound: false,
      },
      trigger: {
        seconds: 5 // 7 days in seconds
      },
    });
  };

  return (
    <View style={styles.container}>
    <BackArrow onPress={() => router.push("/home")} />
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <Text style={styles.title}>POEM</Text>
        <Text style={styles.description}>
          Complete the POEM questionnaire once a week to monitor changes in your skin condition.
        </Text>
        <Text style={styles.description}>
          Read and answer the questions carefully before submitting. Your total score will indicate eczema severity.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your/your child’s skin been
          itchy because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question1 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question1", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many nights has your/your child's sleep
          been disturbed because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question2 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question2", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your/your child’s skin been
          bleeding because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question3 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question3", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your/your child’s skin been
          weeping or oozing clear fluid because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question4 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question4", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your/your child’s skin been
          cracked because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question5 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question5", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your /your child’s skin
          been flaking off because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question6 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question6", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          Over the last week, on how many days has your/your child’s skin felt
          dry or rough because of the eczema?
        </Text>
        <View style={styles.optionsContainer}>
          {["0", "1-2", "3-4", "5-6", "7"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                response.question7 === option && styles.selectedOption,
              ]}
              onPress={() => selectOption("question7", option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.poemEnd}></View>
    </ScrollView>
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

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
    paddingBottom: 100, // Added space to prevent overlap with the BottomNav
  },
  header: {
    padding: 35,
    alignItems: "center",
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
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
  poemEnd: {
    padding: 0,
  },
  submitButton: {
    backgroundColor: "#74BDB3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 95, 
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default POEMScreen;

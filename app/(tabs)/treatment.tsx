import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import BottomNav from "../components/BottomNav";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
import { firestore } from "../firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const Treatment = () => {
  const router = useRouter();
  const [poemScore, setPoemScore] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchScore = async () => {
        const user = getAuth().currentUser;
        const userEmail = user?.email;

        if (!userEmail) {
          console.error("No user is currently logged in.");
          alert("No user is currently logged in.");
          return;
        }

        const scoresRef = collection(
          firestore,
          "users",
          userEmail,
          "POEMScores"
        );

        try {
          const scoreQuery = query(
            scoresRef,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(scoreQuery);

          if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            const { totalScore } = latestDoc.data();

            setPoemScore(totalScore ?? "No score available");
          } else {
            console.log("No scores found.");
          }
        } catch (error) {
          console.error("Error fetching score: ", error);
        }
      };

      fetchScore();
    }, [])
  );

  const { level, message } = getSeverityLevel(poemScore);

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/tracker")} />
      <Text style={styles.heading}>POEM RESULT</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.squareBackground}>
          <Text style={styles.subheading}>Your POEM score is:</Text>
          <Text style={styles.poemScore}>{poemScore}</Text>
          <Text style={styles.severityLabel}>Severity Level:</Text>
          <Text style={styles.severityValue}>{level}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};


  const getSeverityLevel = (score) => {
    switch (true) {
      case score <= 2:
        return {
          level: "Clear",
          message: "Your skin is clear, with minimal eczema symptoms. Continue using your doctor's prescribed daily skincare."
        };
      case score >= 3 && score <= 7:
        return {
          level: "Mild",
          message: "Mild eczema symptoms detected. Keep monitoring your skin condition. You may continue using your doctor's prescribed daily skincare, keep the affected area moisturized/hydrated."
        };
      case score >= 8 && score <= 16:
        return {
          level: "Moderate",
          message: "Moderate eczema symptoms are present. Consider consulting a healthcare provider."
        };
      case score >= 17 && score <= 24:
        return {
          level: "Severe",
          message: "Severe eczema symptoms detected. It’s recommended to seek medical advice."
        };
      case score >= 25:
        return {
          level: "Very Severe",
          message: "Very severe eczema symptoms. Please consult a healthcare provider immediately."
        };
      default:
        return {
          level: "Unknown",
          message: "Score out of range. Please check your input."
        };
    }
  };
  

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  squareBackground: {
    backgroundColor: "#C3EFE5",
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "stretch",
    padding: 30,
  },
  heading: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 48,
    marginLeft: 120,
  },
  subheading: {
    fontSize: 25,
    color: "#74BDB3",
    fontWeight: "bold",
    textAlign: "left",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 20,
    marginTop: 30,
  },
  poemScore: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  severityLabel: {
    fontSize: 25,
    color: "#74BDB3",
    fontWeight: "bold",
    marginTop: 20,
  },
  severityValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  message: {  
    fontSize: 16,
    color: "grey",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
});


export default Treatment;

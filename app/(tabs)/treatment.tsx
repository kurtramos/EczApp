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
import { useTranslation } from "react-i18next";

const Treatment = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [poemScore, setPoemScore] = useState(0);
  const [poemDate, setPoemDate] = useState(""); // State to hold POEM survey date
  const [analysisLabel, setAnalysisLabel] = useState(null);
  const [analysisDate, setAnalysisDate] = useState(""); // State to hold Skin Analysis date

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
            const { totalScore, timestamp } = latestDoc.data();

            setPoemScore(totalScore ?? "No score available");
            setPoemDate(
              timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : "Unknown"
            ); // Format the date
          } else {
            console.log("No scores found.");
          }
        } catch (error) {
          console.error("Error fetching score: ", error);
        }
      };

      const fetchAnalysis = async () => {
        const user = getAuth().currentUser;
        const userEmail = user?.email;

        if (!userEmail) {
          console.error("No user is currently logged in.");
          alert("No user is currently logged in.");
          return;
        }

        const analysisRef = collection(
          firestore,
          "users",
          userEmail,
          "skinAnalysis"
        );

        try {
          const analysisQuery = query(
            analysisRef,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(analysisQuery);

          if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            const { result, timestamp } = latestDoc.data();

            const label = result?.predictions?.[0]?.label
              ? result.predictions[0].label
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())
              : "No result available";

            setAnalysisLabel(label);
            setAnalysisDate(
              timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : "Unknown"
            ); // Format the date
          } else {
            console.log("No result found.");
          }
        } catch (error) {
          console.error("Error fetching analysis: ", error);
        }
      };

      fetchScore();
      fetchAnalysis();
    }, [])
  );

  const getSeverityLevel = (score) => {
    switch (true) {
      case score <= 2:
        return {
          level: t("account.clear"),
          message: t("account.clear_message"),
        };
      case score >= 3 && score <= 7:
        return {
          level: t("account.mild"),
          message: t("account.mild_message"),
        };
      case score >= 8 && score <= 16:
        return {
          level: t("account.moderate"),
          message: t("account.moderate_message"),
        };
      case score >= 17 && score <= 24:
        return {
          level: t("account.severe"),
          message: t("account.severe_message"),
        };
      case score >= 25:
        return {
          level: t("account.very_severe"),
          message: t("account.very_severe_message"),
        };
      default:
        return {
          level: t("account.unknown"),
          message: t("account.unknown_message"),
        };
    }
  };

  const { level, message } = getSeverityLevel(poemScore);

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.back()} />
      <Text style={styles.heading}>{t("poem_result.poem_result")}</Text>
      <ScrollView style={styles.scrollView}>
        {/* Block for POEM Score */}
        <View style={styles.sectionContainer}>
          <View style={styles.squareBackground}>
            <Text style={styles.sectionHeading}>{t("poem_result.heading")}</Text>
            <Text style={styles.dateText}>
              {t("poem_result.date_taken")}: {poemDate}
            </Text>
            <Text style={styles.subheading}>{t("poem_result.score")}:</Text>
            <Text style={styles.poemScore}>{poemScore}</Text>
            <Text style={styles.severityLabel}>
              {t("poem_result.severity_level")}
            </Text>
            <Text style={styles.severityValue}>{level}</Text>
            <Text style={styles.message}>{message}</Text>
            {poemScore >= 8 && (
              <View style={styles.redirectButtonContainer}>
                <TouchableOpacity
                  style={styles.redirectButton}
                  onPress={() => router.push("/aboutus")}
                >
                  <Text style={styles.redirectButtonText}>
                    {t("poem_result.consult_allergist")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Block for Skin Analysis */}
        <View style={styles.sectionContainer}>
          <View style={styles.squareBackground}>
            <Text style={styles.sectionHeading}>
              {t("poem_result.heading2")}
            </Text>
            <Text style={styles.dateText}>
              {t("poem_result.date_taken")}: {analysisDate}
            </Text>
            <Text style={styles.severityLabel}>
              {t("poem_result.severity_level")}
            </Text>
            <Text style={styles.severityValue}>{analysisLabel}</Text>
            <Text style={styles.message}>
              {t("poem_result.imagemessage")}
            </Text>
          </View>
        </View>

        {/* Disclaimer Section */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.sectionHeading}>
              {t("imagerecogdisclaimer.heading")}
            </Text>
            <Text style={styles.disclaimerText}>
              {t("imagerecogdisclaimer.text2")}
            </Text>
            <Text style={styles.disclaimerText}>
              {t("imagerecogdisclaimer.text3")}
            </Text>
          </View>

      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    marginBottom: 80,
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
    marginTop: -5,
    marginBottom: 25,
    alignSelf: "stretch",
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 45,
  },
  dateText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    // marginVertical: 5,
  },
  subheading: {
    fontSize: 25,
    color: "#74BDB3",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5
  },
  poemScore: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  severityLabel: {
    fontSize: 25,
    color: "#74BDB3",
    fontWeight: "bold",
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
    marginTop: 5,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: -10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center",
  },
  redirectButtonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  redirectButton: {
    backgroundColor: "#85D3C0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  redirectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  disclaimerContainer: {
    marginTop: 0,
    padding: 15,
    marginBottom: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingBottom: 5,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',  // Center-align the disclaimer text
  },
});

export default Treatment;

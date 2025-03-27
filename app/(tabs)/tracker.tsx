import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import BackArrow from "../components/BackArrow";
import { useRouter, useFocusEffect } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
};

const months = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

interface ScoreData {
  totalScore: number;
  timestamp: any;
}

const currentDate = new Date();
const currentMonth = currentDate
  .toLocaleString("default", { month: "short" })
  .toUpperCase();

const TrackerScreen = () => {
  const [scores, setScores] = useState<number[]>([]); // For POEM Scores
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // Function to determine severity level based on the score
  const getSeverityLevel = (score: number) => {
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

  // Fetching scores from the database
  useFocusEffect(
    React.useCallback(() => {
      const fetchScores = async () => {
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
        const scoresQuery = query(scoresRef, orderBy("timestamp", "desc"));

        try {
          const querySnapshot = await getDocs(scoresQuery);
          const fetchedScores: number[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as ScoreData;
            fetchedScores.push(data.totalScore);
          });

          setScores(fetchedScores.reverse());
        } catch (error) {
          console.error("Error fetching scores: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchScores();
      setMonth(currentMonth);
      setYear(currentDate.getFullYear().toString());
    }, [])
  );

  // Filtering scores based on selected month and year
  useFocusEffect(
    React.useCallback(() => {
      const filterScores = async () => {
        const user = getAuth().currentUser;
        const userEmail = user?.email;

        if (!userEmail) return;

        const scoresRef = collection(
          firestore,
          "users",
          userEmail,
          "POEMScores"
        );
        const scoresQuery = query(scoresRef, orderBy("timestamp", "desc"));

        try {
          const querySnapshot = await getDocs(scoresQuery);
          const filteredScores: number[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as ScoreData;
            const date = data.timestamp.toDate();
            const dataMonth = date
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const dataYear = date.getFullYear().toString();

            if (dataMonth === month && dataYear === year) {
              filteredScores.push(data.totalScore);
            }
          });

          setScores(filteredScores.reverse());
        } catch (error) {
          console.error("Error filtering scores: ", error);
        } finally {
          setLoading(false);
        }
      };

      filterScores();
    }, [month, year])
  );

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
    (2020 + i).toString()
  );

  // chartData for POEM Survey Scores (used for both charts)
  const chartData = {
    labels:
      scores.length > 0
        ? scores.map((_, index) => (index + 1).toString())
        : ["0"],
    datasets: [
      {
        data: scores.length > 0 ? scores : [0],
        strokeWidth: 2,
      },
    ],
  };

  // chartData2 for Image Recognition Severity Levels based on POEM Scores
  const chartData2 = {
    labels:
      scores.length > 0
        ? scores.map((score) => getSeverityLevel(score).level)
        : ["Clear"], // Default to Clear if no scores
    datasets: [
      {
        data: scores.length > 0 ? scores : [0], // Use the POEM survey scores for the data
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.titleloading}>{t("tracker.titleloading")}</Text>
            <Text style={styles.loadingText}>{t("tracker.loading")}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.header}>{t("tracker.header")}</Text>

            <View style={styles.dateContainer}>
              <TouchableOpacity style={styles.buttonMonth} onPress={() => setMonthModalVisible(true)}>
                <Text style={styles.buttonText}>{month}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonYear} onPress={() => setYearModalVisible(true)}>
                <Text style={styles.buttonText}>{year}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.chartTitle}>{t("tracker.poemgraphtitle")}</Text>
            <LineChart
              data={chartData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero={true}
            />

            <Text style={styles.chartTitle}>{t("tracker.imagegraphtitle")}</Text>
            <View style={styles.graphContainer}>
  {/* Graph on the left */}
  <LineChart
    data={{
      labels: scores.map((_, index) => (index + 1).toString()), // X-axis labels
      datasets: [{ data: scores }],
    }}
    width={screenWidth * 0.7} // Slightly reduced width
    height={200}
    chartConfig={chartConfig}
    bezier
  />

  {/* Severity Labels on the Right */}
  <View style={styles.severityLabels}>
    {scores.map((score, index) => (
      <Text key={index} style={styles.severityText}>
        {getSeverityLevel(score).level} {/* Matches severity to score */}
      </Text>
    ))}
  </View>
</View>


            <TouchableOpacity style={styles.button} onPress={() => router.push("/treatment")}>
              <Text style={styles.buttonText}>{t("tracker.poemSurveyResult")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/medication")}>
              <Text style={styles.buttonText}>{t("tracker.medication")}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <BottomNav />

      {/* Month Modal */}
      <Modal visible={monthModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={months}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => {
                setMonth(item);
                setMonthModalVisible(false);
              }}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal visible={yearModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={years}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => {
                setYear(item);
                setYearModalVisible(false);
              }}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 100,
  },
  header: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 20,
    color: "#74BDB3",
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#74BDB3",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginBottom: 20,
  },
  buttonMonth: {
    backgroundColor: "#74BDB3",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 10,
    width: 70,
    alignItems: "center",
  },
  buttonYear: {
    backgroundColor: "#74BDB3",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10,
    width: 70,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 4,
  },
  modalItem: {
    padding: 15,
    backgroundColor: "#74BDB3",
    marginVertical: 5,
    borderRadius: 20,
    width: 150,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
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
  titleloading: {
    fontSize: 36,
    color: "#74BDB3",
    fontWeight: "700",
    padding: 5,
    textAlign: "center",
  },
  graphContainer: {
    flexDirection: "row", // Places graph on the left, labels on the right
    alignItems: "center",
  },
  severityLabels: {
    justifyContent: "space-between",
    height: 200, // Matches graph height
    marginLeft: 10, // Creates space between graph and labels
  },
  severityText: {
    fontSize: 14,
    color: "#85D3C0",
    textAlign: "left",
  },
});

export default TrackerScreen;

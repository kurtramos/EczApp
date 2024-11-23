import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
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
  const [scores, setScores] = useState<number[]>([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const router = useRouter();

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

          // Sort descending and update state
          setScores(fetchedScores.reverse());
        } catch (error) {
          console.error("Error fetching scores: ", error);
        }
      };

      fetchScores();

      setMonth(currentMonth);
      setYear(currentDate.getFullYear().toString());
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const filterScores = async () => {
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
          const filteredScores: number[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as ScoreData;

            // Convert Firestore timestamp to JavaScript Date
            const date = data.timestamp.toDate();

            // Check if the year and month match the selected ones
            const dataMonth = date
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            const dataYear = date.getFullYear().toString();

            if (dataMonth === month && dataYear === year) {
              filteredScores.push(data.totalScore);
            }
          });

          setScores(filteredScores.reverse()); // Update state with filtered scores
        } catch (error) {
          console.error("Error filtering scores: ", error);
        }
      };

      filterScores();
    }, [month, year]) // Depend on month and year
  );

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
    (2020 + i).toString()
  );

  const openMonthModal = () => setMonthModalVisible(true);
  const openYearModal = () => setYearModalVisible(true);

  const handleMonthChange = (selectedMonth: string) => {
    setMonth(selectedMonth);
    setMonthModalVisible(false);
  };

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear);
    setYearModalVisible(false);
  };

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

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <Text style={styles.header}>TRACKER</Text>
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.buttonMonth} onPress={openMonthModal}>
          <Text style={styles.buttonText}>{month}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonYear} onPress={openYearModal}>
          <Text style={styles.buttonText}>{year}</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={chartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/treatment");
        }}
      >
        <Text style={styles.buttonText}>POEM SURVEY RESULT</Text>
      </TouchableOpacity>
      <BottomNav />

      {/* Month Modal */}
      <Modal
        visible={monthModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={months}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleMonthChange(item)}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Year Modal */}
      <Modal
        visible={yearModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={years}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleYearChange(item)}
              >
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
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 45,
  },
  header: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    marginBottom: 50,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    gap: 2,
  },
  buttonMonth: {
    backgroundColor: "#74BDB3",
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 70,
    alignItems: "center",
  },
  buttonYear: {
    backgroundColor: "#74BDB3",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    paddingHorizontal: 15,
    paddingVertical: 15,
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
});

export default TrackerScreen;

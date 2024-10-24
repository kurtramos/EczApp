import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
};

interface ScoreData {
  totalScore: number;
  timestamp: any;
}

const TrackerScreen = () => {
  const [scores, setScores] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchScores = async () => {
      const user = getAuth().currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        console.error("No user is currently logged in.");
        alert("No user is currently logged in.");
        return;
      }

      const scoresRef = collection(firestore, "users", userEmail, "POEMScores");
      const scoresQuery = query(
        scoresRef,
        orderBy("timestamp", "desc"),
        limit(10)
      );

      try {
        const querySnapshot = await getDocs(scoresQuery);
        const fetchedScores: number[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as ScoreData;
          fetchedScores.push(data.totalScore);
        });

        // Sort descending and update state
        setScores(fetchedScores.reverse());
        console.log(scores);
      } catch (error) {
        console.error("Error fetching scores: ", error);
      }
    };

    fetchScores();
  }, []);

  const chartData = {
    labels: scores.map((_, index) => (index + 1).toString()),
    datasets: [
      {
        data: scores,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <Text style={styles.header}>Tracker</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>POEM Score</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Treatment</Text>
      </TouchableOpacity>
      <BottomNav />
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
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "600",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#85D3C0",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "70%", // Adjusted for full width
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TrackerScreen;

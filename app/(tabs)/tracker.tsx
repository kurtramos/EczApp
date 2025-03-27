import React, { useState, useEffect, useRef } from "react";
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
    const [poemScores, setPoemScores] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
    const chartRefY = useRef(0);
  

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
      const fetchScores = async () => {
        setLoading(true);
        const user = getAuth().currentUser;
        const userEmail = user?.email;
  
        if (!userEmail) {
          console.error("No user is currently logged in.");
          alert("No user is currently logged in.");
          return;
        }
  
        const scoresRef = collection(firestore, "users", userEmail, "POEMScores");
        const scoresQuery = query(scoresRef, orderBy("timestamp", "desc"));
        
        try {
          const querySnapshot = await getDocs(scoresQuery);
          const filteredScores: number[] = [];
          const scoresData = querySnapshot.docs
            .map((doc) => {
              const data = doc.data();
              const date = data.timestamp.toDate();
              const dataMonth = date
                .toLocaleString("default", { month: "short" })
                .toUpperCase();
              const dataYear = date.getFullYear().toString();
  
              if (dataMonth === month && dataYear === year) {
                filteredScores.push(data.totalScore);
                return {
                  date: date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : "",
                  score: data.totalScore,
                  severity: getSeverityLevel(data.totalScore),
                };
              }
              return null;
            })
            .filter(Boolean);
          
          setScores(filteredScores.reverse());
          setPoemScores(scoresData.reverse());
        } catch (error) {
          console.error("Error fetching and filtering scores: ", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchScores();
    }, [month, year])
  );
  

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
    (2020 + i).toString()
  );

  const fetchPoemScores = async () => {
    setLoading(true);
    const user = getAuth().currentUser;
    if (!user) return; // Guard clause if user is not found
  
    const scoresRef = collection(firestore, "users", user.email, "POEMScores");
    const scoresQuery = query(scoresRef, orderBy("timestamp", "desc"));
    
    try {
      const querySnapshot = await getDocs(scoresQuery);
      const scoresData = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const date = data.timestamp?.toDate();
          const monthName = date
            ?.toLocaleString("default", { month: "short" })
            .toUpperCase();
          const yearStr = date?.getFullYear().toString();
  
          if (monthName === month && yearStr === year) {
            return {
              date: date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : "",
              score: data.totalScore,
              severity: getSeverityLevel(data.totalScore),
            };
          }
          return null;
        })
        .filter(Boolean);
  
      setPoemScores(scoresData.reverse());
    } catch (error) {
      console.error("Error fetching POEM scores: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  const data = {
    labels: poemScores.length
      ? poemScores.map((s, i) => (i + 1).toString())
      : ["0"],
    datasets: [
      {
        data: poemScores.length ? poemScores.map((s) => s.score) : [0],
        color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
    propsForLabels: {
      fontSize: 10,
      rotation: 0,
    },
  };

  const chartConfig2 = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
    propsForLabels: {
      fontSize: 10,
      rotation: 0,
    },
  };

  const handleDataPointClick = (data) => {
    const index = data.index;
    const selectedData = poemScores[index];
    if (selectedData) setSelectedSurvey(selectedData);
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

            <Text style={styles.poemresultguide}>
            {t("poem_result.graph_guide")} {"\n"}{"\n"}
              0 to 2 = {t("poem_result.clear")} {"\n"}
              3 to 7 = {t("poem_result.mild")} {"\n"}
              8 to 16 = {t("poem_result.moderate")} {"\n"}
              17 to 24 = {t("poem_result.severe")} {"\n"}
              25 to 28 = {t("poem_result.very_severe")} {"\n"} {"\n"}
              {t("poem_result.week_numbers")}
            </Text>

            <View style={styles.dateContainer}>
              <TouchableOpacity style={styles.buttonMonth} onPress={() => setMonthModalVisible(true)}>
                <Text style={styles.buttonText}>{month}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonYear} onPress={() => setYearModalVisible(true)}>
                <Text style={styles.buttonText}>{year}</Text>
              </TouchableOpacity>
            </View>

           <View onLayout={(e) => (chartRefY.current = e.nativeEvent.layout.y)}>
                    <Text style={styles.sectionTitle}>
                      {t("account.poem_score_trend")}
                    </Text>
                    <LineChart
                      data={data}
                      width={screenWidth - 32}
                      height={220}
                      chartConfig={chartConfig}
                      bezier
                      style={styles.chart}
                      onDataPointClick={handleDataPointClick}
                      formatXLabel={(label) => label}
                    />
                  </View>
          
                  <Text style={styles.sectionTitle}>
                    {t("account.image_score_trend")}
                  </Text>
                  <LineChart
                    data={data}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig2}
                    bezier
                    style={styles.chart}
                    onDataPointClick={handleDataPointClick}
                  />

                  {selectedSurvey ? (
                            <>
                              <View style={styles.treatmentContainer}>
                                <Text style={styles.treatmentHeader}>
                                  {t("account.previous_survey_info")}
                                </Text>
                                <Text style={styles.treatmentText}>
                                  {t("poem_result.date_taken")}: {selectedSurvey.date}
                                </Text>
                                <Text style={styles.treatmentText}>
                                  {t("account.score")}: {selectedSurvey.score}
                                </Text>
                                <Text style={styles.treatmentText}>
                                  {t("account.severity_level")}: {selectedSurvey.severity.level}
                                </Text>
                                <Text style={styles.treatmentMessage}>
                                  {selectedSurvey.severity.message}
                                </Text>
                              </View>
                              </>
                          ) : (
                            <Text style={styles.noSurveyText}>
                              {t("account.select_data_point")}
                            </Text>
                          )}
                  
                          {selectedSurvey ? (
                            <>
                              <View style={styles.treatmentContainer}>
                                <Text style={styles.treatmentHeader}>
                                  {t("poem_result.heading3")}
                                </Text>
                                <Text style={styles.treatmentText}>
                                  {t("poem_result.date_taken")}: {selectedSurvey.date}
                                </Text>
                                {/* <Text style={styles.treatmentText}>
                                  {t("account.score")}: {selectedSurvey.score}
                                </Text> */}
                                <Text style={styles.treatmentText}>
                                  {t("account.severity_level")}: {selectedSurvey.severity.level}
                                </Text>
                                <Text style={styles.treatmentMessage}>
                                  {t("poem_result.imagemessage")}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <Text style={styles.noSurveyText}>
                              {t("account.select_data_point2")}
                            </Text>
                          )}
                  


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
    // paddingHorizontal: 20
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
  // chart: {
  //   marginVertical: 8,
  // },
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
    marginTop: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#74BDB3",
    marginTop: 20,
    textAlign: "center",
  },
  chart: { marginVertical: 8, borderRadius: 16 },
  treatmentContainer: {
    backgroundColor: "#E8F4F2",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",  // Ensures it matches the full width of the parent container
    alignSelf: "center", // Centers it horizontally if there’s extra space
  },
  treatmentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#74BDB3",
    textAlign: "center",
    marginBottom: 10,
  },
  treatmentText: { fontSize: 16, color: "black", textAlign: "center" },
  treatmentMessage: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  poemresultguide: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: -20,
  },
  noSurveyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default TrackerScreen;

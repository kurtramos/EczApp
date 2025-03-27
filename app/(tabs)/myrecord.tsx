import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;
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
const currentDate = new Date();
const currentMonth = currentDate
  .toLocaleString("default", { month: "short" })
  .toUpperCase();

const MyRecordScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const scrollRef = useRef(null);
  const chartRefY = useRef(0);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: null,
    phoneNumber: "",
    email: "",
    isVerified: false,
  });
  const [poemScores, setPoemScores] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentDate.getFullYear().toString());
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [analysisLabel, setAnalysisLabel] = useState(null);
  const [analysisDate, setAnalysisDate] = useState("");
  const [refresh, setRefresh] = useState(false);

  const user = getAuth().currentUser;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
    (2020 + i).toString()
  );

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPoemScores();
    }
  }, [month, year, refresh]);

  const fetchUserProfile = async () => {
    const userDocRef = doc(firestore, "users", user.email);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        age: data.dateOfBirth ? calculateAge(data.dateOfBirth) : null,
        phoneNumber: data.mobileNumber || "N/A",
        email: data.email || user.email,
        isVerified: data.isVerified || false,
      });
    }
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth.seconds * 1000);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const fetchPoemScores = async () => {
    setLoading(true);
    const scoresRef = collection(firestore, "users", user.email, "POEMScores");
    const scoresQuery = query(scoresRef, orderBy("timestamp", "desc"));
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
    setLoading(false);

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: chartRefY.current - 60,
        animated: true,
      });
    }, 300);
  };

  const getSeverityLevel = (score) => {
    if (score <= 2)
      return { level: t("account.clear"), message: t("account.clear_message") };
    if (score <= 7)
      return { level: t("account.mild"), message: t("account.mild_message") };
    if (score <= 16)
      return {
        level: t("account.moderate"),
        message: t("account.moderate_message"),
      };
    if (score <= 24)
      return {
        level: t("account.severe"),
        message: t("account.severe_message"),
      };
    if (score >= 25)
      return {
        level: t("account.very_severe"),
        message: t("account.very_severe_message"),
      };
    return {
      level: t("account.unknown"),
      message: t("account.unknown_message"),
    };
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

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/myaccount")} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.header}>{t("account.my_record")}</Text>

        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.age}>
          {t("account.age")}: {profile.age} {t("account.taon")}
        </Text>

        <View style={styles.badgeContainer}>
          {profile.isVerified ? (
            <View style={styles.verifiedBadge}>
              <FontAwesome name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.badgeText}>{t("account.verified_user")}</Text>
            </View>
          ) : (
            <View style={styles.notVerifiedBadge}>
              <FontAwesome name="times-circle" size={20} color="#F44336" />
              <Text style={styles.badgeText}>{t("account.not_verified")}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          {t("account.personal_information")}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t("account.email")}:</Text>
            <Text style={styles.infoText}>{profile.email}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>{t("account.phone_number")}:</Text>
            <Text style={styles.infoText}>{profile.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.buttonMonth}
            onPress={() => setMonthModalVisible(true)}
          >
            <Text style={styles.buttonText}>{month}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonYear}
            onPress={() => setYearModalVisible(true)}
          >
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

        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>
            {t("account.poem_score_refresh")}
          </Text>
        </TouchableOpacity>

        {/* Treatment and Medication Section */}
        <Text style={styles.sectionTitle}>
          {t("account.medications_and_treatment")}
        </Text>

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
              <Text style={styles.treatmentText}>
                {t("account.score")}: {selectedSurvey.score}
              </Text>
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

        <Text style={styles.sectionTitle}>{t("account.treatment")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/medicationhistory")}
        >
          <Text style={styles.buttonText}>{t("account.medication")}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{t("account.gallery")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/gallery")}
        >
          <Text style={styles.buttonText}>{t("account.gallerybtn")}</Text>
        </TouchableOpacity>

        <Modal visible={monthModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setMonth(item);
                    setMonthModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <Modal visible={yearModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <FlatList
              data={years}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setYear(item);
                    setYearModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { paddingBottom: 100, paddingHorizontal: 20 },
  header: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    marginTop: 40,
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  age: { fontSize: 18, textAlign: "center", marginBottom: 20, marginTop: 10 },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 6,
    borderRadius: 20,
  },
  notVerifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    padding: 6,
    borderRadius: 20,
  },
  badgeText: { marginLeft: 5, fontSize: 16, color: "#333" },
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  button: {
    backgroundColor: "#74BDB3",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "70%", // Keeps the button size consistent
    alignItems: "center", // Centers the text inside the button
    justifyContent: "center", // Ensures the button text is vertically centered
    marginTop: 20, // Space above the button
    marginBottom: 20,
    alignSelf: "center", // Centers the button horizontally
  },
  button2: {
    backgroundColor: "#74BDB3",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#74BDB3",
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBlock: {
    width: "48%", // Adjusts to fit two blocks per row
    backgroundColor: "rgba(195, 239, 228, 0.5)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    textAlign: "center", // Center align the label text
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "black",
    textAlign: "justify", // Center align the info text
  },
  chart: { marginVertical: 8, borderRadius: 16 },
  treatmentContainer: {
    backgroundColor: "#E8F4F2",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  noSurveyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default MyRecordScreen;

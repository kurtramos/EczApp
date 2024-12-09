import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomNav from "../components/BottomNav";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const HowToUse = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle visibility of each section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle section
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <Text style={styles.heading}>{t("how_to_use.how_to_use")}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.squareBackground}>
          {/* Image */}
          <Image
            source={require("../../assets/logos/faqs.jpg")}
            style={styles.image}
          />

          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Section 1: How to Use the Camera */}
            <TouchableOpacity onPress={() => toggleSection("howToUseCamera")}>
              <Text style={styles.sectionTitle}>
                {t("how_to_use.how_to_use_the_camera")}
              </Text>
            </TouchableOpacity>
            {activeSection === "howToUseCamera" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.how_to_use_the_camera_description")}
              </Text>
            )}

            {/* Section 2: What Is the Camera For */}
            <TouchableOpacity onPress={() => toggleSection("whatIsCameraFor")}>
              <Text style={styles.sectionTitle}>
                {t("how_to_use.what_is_the_camera_for")}
              </Text>
            </TouchableOpacity>
            {activeSection === "whatIsCameraFor" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.what_is_the_camera_for_description")}
              </Text>
            )}

            {/* Section 3: When to Answer the POEM Survey */}
            <TouchableOpacity onPress={() => toggleSection("whenToAnswerPoem")}>
              <Text style={styles.sectionTitle}>
                {t("how_to_use.when_to_answer_poem")}
              </Text>
            </TouchableOpacity>
            {activeSection === "whenToAnswerPoem" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.when_to_answer_poem_description")}
              </Text>
            )}

            {/* Section 4: How to Use the Tracker */}
            <TouchableOpacity onPress={() => toggleSection("howToUseTracker")}>
              <Text style={styles.sectionTitle}>
                {t("how_to_use.how_to_use_the_tracker")}
              </Text>
            </TouchableOpacity>
            {activeSection === "howToUseTracker" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.how_to_use_the_tracker_description")}
              </Text>
            )}

            {/* Section 5: What Is the POEM Score */}
            <TouchableOpacity onPress={() => toggleSection("whatIsPoemScore")}>
              <Text style={styles.sectionTitle}>
                {t("how_to_use.what_is_the_poem_score")}
              </Text>
            </TouchableOpacity>
            {activeSection === "whatIsPoemScore" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.what_is_the_poem_score_description")}
              </Text>
            )}

            {/* Section 6: How Can I Get Treatment */}
            {/* <TouchableOpacity
              onPress={() => toggleSection("howToGetTreatment")}
            >
              <Text style={styles.sectionTitle}>
                {t("how_to_use.how_can_i_get_treatment")}
              </Text>
            </TouchableOpacity>
            {activeSection === "howToGetTreatment" && (
              <Text style={styles.sectionContent}>
                {t("how_to_use.how_can_i_get_treatment_description")}
              </Text>
            )} */}
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: 35,
    color: "#74BDB3",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  squareBackground: {
    backgroundColor: "#C3EFE5",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  contentContainer: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#9ED4C7",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  sectionContent: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Spartan_300Light",
    lineHeight: 20,
    color: "black",
    textAlign: "justify",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default HowToUse;

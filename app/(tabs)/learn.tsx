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

const Learn = () => {
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
      <Text style={styles.heading}>{t("learn.learn")}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.squareBackground}>
          {/* Image */}
          <Image
            source={require("../../assets/logos/EczemaHandSample.png")} // Ensure this path is correct
            style={styles.image}
          />

          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Section 1: What is Eczema */}
            <TouchableOpacity onPress={() => toggleSection("whatIsEczema")}>
              <Text style={styles.sectionTitle}>
                {t("learn.what_is_eczema")}
              </Text>
            </TouchableOpacity>
            {activeSection === "whatIsEczema" && (
              <Text style={styles.sectionContent}>
                {t("learn.eczema_description")}
              </Text>
            )}

            {/* Section 2: Is Eczema Curable */}
            <TouchableOpacity onPress={() => toggleSection("isEczemaCurable")}>
              <Text style={styles.sectionTitle}>
                {t("learn.is_eczema_curable")}
              </Text>
            </TouchableOpacity>
            {activeSection === "isEczemaCurable" && (
              <Text style={styles.sectionContent}>
                {t("learn.eczema_curable_description")}
              </Text>
            )}

            {/* Section 3: Types of Eczema */}
            <TouchableOpacity onPress={() => toggleSection("typesOfEczema")}>
              <Text style={styles.sectionTitle}>
                {t("learn.types_of_eczema")}
              </Text>
            </TouchableOpacity>
            {activeSection === "typesOfEczema" && (
              <Text style={styles.sectionContent}>
                {t("learn.types_of_eczema_description")}
              </Text>
            )}

            {/* Section 4: Symptoms */}
            <TouchableOpacity onPress={() => toggleSection("symptoms")}>
              <Text style={styles.sectionTitle}>{t("learn.symptoms")}</Text>
            </TouchableOpacity>
            {activeSection === "symptoms" && (
              <Text style={styles.sectionContent}>
                {t("learn.symptoms_description")}
              </Text>
            )}

            {/* Section 5: Remedies */}
            <TouchableOpacity onPress={() => toggleSection("remedies")}>
              <Text style={styles.sectionTitle}>{t("learn.remedies")}</Text>
            </TouchableOpacity>
            {activeSection === "remedies" && (
              <Text style={styles.sectionContent}>
                {t("learn.remedies_description")}
              </Text>
            )}

            {/* Section 6: What to Do */}
            <TouchableOpacity onPress={() => toggleSection("whatToDo")}>
              <Text style={styles.sectionTitle}>{t("learn.what_to_do")}</Text>
            </TouchableOpacity>
            {activeSection === "whatToDo" && (
              <Text style={styles.sectionContent}>
                {t("learn.what_to_do_description")}
              </Text>
            )}

            {/* Section 7: What to Avoid */}
            <TouchableOpacity onPress={() => toggleSection("whatToAvoid")}>
              <Text style={styles.sectionTitle}>
                {t("learn.what_to_avoid")}
              </Text>
            </TouchableOpacity>
            {activeSection === "whatToAvoid" && (
              <Text style={styles.sectionContent}>
                {t("learn.what_to_avoid_description")}
              </Text>
            )}

            {/* Section 8: Disclaimer */}
            <TouchableOpacity onPress={() => toggleSection("disclaimer")}>
              <Text style={styles.sectionTitle}>{t("learn.disclaimer")}</Text>
            </TouchableOpacity>
            {activeSection === "disclaimer" && (
              <Text style={styles.sectionContent}>
                {t("learn.disclaimer_description")}
              </Text>
            )}
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
    backgroundColor: "white",
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
    fontFamily: "League Spartan",
    lineHeight: 20,
    color: "black",
    textAlign: "justify",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Learn;

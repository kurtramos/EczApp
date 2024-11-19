import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../components/BackArrow"; // If you have a custom BackArrow component
import BottomNav from "../components/BottomNav";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

const CameraScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/home")} />
      <Text style={styles.header}>{t("camera.title")}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.description}>{t("camera.description")}</Text>

        {/* Info Block with Instructions */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>
              {t("camera.steps.step1.title")}
            </Text>
            <Text style={styles.infoText}>
              {t("camera.steps.step1.description")}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>
              {t("camera.steps.step2.title")}
            </Text>
            <Text style={styles.infoText}>
              {t("camera.steps.step2.description")}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>
              {t("camera.steps.step3.title")}
            </Text>
            <Text style={styles.infoText}>
              {t("camera.steps.step3.description")}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/camerascreen")}
      >
        <Text style={styles.buttonText}>{t("camera.proceed_button")}</Text>
      </TouchableOpacity>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20, // Adjusted to create more space at the top
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20, // Add bottom padding to avoid content being cut off
  },
  header: {
    fontSize: 35,
    color: "#74BDB3",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 30, // Increased margin for more spacing
  },
  infoContainer: {
    width: screenWidth - 40,
    alignItems: "center",
    marginBottom: 20,
  },
  infoBlock: {
    width: "100%",
    backgroundColor: "rgba(195, 239, 228, 0.5)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#74BDB3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 95,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraScreen;

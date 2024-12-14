import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/myaccount")} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>{t("privacy_policy.heading")}</Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.intro_paragraph")}
        </Text>

        <Text style={styles.subHeading}>
          {t("privacy_policy.information_we_collect.title")}
        </Text>
        <Text style={styles.subHeading2}>
          {t(
            "privacy_policy.information_we_collect.personal_information.title"
          )}
        </Text>
        {t("privacy_policy.information_we_collect.personal_information.items", {
          returnObjects: true,
        }).map((item, index) => (
          <Text key={index} style={styles.bullets}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subHeading2}>
          {t("privacy_policy.information_we_collect.medical_information.title")}
        </Text>
        {t("privacy_policy.information_we_collect.medical_information.items", {
          returnObjects: true,
        }).map((item, index) => (
          <Text key={index} style={styles.bullets}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subHeading}>
          {t("privacy_policy.how_we_use_information.title")}
        </Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.how_we_use_information.paragraph")}
        </Text>
        {t("privacy_policy.how_we_use_information.purposes", {
          returnObjects: true,
        }).map((purpose, index) => (
          <Text key={index} style={styles.bullets}>
            {purpose}
          </Text>
        ))}

        <Text style={styles.subHeading}>
          {t("privacy_policy.data_sharing_and_disclosure.title")}
        </Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.data_sharing_and_disclosure.paragraph")}
        </Text>
        {t("privacy_policy.data_sharing_and_disclosure.conditions", {
          returnObjects: true,
        }).map((condition, index) => (
          <Text key={index} style={styles.bullets}>
            {condition}
          </Text>
        ))}

        <Text style={styles.subHeading}>
          {t("privacy_policy.data_security.title")}
        </Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.data_security.paragraph")}
        </Text>

        <Text style={styles.subHeading}>
          {t("privacy_policy.data_retention.title")}
        </Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.data_retention.paragraph")}
        </Text>

        <Text style={styles.subHeading}>
          {t("privacy_policy.your_rights.title")}
        </Text>
        <Text style={styles.paragraph}>
          {t("privacy_policy.your_rights.paragraph")}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f4f4f4",
    backgroundColor: "white",
    padding: 20,
  },
  bullets: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    marginLeft: 40,
  },
  scrollView: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: "#74BDB3",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    color: "#74BDB3",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  subHeading2: {
    fontSize: 18,
    color: "#74BDB3",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 25,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default PrivacyPolicy;

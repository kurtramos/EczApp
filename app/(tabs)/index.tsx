import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import useLoadFonts from "@/hooks/useLoadFonts";
import {
  Spartan_100Thin,
  Spartan_200ExtraLight,
  Spartan_300Light,
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_600SemiBold,
  Spartan_700Bold,
  Spartan_800ExtraBold,
  Spartan_900Black,
} from "@expo-google-fonts/spartan";
import { useRouter } from "expo-router"; // useRouter from expo-router
import "../i18n";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter(); // useRouter for navigation

  const { fontsLoaded, onLayoutRootView } = useLoadFonts({
    Spartan_100Thin,
    Spartan_200ExtraLight,
    Spartan_300Light,
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_600SemiBold,
    Spartan_700Bold,
    Spartan_800ExtraBold,
    Spartan_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
      const timer = setTimeout(() => {
        router.push("/Homescreen");
      }, 1200);

      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Show a loading indicator or default text until fonts are loaded
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logos/EczemaCareLogoW.png")}
        style={styles.logo}
      />
      <Text style={styles.titleText}>Eczema</Text>
      <Text style={styles.subtitleText}>Care</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85D3C0",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 48,
    color: "white",
    fontFamily: "Spartan_100Thin", // Use Spartan font after it's loaded
    fontWeight: "100",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 48,
    color: "white",
    fontFamily: "Spartan_100Thin", // Use Spartan font after it's loaded
    fontWeight: "100",
    textAlign: "center",
    marginBottom: 30,
  },
  loadingSplash: { flex: 1 },
});

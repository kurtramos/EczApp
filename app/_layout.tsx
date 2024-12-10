import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StyleSheet, View, Image } from "react-native";
// import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
import { ActivityIndicator } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded } = useLoadFonts({
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
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <Stack screenOptions={{ statusBarTranslucent: true }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85D3C0",
    justifyContent: "center",
    alignItems: "center",
  },
  //   titleText: {
  //     fontSize: 48,
  //     color: "white",
  //     fontFamily: "Spartan_100Thin", // Use Spartan font after it's loaded
  //     fontWeight: "100",
  //     textAlign: "center",
  //     marginBottom: 10,
  //   },
  //   subtitleText: {
  //     fontSize: 48,
  //     color: "white",
  //     fontFamily: "Spartan_100Thin", // Use Spartan font after it's loaded
  //     fontWeight: "100",
  //     textAlign: "center",
  //     marginBottom: 30,
  //   },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

// import React from "react";
// import { View, Image, StyleSheet, Text } from "react-native";

// import { Redirect } from "expo-router";

// import useLoadFonts from "@/hooks/useLoadFonts";
// import {
//   Spartan_100Thin,
//   Spartan_200ExtraLight,
//   Spartan_300Light,
//   Spartan_400Regular,
//   Spartan_500Medium,
//   Spartan_600SemiBold,
//   Spartan_700Bold,
//   Spartan_800ExtraBold,
//   Spartan_900Black,
// } from "@expo-google-fonts/spartan";
// import { ActivityIndicator } from "react-native";

// export default function index() {
//   const { onLayoutRootView } = useLoadFonts({
//     Spartan_100Thin,
//     Spartan_200ExtraLight,
//     Spartan_300Light,
//     Spartan_400Regular,
//     Spartan_500Medium,
//     Spartan_600SemiBold,
//     Spartan_700Bold,
//     Spartan_800ExtraBold,
//     Spartan_900Black,
//   });

//   //   if (!fontsLoaded) {
//   //     return (
//   //       <View style={styles.container}>
//   //         <Image
//   //           source={require("../assets/logos/EczemaCareLogoW.png")}
//   //           style={styles.logo}
//   //         />
//   //         <ActivityIndicator size="large" color="white" />
//   //       </View>
//   //     );
//   //   }

//   return (
//     <View onLayout={onLayoutRootView} style={styles.container}>
//       <Image
//         source={require("../assets/logos/EczemaCareLogoW.png")}
//         style={styles.logo}
//       />
//       <Text>Hello world</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#85D3C0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
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
//   logo: {
//     width: 130,
//     height: 130,
//     resizeMode: "contain",
//     marginBottom: 20,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRoute, useRouter } from "expo-router"; // Import useRoute and useRouter from expo-router
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const EditMedicationScreen = () => {
  const route = useRoute();  // This hook gives access to route params
  const router = useRouter();
  const { medicationId, medications } = route.params || {};  // Destructure params correctly
  const [medicationName, setMedicationName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [timesPerDay, setTimesPerDay] = useState(1);

  useEffect(() => {
    // Check if the route params are valid before accessing
    if (medications && medications.length > 0) {
      const med = medications[0];  // Assuming we edit the first medication in the list
      setMedicationName(med.medName);
      setQuantity(med.quantity);
      setTimesPerDay(med.timesPerDay);
    }
  }, [medications]);

  const handleUpdate = async () => {
    try {
      const user = getAuth().currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        Alert.alert("Error", "You must be logged in to update medications.");
        return;
      }

      const medicationRef = doc(
        firestore,
        "users",
        userEmail,
        "medications",
        medicationId
      );

      await updateDoc(medicationRef, {
        medications: [
          {
            medName: medicationName,
            quantity: quantity,
            timesPerDay: timesPerDay,
          },
        ],
      });

      Alert.alert("Success", "Medication updated successfully!");
      router.back(); // Go back to the previous screen
    } catch (error) {
      console.error("Error updating medication:", error);
      Alert.alert("Error", "Failed to update medication.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Medication</Text>

      <Text style={styles.label}>Medication Name:</Text>
      <TextInput
        style={styles.input}
        value={medicationName}
        onChangeText={setMedicationName}
      />

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(quantity)}
        onChangeText={(text) => setQuantity(parseInt(text))}
      />

      <Text style={styles.label}>Times per Day:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(timesPerDay)}
        onChangeText={(text) => setTimesPerDay(parseInt(text))}
      />

      <Button title="Update Medication" onPress={handleUpdate} />

      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
};

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome";
import BackArrow from "../components/BackArrow";
import BottomNav from "../components/BottomNav";
import { useRouter } from "expo-router";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { useTranslation } from "react-i18next";



const MedicationScreen = () => {
  const router = useRouter();

  const [currentDateTime, setCurrentDateTime] = useState("");
  const [medName, setMedName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [addedMeds, setAddedMeds] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleSave = async () => {
    if (addedMeds.length === 0) {
      Alert.alert(t("medication.alerts.no_added_medication"), t("medication.alerts.add_medication_prompt"));
      return;
    }
  
    // Get the current user
    const user = getAuth().currentUser;
    const userEmail = user?.email;
  
    if (!userEmail) {
      console.error("No user logged in");
      Alert.alert(t("medication.alerts.error"), t("medication.alerts.login_required"))
      return;
    }
  
    // Create a timestamp
    const timestamp = new Date();
    const timestampString = timestamp.toISOString(); // This ensures the timestamp is unique and sortable
  
    try {
      // Create a reference to the Firestore collection
      const medicationsRef = collection(firestore, "users", userEmail, "medications");
  
      // Save the added medications along with the timestamp
      await setDoc(doc(medicationsRef, timestampString), {
        medications: addedMeds,
        timestamp: timestamp,
      });
  
      Alert.alert(t("medication.alerts.success"), t("medication.alerts.medications_saved"))
      console.log("Medications saved:", addedMeds);
  
      // Reset the addedMeds list after saving
      setAddedMeds([]);

      // Redirect to medication history page
      router.push("/medicationhistory"); 

  
    } catch (error) {

      Alert.alert(t("medication.alerts.success"), t("medication.alerts.error_saving_medications"))
      console.error("Error saving medications:", error);
    }
  };
  

  const handleErase = () => {
    setMedName("");
    setQuantity(1);
    setTimesPerDay(1);
  };

  const handleAddMedication = () => {
    if (!medName || !quantity || !timesPerDay) {
      Alert.alert(t("medication.alerts.add_meds"), t("medication.alerts.add_meds_prompt"))
      return;
    }

    setAddedMeds((prevMeds) => [
      ...prevMeds,
      { medName, quantity, timesPerDay },
    ]);

    setMedName(""); 
    setQuantity(1);
    setTimesPerDay(1);
  };

  const handleRemoveMedication = (index) => {
    setAddedMeds((prevMeds) => prevMeds.filter((_, i) => i !== index));
  };

  const handleHistoryRedirect = () => {
    router.push("/medicationhistory");
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <BackArrow onPress={() => router.back()} />
      <Text style={styles.header}>{t("medication.header")}</Text>

      {/* Description Text */}
      <Text style={styles.description}>
      {t("medication.description.medication_description")}
      </Text>

      {/* Date and Time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{currentDateTime}</Text>
      </View>

      {/* Medication Form */}
      <View style={styles.formContainer}>
        {/* Labels */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>{t("medication.form.quantity")}</Text>
          <Text style={styles.inputLabel2}>{t("medication.form.prescribed_meds")}</Text>
          <Text style={styles.inputLabel3}>{t("medication.form.times_per_day")}</Text>
        </View>

        {/* Input Row with Inputs and Trash Icon */}
        <View style={styles.inputRow}>
          {/* Quantity Dropdown */}
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              selectedValue={quantity}
              onValueChange={(value) => setQuantity(value)}
              style={pickerSelectStyles}
              items={[1, 2, 3, 4, 5].map((num) => ({
                label: num.toString(),
                value: num,
              }))}
              placeholder={{}} // This removes the default "Select an item..." text
              />
            </View>

          {/* Medication Name Input */}
          <View style={styles.medicationInputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t("medication.form.medication_placeholder")}
              value={medName}
              onChangeText={setMedName}
            />
          </View>

          {/* Times per Day Dropdown */}
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              selectedValue={timesPerDay}
              onValueChange={(value) => setTimesPerDay(value)}
              style={pickerSelectStyles}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
                label: num.toString(),
                value: num,
              }))}
              placeholder={{}} // This removes the default "Select an item..." text
              />
            </View>

          {/* Erase Button */}
          <TouchableOpacity onPress={handleErase} style={styles.eraseButton}>
            <Icon name="trash" size={20} color="#ff4444" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Line Separator */}
        <View style={styles.separator} />
      </View>

      {/* Buttons: Add, Save, History */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
          <Text style={styles.buttonText}>{t("medication.buttons.add")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>{t("medication.buttons.save")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={handleHistoryRedirect}>
          <Text style={styles.buttonText}>{t("medication.buttons.history")}</Text>
        </TouchableOpacity>
      </View>

      {/* Added Medications List */}
      <View style={styles.medicationsListContainer}>
        <Text style={styles.reviewText}>
        {t("medication.alerts.added_meds_check")}
        </Text>
        {addedMeds.length === 0 ? (
          <Text style={styles.noMedsText}>{t("medication.alerts.no_meds_added")}</Text>
        ) : (
          addedMeds.map((med, index) => (
            <View key={index} style={styles.medicationItem}>
              <Text style={styles.medicationText}>
              {med.quantity} {med.medName} - {med.timesPerDay} {t("medication.form.times_per_day")}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveMedication(index)}
                style={styles.removeButton}
              >
                <Icon name="trash" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 45,
  },
  header: {
    fontSize: 30,
    color: "#85D3C0",
    fontWeight: "bold",
    marginBottom: 50,
  },
  description: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  dateTimeContainer: {
    width: "80%",
    marginBottom: 30,
  },
  dateTimeText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    marginBottom: 40,
  },
  inputFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerContainer: {
    width: "18%",
  },
  medicationInputContainer: {
    width: "60%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 2,
  },
  inputLabel2: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 20,
  },
  inputLabel3: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 7,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    width: "100%",
  },
  eraseButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: -30,
  },
  addButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  historyButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  medicationsListContainer: {
    width: "80%",
    marginTop: 50,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: -30,
    marginBottom: 10,
  },
  noMedsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  medicationText: {
    fontSize: 14,
    color: "#333",
  },
  removeButton: {
    padding: 5,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    color: "#333",
    fontSize: 14,
  },
  inputAndroid: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    color: "#333",
    fontSize: 14,
  },
};

export default MedicationScreen;

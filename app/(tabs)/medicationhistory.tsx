import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Used to handle navigation
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp, // Import for setting server-side timestamp
} from "firebase/firestore";

// Importing Picker for selecting values
import BackArrow from "../components/BackArrow";
import BottomNav from "../components/BottomNav";
import RNPickerSelect from "react-native-picker-select";
import { deleteDoc } from "firebase/firestore"; // Make sure this is imported

import { useTranslation } from "react-i18next";


const MedicationHistoryScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [medicationHistory, setMedicationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedMedications, setEditedMedications] = useState({});
  const [modifiedTimestamps, setModifiedTimestamps] = useState({});


  // Function to fetch medication history
  const fetchMedicationHistory = async () => {
    try {
      const user = getAuth().currentUser;
      const userEmail = user?.email;
  
      if (!userEmail) {
        console.error("No user logged in");
        return;
      }
  
      const medicationsRef = collection(
        firestore,
        "users",
        userEmail,
        "medications"
      );
      const q = query(medicationsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
  
      const groupedMeds = {};
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp.toDate().toISOString();
        const modifiedTimestamp = data.modifiedTimestamp
          ? data.modifiedTimestamp.toDate().toISOString()
          : null;
  
        // Group meds by timestamp
        if (!groupedMeds[timestamp]) {
          groupedMeds[timestamp] = { id: doc.id, medications: [] };
        }
        groupedMeds[timestamp].medications.push(...data.medications);
  
        // Store modified timestamp in state for each entry
        if (modifiedTimestamp) {
          setModifiedTimestamps((prevState) => ({
            ...prevState,
            [doc.id]: modifiedTimestamp,
          }));
        }
      });
  
      const groupedArray = Object.entries(groupedMeds).map(
        ([timestamp, entry]) => ({
          timestamp,
          id: entry.id,
          medications: entry.medications,
        })
      );
  
      setMedicationHistory(groupedArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching medication history:", error);
      setLoading(false);
    }
  };
  

  // Handle editing an entry
  const handleEdit = (entryId) => {
    setEditingId(entryId);

    const entry = medicationHistory.find((entry) => entry.id === entryId);
    if (entry) {
      const editedMedications = entry.medications.reduce((acc, med, index) => {
        acc[index] = {
          medName: med.medName,
          quantity: med.quantity,
          timesPerDay: med.timesPerDay,
        };
        return acc;
      }, {});
      setEditedMedications(editedMedications);
    }
  };

  // Handle saving edited medications
  const handleSave = async (entryId) => {
    try {
      const user = getAuth().currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        Alert.alert(t("medicationhistory.alerts.error"), t("medicationhistory.alerts.login_required"))
        return;
      }

      const medicationRef = doc(firestore, "users", userEmail, "medications", entryId);

      const updatedMeds = Object.values(editedMedications).map((med) => ({
        medName: med.medName,
        quantity: med.quantity,
        timesPerDay: med.timesPerDay,
      }));

       // Save the new modified timestamp
       const newModifiedTimestamp = serverTimestamp();
       await updateDoc(medicationRef, {
         medications: updatedMeds,
         modifiedTimestamp: newModifiedTimestamp, // Add modified timestamp
       });
 
       Alert.alert(t("medicationhistory.alerts.success"), t("medicationhistory.alerts.medications_updated"))
       fetchMedicationHistory();
       setEditingId(null);
       setModifiedTimestamps((prev) => ({
         ...prev,
         [entryId]: newModifiedTimestamp,
       }));
     } catch (error) {
       console.error("Error updating medications:", error);
       Alert.alert(t("medicationhistory.alerts.error"), t("medicationhistory.alerts.update_failed"))
     }
   };

    // Handle deleting an entry
const handleDelete = async (id) => {
  try {
    const user = getAuth().currentUser;
    const userEmail = user?.email;

    if (!userEmail) {
      Alert.alert(
        t("medicationhistory.alerts.error"), // Error title
        t("medicationhistory.alerts.login_required") // Error message when not logged in
      );
      return;
    }

    const docRef = doc(firestore, "users", userEmail, "medications", id);
    await deleteDoc(docRef);

    Alert.alert(
      t("medicationhistory.alerts.success"), // Success title
      t("medicationhistory.alerts.medication_deleted") // Success message after deletion
    );
    fetchMedicationHistory(); // Refresh the data
  } catch (error) {
    console.error("Error deleting medication:", error);
    Alert.alert(
      t("medicationhistory.alerts.error"), // Error title
      t("medicationhistory.alerts.delete_failed") // Error message if deletion fails
    );
  }
};


  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    fetchMedicationHistory();
  }, []);

  return (
    <View style={styles.container}>
<BackArrow onPress={() => router.push("/medication")} />
      <Text style={styles.header}>{t("medicationhistory.history.title")}</Text>
      {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity> */}

      {loading ? (
        <Text style={styles.loadingText}>{t("medicationhistory.history.loading")}</Text>
      ) : medicationHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>{t("medicationhistory.history.no_history")}</Text>
      ) : (
        <ScrollView style={styles.medicationList}>
          {medicationHistory.map((entry, index) => (
            <View key={index} style={styles.medicationItem}>
              <Text style={styles.timestampText}>
                {formatTimestamp(entry.timestamp)}
              </Text>
              {entry.medications.map((med, i) => (
                <View key={i}>
                  {editingId === entry.id ? (
                    // Show input fields when editing
                    <>
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) =>
                          setEditedMedications((prevState) => ({
                            ...prevState,
                            [i]: { ...prevState[i], quantity: value },
                          }))
                        }
                        value={editedMedications[i]?.quantity}
                        items={[
                          { label: "1", value: 1 },
                          { label: "2", value: 2 },
                          { label: "3", value: 3 },
                          { label: "4", value: 4 },
                          { label: "5", value: 5 },
                        ]}
                      />
                      <TextInput
                        style={styles.input}
                        value={editedMedications[i]?.medName}
                        onChangeText={(text) =>
                          setEditedMedications((prevState) => ({
                            ...prevState,
                            [i]: { ...prevState[i], medName: text },
                          }))
                        }
                      />
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) =>
                          setEditedMedications((prevState) => ({
                            ...prevState,
                            [i]: { ...prevState[i], timesPerDay: value },
                          }))
                        }
                        value={editedMedications[i]?.timesPerDay}
                        items={[
                          { label: "1", value: 1 },
                          { label: "2", value: 2 },
                          { label: "3", value: 3 },
                          { label: "4", value: 4 },
                        ]}
                      />
                    </>
                  ) : (
                    // Show medication details
                 <Text style={styles.medicationText}>
                      {med.quantity} {med.medName} - {med.timesPerDay} {t("medicationhistory.labels.times_per_day")}
                    </Text>
                  )}
                  {/* Display Modified Timestamp */}
                  {modifiedTimestamps[entry.id] && (
                    <Text style={styles.modifiedTimestampText}>
                      {t("medicationhistory.modified.label")} {formatTimestamp(modifiedTimestamps[entry.id])}
                    </Text>
                  )}
                  {i < entry.medications.length - 1 && (
                    <View style={styles.separator}></View>
                  )}
                </View>
              ))}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(entry.id)}
                >
                  <Text style={styles.actionText}>{t("medicationhistory.buttons.edit")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    Alert.alert(
                      t("medicationhistory.alerts.delete_entry"),  // Translated Title
                      t("medicationhistory.alerts.delete_prompt"), // Translated Message
                      [
                        { text:  t("medicationhistory.alerts.cancel"), style: "cancel" },
                        { text:  t("medicationhistory.alerts.delete"), onPress: () => handleDelete(entry.id) },
                      ]
                    )
                  }
                >
                  <Text style={styles.actionText}>{t("medicationhistory.buttons.delete")}</Text>
                </TouchableOpacity>
              </View>
              {/* Show Save button when editing */}
              {editingId === entry.id && (
                <View style={styles.saveButtonWrapper}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSave(entry.id)}
                  >
                    <Text style={styles.buttonText}>{t("medicationhistory.buttons.save")}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 45,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#85D3C0",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  noHistoryText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  medicationList: {
    width: "100%",
    marginTop: 10,
  },
  medicationItem: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  timestampText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  medicationText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  modifiedTimestampText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  saveButtonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#84d3c0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "100%",
    borderRadius: 5,
  },
});

export default MedicationHistoryScreen;

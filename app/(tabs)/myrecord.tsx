import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BackArrow from '../components/BackArrow';
import BottomNav from '../components/BottomNav'; // Ensure this import is present
import { useRouter } from 'expo-router'; 

const MyRecordScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        data: [5, 6, 7, 8, 6, 7, 8, 9, 10],
        color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`, // Line color
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`, // Text color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726" // Color of the dots
    }
  };

  return (
    <View style={styles.container}>
           <BackArrow onPress={() => router.push('/settings')} />
      <ScrollView>
        <Text style={styles.header}>My Record</Text>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.age}>Age: 20</Text>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}></View>
          <View style={styles.infoBlock}></View>
        </View>
        <LineChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.sectionTitle}>Medications & Treatment</Text>
        <View style={styles.treatmentContainer}>
          {/* Placeholder or dynamic content for medications and treatments */}
        </View>
      </ScrollView>
      <BottomNav /> {/* Ensure BottomNav is correctly placed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20
  },
  name: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  age: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
    marginBottom: 10
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  infoBlock: {
    width: '45%',
    height: 100,
    backgroundColor: 'rgba(195, 239, 228, 0.5)',
    borderRadius: 10,
    marginBottom: 10
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  treatmentContainer: {
    backgroundColor: '#D9D9D9',
    height: 400, // adjust this value as needed
    marginVertical: 10,
    borderRadius: 10,
    padding: 10
  }
});

export default MyRecordScreen;

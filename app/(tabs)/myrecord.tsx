import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BackArrow from '../components/BackArrow';
import BottomNav from '../components/BottomNav'; 
import { useRouter } from 'expo-router'; 

const MyRecordScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  // Data for the LineChart
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],  // X-axis labels
    datasets: [
      {
        data: [5, 6, 7, 8, 6, 7, 8, 9, 10],  // Y-axis data
        color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`, // Dataset color
        strokeWidth: 2  // Line thickness
      }
    ]
  };

  // Configuration for the LineChart
  const chartConfig = {
    backgroundGradientFrom: "#fff",  // Background color
    backgroundGradientTo: "#fff",  // Background gradient
    color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,  // Line color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,  // X and Y label color
    style: {
      borderRadius: 16  // Chart border radius
    },
    propsForDots: {
      r: "6",  // Dot radius
      strokeWidth: "2",
      stroke: "#ffa726"  // Dot stroke color
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/myaccount')} />
      <ScrollView>
        <Text style={styles.header}>My Record</Text>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.age}>Age: 20</Text>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text>Info Block 1</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text>Info Block 2</Text>
          </View>
        </View>

        {/* Re-add the LineChart with adjusted width */}
        <LineChart
          data={data}
          width={screenWidth - 32}  // Ensure chart width is dynamic
          height={220}
          chartConfig={chartConfig}
          bezier  // Makes the line chart smoother
          style={styles.chart}  // Chart styling
        />
        <Text style={styles.sectionTitle}>Medications & Treatment</Text>
        <View style={styles.treatmentContainer}>
          <Text>No medications added yet.</Text>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  treatmentContainer: {
    backgroundColor: '#D9D9D9',
    height: 400,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10
  }
});

export default MyRecordScreen;

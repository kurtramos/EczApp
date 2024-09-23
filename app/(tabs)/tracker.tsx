import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 
import BottomNav from '../components/BottomNav';


  const router = useRouter();

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  datasets: [
    {
      data: [5, 6, 7, 8, 6, 7, 8, 9, 10],
      strokeWidth: 2, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(133, 211, 192, ${opacity})`,
};

const TrackerScreen = () => {
  return (
    <View style={styles.container}>
                  <BackArrow onPress={() => router.push('/home')} />
      <Text style={styles.header}>Tracker</Text>
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>POEM Score</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Treatment</Text>
      </TouchableOpacity>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#85D3C0',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '70%',  // Adjusted for full width
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TrackerScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 
import BottomNav from '../components/BottomNav';


const POEMScreen = () => {
    const router = useRouter();
    const [response, setResponse] = useState({
        question1: null,
        question2: null,
        question3: null
    });

    const selectOption = (question, option) => {
        setResponse(prev => ({ ...prev, [question]: option }));
    };

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/home')} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>POEM</Text>
                    <Text style={styles.description}>
                        Complete the POEM questionnaire once a week to track changes in your skin condition.
                        Please answer the following questions carefully:
                    </Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                        Over the last week, on how many days has your/your child’s skin been itchy because of the eczema?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['0', '1-2', '3-4', '5-6', '7'].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.option, response.question1 === option && styles.selectedOption]}
                                onPress={() => selectOption('question1', option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                        Over the last week, on how many nights has your/your child's sleep been disturbed because of the eczema?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['0', '1-2', '3-4', '5-6', '7'].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.option, response.question2 === option && styles.selectedOption]}
                                onPress={() => selectOption('question2', option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                        Over the last week, on how many days has your/your child’s skin been bleeding because of the eczema?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['0', '1-2', '3-4', '5-6', '7'].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.option, response.question3 === option && styles.selectedOption]}
                                onPress={() => selectOption('question3', option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    padding: 40,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    color: '#85D3C0',
    fontWeight: '600'
  },
  description: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginTop: 10
  },
  questionContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: 'rgba(195, 239, 228, 0.5)',
    borderRadius: 15
  },
  question: {
    fontSize: 13,
    color: 'black',
    marginBottom: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  option: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#85D3C0',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  selectedOption: {
    backgroundColor: '#85D3C0'
  },
  optionText: {
    fontSize: 13,
    textAlign: 'center'
  },
  footer: {
    height: 50,
    backgroundColor: '#85D3C0',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default POEMScreen;
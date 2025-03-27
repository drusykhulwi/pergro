import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      icon: 'trending-up',
      title: 'Track Your Progress',
      description: 'Monitor your personal growth with intuitive tracking tools.'
    },
    {
      icon: 'list',
      title: 'Set Meaningful Goals',
      description: 'Create and manage goals that align with your personal vision.'
    },
    {
      icon: 'rocket',
      title: 'Continuous Improvement',
      description: 'Receive insights and recommendations to help you grow.'
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('(tabs)');
    }
  };

  const handleSkip = () => {
    router.push('(tabs)');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Ionicons 
          name={onboardingSteps[currentStep].icon} 
          size={100} 
          color="#4FCF22" 
        />
        <Text style={styles.title}>
          {onboardingSteps[currentStep].title}
        </Text>
        <Text style={styles.description}>
          {onboardingSteps[currentStep].description}
        </Text>

        <View style={styles.dotsContainer}>
          {onboardingSteps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                currentStep === index ? styles.activeDot : styles.inactiveDot
              ]} 
            />
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentStep < onboardingSteps.length - 1 ? 'Next' : 'Get Started'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    color: '#AAAAAA',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4FCF22',
  },
  inactiveDot: {
    backgroundColor: '#333333',
  },
  nextButton: {
    backgroundColor: '#4FCF22',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
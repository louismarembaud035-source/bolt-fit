import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ExerciseLibraryScreen from './src/screens/ExerciseLibraryScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  const [step, setStep] = useState(0); // 0-3: Onboarding, 4: Dashboard, 5: Library
  const [answers, setAnswers] = useState({ goal: '', level: '', equipment: '' });
  const [userProgram, setUserProgram] = useState(null);

  const handleFinishOnboarding = (finalAnswers, program) => {
    setAnswers(finalAnswers);
    setUserProgram(program);
    setStep(4);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ goal: '', level: '', equipment: '' });
    setUserProgram(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {step <= 3 && (
        <OnboardingScreen step={step} setStep={setStep} onFinish={handleFinishOnboarding} />
      )}
      {step === 4 && userProgram && (
        <DashboardScreen 
          userProgram={userProgram} 
          answers={answers} 
          onNavigateLibrary={() => setStep(5)} 
          onReset={handleReset} 
        />
      )}
      {step === 5 && (
        <ExerciseLibraryScreen onBack={() => setStep(4)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';

export default function OnboardingScreen({ step, setStep, onFinish }) {
  const [answers, setAnswers] = useState({ goal: '', level: '', equipment: '' });

  const handleAnswer = (key, value) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      generateProgram(updatedAnswers);
    }
  };

  const generateProgram = (finalAnswers) => {
    let program = {
      title: "Full Body Explosif",
      duration: "4 semaines",
      nextSession: "Séance A - Haut du corps",
      calories: "350 kcal",
      durationSession: "45 min"
    };

    if (finalAnswers.goal === "Prise de muscle") {
      program = {
        title: "Hypertrophie & Force",
        duration: "6 semaines",
        nextSession: "Séance Pectoraux / Triceps",
        calories: "450 kcal",
        durationSession: "60 min"
      };
    } else if (finalAnswers.goal === "Perte de gras") {
      program = {
        title: "Brûleur de Graisses Cardio",
        duration: "4 semaines",
        nextSession: "Circuit HIIT Intense",
        calories: "500 kcal",
        durationSession: "35 min"
      };
    }

    onFinish(finalAnswers, program);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.logo}>BOLT<Text style={styles.accentText}>FIT</Text></Text>
        <Text style={styles.tagline}>Ton coach fitness intelligent</Text>
      </View>

      {step === 0 && (
        <View style={styles.card}>
          <Text style={styles.title}>Prêt à transformer ton physique ?</Text>
          <Text style={styles.subtitle}>Réponds à 3 questions rapides pour obtenir ton programme sur-mesure.</Text>
          <TouchableOpacity style={styles.button} onPress={() => setStep(1)}>
            <Text style={styles.buttonText}>Commencer le questionnaire</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.stepIndicator}>Question 1 sur 3</Text>
          <Text style={styles.title}>Quel est ton objectif principal ?</Text>
          {['Se tonifier', 'Prise de muscle', 'Perte de gras'].map((item) => (
            <TouchableOpacity key={item} style={styles.optionButton} onPress={() => handleAnswer('goal', item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.stepIndicator}>Question 2 sur 3</Text>
          <Text style={styles.title}>Quel est ton niveau actuel ?</Text>
          {['Débutant', 'Intermédiaire', 'Avancé'].map((item) => (
            <TouchableOpacity key={item} style={styles.optionButton} onPress={() => handleAnswer('level', item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.stepIndicator}>Question 3 sur 3</Text>
          <Text style={styles.title}>De quel matériel disposes-tu ?</Text>
          {['Poids du corps uniquement', 'Élastiques / Haltères', 'Salle de sport complète'].map((item) => (
            <TouchableOpacity key={item} style={styles.optionButton} onPress={() => handleAnswer('equipment', item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 32, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: 2 },
  accentText: { color: COLORS.primary },
  tagline: { color: COLORS.textSecondary, fontSize: 14, marginTop: 5 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 20 },
  subtitle: { fontSize: 15, color: COLORS.textSecondary, marginBottom: 24, lineHeight: 22 },
  stepIndicator: { color: COLORS.primary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  button: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },
  optionButton: { backgroundColor: '#2A2A2A', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  optionText: { color: COLORS.textPrimary, fontSize: 16 },
});

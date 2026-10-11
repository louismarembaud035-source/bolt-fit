import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  // États pour gérer le questionnaire
  const [step, setStep] = useState(0); // 0: Accueil, 1: Objectif, 2: Niveau, 3: Matériel, 4: Résultat
  const [answers, setAnswers] = useState({ goal: '', level: '', equipment: '' });
  const [recommendation, setRecommendation] = useState(null);

  // Données du questionnaire
  const handleAnswer = (key, value) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      generateProgram(updatedAnswers);
    }
  };

  // Logique de recommandation automatique du programme
  const generateProgram = (finalAnswers) => {
    let program = {
      title: "Programme Full Body Explosif",
      duration: "4 semaines",
      description: "Idéal pour sculpter l'ensemble du corps avec un maximum d'efficacité."
    };

    if (finalAnswers.goal === "Prise de muscle") {
      program = {
        title: "Hypertrophie & Force Corail",
        duration: "6 semaines",
        description: "Séances axées sur la surcharge progressive et le volume musculaire."
      };
    } else if (finalAnswers.goal === "Perte de gras") {
      program = {
        title: "Brûleur de Graisses Cardio",
        duration: "4 semaines",
        description: "Circuit training intense combinant renforcement et cardio."
      };
    }

    setRecommendation(program);
    setStep(4); // Écran de résultat
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ goal: '', level: '', equipment: '' });
    setRecommendation(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* En-tête de l'application */}
        <View style={styles.header}>
          <Text style={styles.logo}>BOLT<Text style={styles.accentText}>FIT</Text></Text>
          <Text style={styles.tagline}>Ton coach fitness intelligent</Text>
        </View>

        {/* ÉTAPE 0 : Accueil */}
        {step === 0 && (
          <View style={styles.card}>
            <Text style={styles.title}>Prêt à transformer ton physique ?</Text>
            <Text style={styles.subtitle}>Réponds à 3 questions rapides pour obtenir ton programme sur-mesure.</Text>
            <TouchableOpacity style={styles.button} onPress={() => setStep(1)}>
              <Text style={styles.buttonText}>Commencer le questionnaire</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ÉTAPE 1 : Objectif */}
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

        {/* ÉTAPE 2 : Niveau */}
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

        {/* ÉTAPE 3 : Matériel */}
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

        {/* ÉTAPE 4 : Résultat & Recommandation */}
        {step === 4 && recommendation && (
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Recommandation sur-mesure</Text>
            </View>
            <Text style={styles.resultTitle}>{recommendation.title}</Text>
            <Text style={styles.resultDuration}>⏱️ Durée : {recommendation.duration}</Text>
            <Text style={styles.resultDesc}>{recommendation.description}</Text>
            
            <TouchableOpacity style={styles.button} onPress={resetQuiz}>
              <Text style={styles.buttonText}>Recommencer le test</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// Feuille de style (Thème sombre & Rouge Corail)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fond sombre anthracite
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  accentText: {
    color: '#FF5252', // Rouge corail signature
  },
  tagline: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#A0A0A0',
    marginBottom: 24,
    lineHeight: 22,
  },
  stepIndicator: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF5252', // Bouton principal rouge corail
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  badge: {
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  resultDuration: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 12,
  },
  resultDesc: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
});

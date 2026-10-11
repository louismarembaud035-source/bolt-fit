import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function App() {
  const [step, setStep] = useState(0); // 0: Accueil, 1-3: Questions, 4: Dashboard principal
  const [answers, setAnswers] = useState({ goal: '', level: '', equipment: '' });
  const [userProgram, setUserProgram] = useState(null);

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

    setUserProgram(program);
    setStep(4); // Passage direct au Dashboard
  };

  const resetApp = () => {
    setStep(0);
    setAnswers({ goal: '', level: '', equipment: '' });
    setUserProgram(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* En-tête global */}
        <View style={styles.header}>
          <Text style={styles.logo}>BOLT<Text style={styles.accentText}>FIT</Text></Text>
          {step === 4 && <Text style={styles.welcomeUser}>Salut, champion ! 🔥</Text>}
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

        {/* ÉTAPES 1, 2, 3 : Questionnaire */}
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
            <Text style={styles.title}> De quel matériel disposes-tu ?</Text>
            {['Poids du corps uniquement', 'Élastiques / Haltères', 'Salle de sport complète'].map((item) => (
              <TouchableOpacity key={item} style={styles.optionButton} onPress={() => handleAnswer('equipment', item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ÉTAPE 4 : TABLEAU DE BORD PRINCIPAL (DASHBOARD) */}
        {step === 4 && userProgram && (
          <View>
            {/* Carte du Programme Actif */}
            <View style={styles.cardActiveProgram}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Programme Actif</Text>
              </View>
              <Text style={styles.dashboardProgramTitle}>{userProgram.title}</Text>
              <Text style={styles.dashboardProgramSub}>Objectif : {answers.goal}</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>⏱️ {userProgram.durationSession}</Text>
                  <Text style={styles.statLabel}>Durée moy.</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>🔥 {userProgram.calories}</Text>
                  <Text style={styles.statLabel}>Dépense</Text>
                </View>
              </View>
            </View>

            {/* Carte de la Séance du Jour */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Séance du jour</Text>
              <Text style={styles.sessionName}>{userProgram.nextSession}</Text>
              <Text style={styles.subtitle}>Prêt à transpirer ? Lance ta séance dès maintenant.</Text>
              
              <TouchableOpacity style={styles.button} onPress={() => alert("Lancement de la séance ! (Prochaine étape à coder)")}>
                <Text style={styles.buttonText}>Lancer la séance ▶</Text>
              </TouchableOpacity>
            </View>

            {/* Bouton de réinitialisation pour tester */}
            <TouchableOpacity style={styles.resetButton} onPress={resetApp}>
              <Text style={styles.resetButtonText}>Refaire le questionnaire</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

// Styles du design system (Thème sombre & Rouge Corail)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  accentText: {
    color: '#FF5252',
  },
  welcomeUser: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardActiveProgram: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF5252',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 20,
    lineHeight: 20,
  },
  stepIndicator: {
    color: '#FF5252',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF5252',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
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
  dashboardProgramTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  dashboardProgramSub: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  sessionName: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resetButton: {
    alignItems: 'center',
    padding: 12,
    marginBottom: 30,
  },
  resetButtonText: {
    color: '#A0A0A0',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';

export default function DashboardScreen({ userProgram, answers, onNavigateLibrary, onReset }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.logo}>BOLT<Text style={styles.accentText}>FIT</Text></Text>
        <Text style={styles.welcomeUser}>Salut, champion ! 🔥</Text>
      </View>

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

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Séance du jour</Text>
        <Text style={styles.sessionName}>{userProgram.nextSession}</Text>
        <Text style={styles.subtitle}>Prêt à transpirer ? Lance ta séance dès maintenant.</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => alert("Lancement de la séance !")}>
          <Text style={styles.buttonText}>Lancer la séance ▶</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={onNavigateLibrary}>
        <Text style={styles.secondaryButtonText}>🔍 Explorer la bibliothèque d'exercices</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Refaire le questionnaire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  logo: { fontSize: 28, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: 2 },
  accentText: { color: COLORS.primary },
  welcomeUser: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '600' },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 24, marginBottom: 20 },
  cardActiveProgram: { backgroundColor: COLORS.card, borderRadius: 16, padding: 24, marginBottom: 20, borderWidth: 1, borderColor: COLORS.primary },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 10 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 20, lineHeight: 20 },
  button: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  secondaryButtonText: { color: COLORS.textPrimary, fontSize: 15, fontWeight: 'bold' },
  badge: { backgroundColor: COLORS.primaryLight, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { color: COLORS.primary, fontSize: 12, fontWeight: 'bold' },
  dashboardProgramTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 4 },
  dashboardProgramSub: { color: COLORS.textSecondary, fontSize: 14, marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingTop: 16 },
  statItem: { flex: 1 },
  statValue: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  statLabel: { color: COLORS.textSecondary, fontSize: 12 },
  sessionName: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  resetButton: { alignItems: 'center', padding: 12, marginBottom: 30 },
  resetButtonText: { color: COLORS.textSecondary, fontSize: 14, textDecorationLine: 'underline' },
});

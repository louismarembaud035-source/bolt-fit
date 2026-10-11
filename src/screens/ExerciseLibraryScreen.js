import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';

export default function ExerciseLibraryScreen({ onBack }) {
  const [selectedMuscle, setSelectedMuscle] = useState('Tous');

  const exercises = [
    { id: '1', name: 'Développé Couché', muscle: 'Pectoraux', level: 'Intermédiaire', equip: 'Haltères / Barre' },
    { id: '2', name: 'Pompes Classiques', muscle: 'Pectoraux', level: 'Tous niveaux', equip: 'Poids du corps' },
    { id: '3', name: 'Squat Bulgare', muscle: 'Jambes', level: 'Intermédiaire', equip: 'Haltères' },
    { id: '4', name: 'Squat Libre', muscle: 'Jambes', level: 'Tous niveaux', equip: 'Poids du corps' },
    { id: '5', name: 'Tractions Pronination', muscle: 'Dos', level: 'Avancé', equip: 'Barre de traction' },
    { id: '6', name: 'Rowing Buste Penché', muscle: 'Dos', level: 'Intermédiaire', equip: 'Haltères' },
    { id: '7', name: 'Crunch Abdominal', muscle: 'Abdominaux', level: 'Tous niveaux', equip: 'Poids du corps' },
  ];

  const filteredExercises = selectedMuscle === 'Tous' 
    ? exercises 
    : exercises.filter(ex => ex.muscle === selectedMuscle);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.logo}>BOLT<Text style={styles.accentText}>FIT</Text></Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backLink}>← Retour Dashboard</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Bibliothèque d'Exercices</Text>
      <Text style={styles.subtitle}>Filtre par groupe musculaire pour découvrir les mouvements.</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {['Tous', 'Pectoraux', 'Jambes', 'Dos', 'Abdominaux'].map((muscle) => (
          <TouchableOpacity 
            key={muscle} 
            style={[styles.filterChip, selectedMuscle === muscle && styles.filterChipActive]}
            onPress={() => setSelectedMuscle(muscle)}
          >
            <Text style={[styles.filterText, selectedMuscle === muscle && styles.filterTextActive]}>{muscle}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredExercises.map((ex) => (
        <View key={ex.id} style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            <View style={styles.muscleBadge}>
              <Text style={styles.muscleBadgeText}>{ex.muscle}</Text>
            </View>
          </View>
          <Text style={styles.exerciseDetail}>Niveau : {ex.level} • Matériel : {ex.equip}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  logo: { fontSize: 28, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: 2 },
  accentText: { color: COLORS.primary },
  backLink: { color: COLORS.primary, fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 10 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 20, lineHeight: 20 },
  filterContainer: { marginBottom: 20, maxHeight: 50 },
  filterChip: { backgroundColor: COLORS.card, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: COLORS.border, height: 40 },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { color: COLORS.textSecondary, fontWeight: '600' },
  filterTextActive: { color: COLORS.textPrimary },
  exerciseCard: { backgroundColor: COLORS.card, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.cardBorder },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  exerciseName: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },
  muscleBadge: { backgroundColor: COLORS.primaryLight, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  muscleBadgeText: { color: COLORS.primary, fontSize: 11, fontWeight: 'bold' },
  exerciseDetail: { color: COLORS.textSecondary, fontSize: 13 },
});

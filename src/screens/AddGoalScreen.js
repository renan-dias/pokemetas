import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { addGoal } from '../db/database';

const AddGoalScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleAddGoal = () => {
    if (title.trim() && minutes.trim() && parseInt(minutes) > 0) {
      addGoal(title.trim(), parseInt(minutes), () => {
        navigation.goBack();
      });
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente. A duração deve ser maior que 0.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Meta</Text>

      <Text style={styles.label}>Título da Meta</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar documentação"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Duração (minutos)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 25"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={minutes}
        onChangeText={setMinutes}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAddGoal}>
        <Text style={styles.saveButtonText}>Salvar Meta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937', // gray-800
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#374151', // gray-700
    color: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#22C55E', // green-500
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddGoalScreen;


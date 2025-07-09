import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styled } from 'nativewind';
import { addGoal } from '../db/database';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const AddGoalScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleAddGoal = () => {
    if (title.trim() && minutes.trim() && parseInt(minutes) > 0) {
      addGoal(title.trim(), parseInt(minutes), () => {
        navigation.goBack();
      });
    } else {
      // Pode adicionar um alerta aqui se necessário
      console.log('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <StyledView className="flex-1 bg-gray-800 p-6">
      <StyledText className="text-3xl font-bold text-white mb-8">Nova Meta</StyledText>

      <StyledText className="text-white text-lg mb-2">Título da Meta</StyledText>
      <StyledTextInput
        className="bg-gray-700 text-white p-4 rounded-lg mb-6"
        placeholder="Ex: Estudar documentação"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
      />

      <StyledText className="text-white text-lg mb-2">Duração (minutos)</StyledText>
      <StyledTextInput
        className="bg-gray-700 text-white p-4 rounded-lg mb-8"
        placeholder="Ex: 25"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={minutes}
        onChangeText={setMinutes}
      />

      <Button title="Salvar Meta" onPress={handleAddGoal} color="#22C55E" />
    </StyledView>
  );
};

export default AddGoalScreen;


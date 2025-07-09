import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PixelPet from '../components/PixelPet';
import { fetchGoals, setGoalCompleted } from '../db/database';
import { PlusCircle } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [activeGoal, setActiveGoal] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [petStatus, setPetStatus] = useState('idle');

  const loadGoals = useCallback(() => {
    fetchGoals(data => {
      setGoals(data);
    });
  }, []);

  useFocusEffect(loadGoals);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setPetStatus('happy');
      setGoalCompleted(activeGoal.id, loadGoals);
      setActiveGoal(null);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, activeGoal, loadGoals]);

  const startTimer = (goal) => {
    setActiveGoal(goal);
    setTimeLeft(goal.minutes * 60);
    setIsActive(true);
    setPetStatus('working');
  };

  const stopTimer = () => {
    setIsActive(false);
    setPetStatus('sad');
    setActiveGoal(null);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <PixelPet status={petStatus} />

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {formatTime(timeLeft)}
        </Text>
      </View>

      {isActive && (
        <TouchableOpacity style={styles.cancelButton} onPress={stopTimer}>
          <Text style={styles.cancelButtonText}>Cancelar Foco</Text>
        </TouchableOpacity>
      )}

      <View style={styles.goalsContainer}>
        <Text style={styles.goalsTitle}>Metas de Foco:</Text>
        <FlatList
          data={goals.filter(g => g.completed === 0)}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.goalItem, isActive && styles.goalItemDisabled]}
              onPress={() => !isActive && startTimer(item)}
              disabled={isActive}
            >
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text style={styles.goalDuration}>{item.minutes} min</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Adicione uma nova meta!</Text>}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddGoal')}
      >
        <PlusCircle color="white" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937', // gray-800
    padding: 24,
    alignItems: 'center',
  },
  timerContainer: {
    marginVertical: 32,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#EF4444', // red-500
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalsContainer: {
    width: '100%',
    marginTop: 32,
    flex: 1,
  },
  goalsTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  goalItem: {
    backgroundColor: '#374151', // gray-700
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalItemDisabled: {
    opacity: 0.5,
  },
  goalTitle: {
    color: 'white',
    fontSize: 18,
  },
  goalDuration: {
    color: '#FBBF24', // yellow-400
    fontSize: 16,
  },
  emptyText: {
    color: '#9CA3AF', // gray-400
    textAlign: 'center',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#22C55E', // green-500
    padding: 16,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;


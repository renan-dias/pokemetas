import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import AddGoalScreen from './src/screens/AddGoalScreen';

import { setupDatabase } from './src/db/database';

const Stack = createNativeStackNavigator();

export default function App() {
  // Inicializa o banco de dados quando o app abre
  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1F2937' }, // bg-gray-800
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pixel Pet Timer' }}
        />
        <Stack.Screen
          name="AddGoal"
          component={AddGoalScreen}
          options={{ title: 'Adicionar Nova Meta' }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importando nossas telas personalizadas
import TelaInicial from './src/telas/TelaInicial';
import TelaNovaMeta from './src/telas/TelaNovaMeta';
import TelaPokedex from './src/telas/TelaPokedex';
import TelaConfiguracoes from './src/telas/TelaConfiguracoes';

// Importando configuração do banco de dados
import { configurarBancoDados } from './src/dados/bancoDados';

// Criando navegador para trocar entre telas
const Navegador = createNativeStackNavigator();

export default function App() {
  // Configura banco quando app inicializa
  useEffect(() => {
    configurarBancoDados();
  }, []);

  return (
    <NavigationContainer>
      {/* Configurações gerais do cabeçalho */}
      <Navegador.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' }, // Fundo roxo
          headerTintColor: '#FFFFFF',                   // Texto branco
          headerTitleStyle: { fontWeight: 'bold' },     // Texto negrito
        }}
      >
        {/* Tela principal - onde ficam os ovos */}
        <Navegador.Screen
          name="Inicial"
          component={TelaInicial}
          options={{ title: '🥚 Chocadeira de Pets' }}
        />
        
        {/* Tela para criar nova meta */}
        <Navegador.Screen
          name="NovaMeta"
          component={TelaNovaMeta}
          options={{ title: '⏰ Nova Meta' }}
        />
        
        {/* Tela tipo Pokédex */}
        <Navegador.Screen
          name="Pokedex"
          component={TelaPokedex}
          options={{ title: '📖 Minha Coleção' }}
        />
        
        {/* Tela de configurações */}
        <Navegador.Screen
          name="Configuracoes"
          component={TelaConfiguracoes}
          options={{ title: '⚙️ Configurações' }}
        />
      </Navegador.Navigator>
      
      {/* Barra de status em cor clara */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}


import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { cores, espacamentos, estilosComuns } from '../configuracoes/estilos';
import { showDebugMenu, DEBUG_CONFIG } from '../configuracoes/debug';
import { limparTodosDados, obterEstatisticas } from '../dados/bancoDados';
import { executarDemonstracao } from '../dados/exemplos';

const TelaConfiguracoes = ({ navigation }) => {
  const [debugAtivo, setDebugAtivo] = useState(DEBUG_CONFIG.VERBOSE_LOGS);
  const [timersRapidos, setTimersRapidos] = useState(DEBUG_CONFIG.FAST_TIMERS);

  const handleLimparDados = () => {
    Alert.alert(
      'Limpar Dados',
      'Tem certeza que deseja apagar todas as metas e bichinhos? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => {
            limparTodosDados();
            Alert.alert('Sucesso', 'Todos os dados foram limpos!');
          },
        },
      ]
    );
  };

  const mostrarEstatisticas = async () => {
    try {
      const stats = await obterEstatisticas();
      Alert.alert(
        'Estatísticas do App',
        `Metas Concluídas: ${stats.metasConcluidas}\n` +
        `Metas Pendentes: ${stats.metasPendentes}\n` +
        `Bichinhos Únicos: ${stats.bichinhosUnicos}\n` +
        `Total Disponível: ${stats.totalBichinhos}`
      );
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível obter as estatísticas');
    }
  };

  return (
    <ScrollView style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>Configurações</Text>

      {/* Seção de Estatísticas */}
      <View style={estilosComuns.card}>
        <Text style={estilos.subtitulo}>Estatísticas</Text>
        <TouchableOpacity
          style={estilosComuns.botaoPrimario}
          onPress={mostrarEstatisticas}
        >
          <Text style={estilosComuns.textoBotao}>Ver Estatísticas</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Debug (apenas em desenvolvimento) */}
      {__DEV__ && (
        <View style={estilosComuns.card}>
          <Text style={estilos.subtitulo}>Debug (Desenvolvimento)</Text>
          
          <View style={estilos.opcao}>
            <Text style={estilos.textoOpcao}>Logs Detalhados</Text>
            <Switch
              value={debugAtivo}
              onValueChange={setDebugAtivo}
              trackColor={{ false: cores.cinzaClaro, true: cores.primaria }}
            />
          </View>

          <View style={estilos.opcao}>
            <Text style={estilos.textoOpcao}>Timers Rápidos (Testes)</Text>
            <Switch
              value={timersRapidos}
              onValueChange={setTimersRapidos}
              trackColor={{ false: cores.cinzaClaro, true: cores.primaria }}
            />
          </View>

          <TouchableOpacity
            style={[estilosComuns.botaoSecundario, { marginTop: espacamentos.md }]}
            onPress={showDebugMenu}
          >
            <Text style={estilosComuns.textoBotao}>Menu de Debug</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilosComuns.botaoPrimario, { marginTop: espacamentos.sm, backgroundColor: cores.info }]}
            onPress={async () => {
              const resultado = await executarDemonstracao();
              Alert.alert(
                resultado.sucesso ? 'Sucesso!' : 'Erro',
                resultado.mensagem
              );
            }}
          >
            <Text style={estilosComuns.textoBotao}>Executar Demonstração</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Seção de Dados */}
      <View style={estilosComuns.card}>
        <Text style={estilos.subtitulo}>Gerenciar Dados</Text>
        <TouchableOpacity
          style={[estilosComuns.botaoPrimario, { backgroundColor: cores.erro }]}
          onPress={handleLimparDados}
        >
          <Text style={estilosComuns.textoBotao}>Limpar Todos os Dados</Text>
        </TouchableOpacity>
      </View>

      {/* Seção Sobre */}
      <View style={estilosComuns.card}>
        <Text style={estilos.subtitulo}>Sobre o App</Text>
        <Text style={estilos.textoDescricao}>
          PixelPetTimer v1.0{'\n'}
          Um app de produtividade gamificado onde você choca ovos ao completar tarefas!
        </Text>
      </View>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={[estilosComuns.botaoSecundario, { marginTop: espacamentos.lg }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={estilosComuns.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    marginBottom: espacamentos.md,
  },
  opcao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: espacamentos.sm,
    borderBottomWidth: 1,
    borderBottomColor: cores.cinzaClaro,
  },
  textoOpcao: {
    fontSize: 16,
    color: cores.cinzaEscuro,
  },
  textoDescricao: {
    fontSize: 14,
    color: cores.cinzaMedio,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default TelaConfiguracoes;

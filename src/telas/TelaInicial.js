import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  RefreshControl 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importa componentes personalizados
import OvoChocando from '../componentes/OvoChocando';
import BichinhoNascido from '../componentes/BichinhoNascido';

// Importa funções do banco de dados
import { 
  obterMetasAtivas, 
  concluirMeta, 
  sortearBichinho, 
  registrarBichinho,
  obterEstatisticas 
} from '../dados/bancoDados';

// Importa mensagens
import { obterMensagem } from '../configuracoes/mensagens';

const TelaInicial = ({ navigation }) => {
  // Estados da tela
  const [metas, setMetas] = useState([]);
  const [bichinhoAtual, setBichinhoAtual] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [estatisticas, setEstatisticas] = useState({});
  const [carregando, setCarregando] = useState(false);

  // Carrega dados quando tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  // Função para carregar metas ativas e estatísticas
  const carregarDados = async () => {
    setCarregando(true);
    try {
      const metasAtivas = await obterMetasAtivas();
      const stats = await obterEstatisticas();
      
      setMetas(metasAtivas);
      setEstatisticas(stats);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados');
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função chamada quando meta é completada
  const aoCompletarMeta = async (meta) => {
    try {
      // Marca meta como concluída no banco
      await concluirMeta(meta.id);
      
      // Sorteia um bichinho aleatório
      const bichinhoSorteado = await sortearBichinho();
      
      // Registra o bichinho na coleção
      await registrarBichinho(bichinhoSorteado);
      
      // Mostra popup com o bichinho
      setBichinhoAtual(bichinhoSorteado);
      setMostrarPopup(true);
      
      // Atualiza lista de metas
      await carregarDados();
      
    } catch (error) {
      Alert.alert('Erro', 'Problema ao completar meta');
      console.error('Erro ao completar meta:', error);
    }
  };

  // Função para fechar popup do bichinho
  const fecharPopupBichinho = () => {
    setMostrarPopup(false);
    setBichinhoAtual(null);
  };

  // Função para navegar para nova meta
  const irParaNovaMeta = () => {
    navigation.navigate('NovaMeta');
  };

  // Função para navegar para Pokédex
  const irParaPokedex = () => {
    navigation.navigate('Pokedex');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com estatísticas */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloPrincipal}>
          {obterMensagem('boasVindas')}
        </Text>
        
        <View style={styles.estatisticas}>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.totalBichinhos || 0}</Text>
            <Text style={styles.labelEstat}>Bichinhos</Text>
          </View>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.metasConcluidas || 0}</Text>
            <Text style={styles.labelEstat}>Metas</Text>
          </View>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.tempoTotal || 0}h</Text>
            <Text style={styles.labelEstat}>Tempo</Text>
          </View>
        </View>
      </View>

      {/* Lista de ovos (metas ativas) */}
      <ScrollView 
        style={styles.listaOvos}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregarDados} />
        }
      >
        {metas.length === 0 ? (
          // Tela vazia - nenhuma meta ativa
          <View style={styles.telaVazia}>
            <Text style={styles.emojiVazio}>🥚</Text>
            <Text style={styles.tituloVazio}>
              {obterMensagem('nenhumaMeta')}
            </Text>
            <Text style={styles.descricaoVazia}>
              {obterMensagem('crieFirstaMeta')}
            </Text>
            <TouchableOpacity style={styles.botaoPrimeiro} onPress={irParaNovaMeta}>
              <Text style={styles.textoBotaoPrimeiro}>
                ➕ Criar primeira meta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Lista de ovos
          metas.map((meta) => (
            <OvoChocando
              key={meta.id}
              meta={meta}
              aoCompletar={aoCompletarMeta}
            />
          ))
        )}
      </ScrollView>

      {/* Botões de navegação fixos na parte inferior */}
      <View style={styles.botoesFixos}>
        <TouchableOpacity style={styles.botaoNavegacao} onPress={irParaNovaMeta}>
          <Text style={styles.textoBotaoNav}>➕ Nova Meta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoNavegacao} onPress={irParaPokedex}>
          <Text style={styles.textoBotaoNav}>📖 Coleção</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoNavegacao} 
          onPress={() => navigation.navigate('Configuracoes')}
        >
          <Text style={styles.textoBotaoNav}>⚙️ Config</Text>
        </TouchableOpacity>
      </View>

      {/* Popup do bichinho nascido */}
      <BichinhoNascido
        visivel={mostrarPopup}
        bichinho={bichinhoAtual}
        aoFechar={fecharPopupBichinho}
      />
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cabecalho: {
    backgroundColor: '#4F46E5',
    padding: 20,
    paddingTop: 40,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  estatisticas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  estatistica: {
    alignItems: 'center',
  },
  numeroEstat: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  labelEstat: {
    fontSize: 12,
    color: '#E5E7EB',
    marginTop: 2,
  },
  listaOvos: {
    flex: 1,
  },
  telaVazia: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emojiVazio: {
    fontSize: 80,
    marginBottom: 20,
  },
  tituloVazio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoVazia: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  botaoPrimeiro: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  textoBotaoPrimeiro: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botoesFixos: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 15,
  },
  botaoNavegacao: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBotaoNav: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaInicial;

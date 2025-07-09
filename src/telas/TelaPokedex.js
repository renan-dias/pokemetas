import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Image,
  TextInput,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importa funções do banco de dados
import { 
  buscarBichinhos, 
  obterEstatisticas,
  limparDados 
} from '../dados/bancoDados';

// Importa mensagens
import { obterMensagem, obterMensagemRaridade } from '../configuracoes/mensagens';

const TelaPokedex = ({ navigation }) => {
  // Estados da tela
  const [bichinhos, setBichinhos] = useState([]);
  const [bichinhoSelecionado, setBichinhoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [filtroRaridade, setFiltroRaridade] = useState('todas');
  const [estatisticas, setEstatisticas] = useState({});
  const [carregando, setCarregando] = useState(false);

  // Carrega dados quando tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  // Função para carregar bichinhos e estatísticas
  const carregarDados = async () => {
    setCarregando(true);
    try {
      const listaBichinhos = await buscarBichinhos();
      const stats = await obterEstatisticas();
      
      setBichinhos(listaBichinhos);
      setEstatisticas(stats);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a coleção');
      console.error('Erro ao carregar bichinhos:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Filtra bichinhos baseado no texto e raridade
  const bichinhosFiltrados = bichinhos.filter(bichinho => {
    const correspondeTexto = bichinho.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                            bichinho.metaTitulo?.toLowerCase().includes(filtro.toLowerCase());
    
    const correspondeRaridade = filtroRaridade === 'todas' || 
                               bichinho.raridade === filtroRaridade;
    
    return correspondeTexto && correspondeRaridade;
  });

  // Função para mostrar detalhes do bichinho
  const mostrarDetalhesBichinho = (bichinho) => {
    setBichinhoSelecionado(bichinho);
    setMostrarDetalhes(true);
  };

  // Função para fechar detalhes
  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
    setBichinhoSelecionado(null);
  };

  // Função para limpar coleção (debug)
  const confirmarLimpeza = () => {
    Alert.alert(
      'Limpar Coleção',
      'ATENÇÃO: Isso apagará TODOS os seus bichinhos! Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar Tudo', 
          style: 'destructive',
          onPress: async () => {
            try {
              await limparDados();
              await carregarDados();
              Alert.alert('Sucesso', 'Coleção limpa com sucesso');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar a coleção');
            }
          }
        }
      ]
    );
  };

  // Cores baseadas na raridade
  const coresRaridade = {
    comum: '#10B981',
    raro: '#3B82F6',
    epico: '#8B5CF6',
    lendario: '#F59E0B',
  };

  // Conta bichinhos por raridade
  const contarPorRaridade = (raridade) => {
    return bichinhos.filter(b => b.raridade === raridade).length;
  };

  // Renderiza cada bichinho na lista
  const renderizarBichinho = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.cartaoBichinho,
        { borderColor: coresRaridade[item.raridade] || coresRaridade.comum }
      ]}
      onPress={() => mostrarDetalhesBichinho(item)}
    >
      {/* Imagem/emoji do bichinho */}
      <View style={[
        styles.avatarBichinho, 
        { backgroundColor: (coresRaridade[item.raridade] || coresRaridade.comum) + '20' }
      ]}>
        {item.imagem ? (
          <Image source={{ uri: item.imagem }} style={styles.imagemAvatar} />
        ) : (
          <Text style={styles.emojiAvatar}>🐾</Text>
        )}
      </View>

      {/* Info do bichinho */}
      <View style={styles.infoBichinho}>
        <Text style={styles.nomeBichinho}>{item.nome}</Text>
        <View style={[
          styles.tagRaridade, 
          { backgroundColor: coresRaridade[item.raridade] || coresRaridade.comum }
        ]}>
          <Text style={styles.textoTagRaridade}>
            {item.raridade?.toUpperCase() || 'COMUM'}
          </Text>
        </View>
        <Text style={styles.dataNascimento}>
          Nasceu em {new Date(item.conquistadoEm).toLocaleDateString('pt-BR')}
        </Text>
        <Text style={styles.metaCumprida}>
          Meta: {item.metaTitulo}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>📖 Coleção de Bichinhos</Text>
        
        {/* Estatísticas resumidas */}
        <View style={styles.estatisticasResumo}>
          <Text style={styles.totalBichinhos}>
            {bichinhos.length} {bichinhos.length === 1 ? 'bichinho' : 'bichinhos'}
          </Text>
          
          <View style={styles.raridadeResumo}>
            <Text style={styles.textoRaridadeResumo}>
              🟢 {contarPorRaridade('comum')} • 
              🔵 {contarPorRaridade('raro')} • 
              🟣 {contarPorRaridade('epico')} • 
              🟡 {contarPorRaridade('lendario')}
            </Text>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.containerFiltros}>
        {/* Busca por texto */}
        <TextInput
          style={styles.campoBusca}
          value={filtro}
          onChangeText={setFiltro}
          placeholder="Buscar por nome ou meta..."
          placeholderTextColor="#9CA3AF"
        />

        {/* Filtro de raridade */}
        <View style={styles.filtrosRaridade}>
          {['todas', 'comum', 'raro', 'epico', 'lendario'].map((raridade) => (
            <TouchableOpacity
              key={raridade}
              style={[
                styles.botaoFiltro,
                filtroRaridade === raridade && styles.botaoFiltroAtivo,
                raridade !== 'todas' && { borderColor: coresRaridade[raridade] }
              ]}
              onPress={() => setFiltroRaridade(raridade)}
            >
              <Text style={[
                styles.textoFiltro,
                filtroRaridade === raridade && styles.textoFiltroAtivo
              ]}>
                {raridade === 'todas' ? 'Todas' : raridade.charAt(0).toUpperCase() + raridade.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de bichinhos */}
      {bichinhosFiltrados.length === 0 ? (
        <View style={styles.listaVazia}>
          <Text style={styles.emojiVazio}>📭</Text>
          <Text style={styles.tituloVazio}>
            {bichinhos.length === 0 ? 
              'Coleção vazia' : 
              'Nenhum bichinho encontrado'
            }
          </Text>
          <Text style={styles.descricaoVazia}>
            {bichinhos.length === 0 ? 
              'Complete metas para ganhar seus primeiros bichinhos!' :
              'Tente ajustar os filtros de busca'
            }
          </Text>
          {bichinhos.length === 0 ? (
            <TouchableOpacity 
              style={styles.botaoNovaMeta}
              onPress={() => navigation.navigate('NovaMeta')}
            >
              <Text style={styles.textoBotaoNovaMeta}>🥚 Criar Meta</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.botaoLimparFiltros}
              onPress={() => {
                setFiltro('');
                setFiltroRaridade('todas');
              }}
            >
              <Text style={styles.textoBotaoLimpar}>Limpar Filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={bichinhosFiltrados}
          renderItem={renderizarBichinho}
          keyExtractor={(item) => item.id.toString()}
          style={styles.lista}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregarDados}
        />
      )}

      {/* Botão debug para limpar coleção */}
      {__DEV__ && bichinhos.length > 0 && (
        <TouchableOpacity 
          style={styles.botaoDebug} 
          onPress={confirmarLimpeza}
        >
          <Text style={styles.textoBotaoDebug}>🗑️ Limpar Coleção (Debug)</Text>
        </TouchableOpacity>
      )}

      {/* Modal de detalhes do bichinho */}
      <Modal visible={mostrarDetalhes} transparent animationType="slide">
        {bichinhoSelecionado && (
          <View style={styles.overlayModal}>
            <View style={[
              styles.modalDetalhes,
              { borderColor: coresRaridade[bichinhoSelecionado.raridade] || coresRaridade.comum }
            ]}>
              {/* Fechar modal */}
              <TouchableOpacity style={styles.botaoFecharModal} onPress={fecharDetalhes}>
                <Text style={styles.textoFechar}>✕</Text>
              </TouchableOpacity>

              {/* Imagem grande */}
              <View style={[
                styles.imagemGrandeContainer,
                { backgroundColor: (coresRaridade[bichinhoSelecionado.raridade] || coresRaridade.comum) + '20' }
              ]}>
                {bichinhoSelecionado.imagem ? (
                  <Image source={{ uri: bichinhoSelecionado.imagem }} style={styles.imagemGrande} />
                ) : (
                  <Text style={styles.emojiGrande}>🐾</Text>
                )}
              </View>

              {/* Detalhes */}
              <Text style={styles.nomeDetalhes}>{bichinhoSelecionado.nome}</Text>
              
              <View style={[
                styles.raridadeDetalhes, 
                { backgroundColor: coresRaridade[bichinhoSelecionado.raridade] || coresRaridade.comum }
              ]}>
                <Text style={styles.textoRaridadeDetalhes}>
                  {bichinhoSelecionado.raridade?.toUpperCase() || 'COMUM'}
                </Text>
              </View>

              <Text style={styles.metaDetalhes}>
                Meta cumprida: {bichinhoSelecionado.metaTitulo}
              </Text>

              <Text style={styles.dataDetalhes}>
                Nasceu em {new Date(bichinhoSelecionado.conquistadoEm).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </View>
          </View>
        )}
      </Modal>
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
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  estatisticasResumo: {
    alignItems: 'center',
  },
  totalBichinhos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  raridadeResumo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 8,
  },
  textoRaridadeResumo: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  containerFiltros: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  campoBusca: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  filtrosRaridade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  botaoFiltro: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  textoFiltro: {
    fontSize: 12,
    color: '#6B7280',
  },
  textoFiltroAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  lista: {
    flex: 1,
    padding: 15,
  },
  cartaoBichinho: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarBichinho: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  imagemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emojiAvatar: {
    fontSize: 30,
  },
  infoBichinho: {
    flex: 1,
  },
  nomeBichinho: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  tagRaridade: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  textoTagRaridade: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dataNascimento: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  metaCumprida: {
    fontSize: 12,
    color: '#4F46E5',
    fontStyle: 'italic',
  },
  listaVazia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emojiVazio: {
    fontSize: 60,
    marginBottom: 20,
  },
  tituloVazio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoVazia: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  botaoNovaMeta: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  textoBotaoNovaMeta: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoLimparFiltros: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  textoBotaoLimpar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoDebug: {
    backgroundColor: '#EF4444',
    margin: 15,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoDebug: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlayModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalDetalhes: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    borderWidth: 3,
  },
  botaoFecharModal: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  textoFechar: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  imagemGrandeContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagemGrande: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  emojiGrande: {
    fontSize: 50,
  },
  nomeDetalhes: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  raridadeDetalhes: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  textoRaridadeDetalhes: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  metaDetalhes: {
    fontSize: 14,
    color: '#4F46E5',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  dataDetalhes: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default TelaPokedex;

# 🥚 Tutorial PixelPetTimer - Parte 4: Componente do Ovo, Timer e Animações

## 🎯 O que vamos implementar

Nesta parte, vamos criar:
- 🥚 **Componente do ovo** com animações
- ⏱️ **Timer visual** com progresso circular
- ✨ **Animações suaves** durante a chocagem
- 🎉 **Sistema de conclusão** de metas
- 🐣 **Popup de nascimento** do bichinho

---

## 🥚 Componente OvoChocando

Primeiro, vamos criar o componente principal que exibe o ovo durante a chocagem.

### 1. Criar componente base

**Arquivo:** `src/componentes/OvoChocando.js`

```javascript
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

// Importar configurações
import { cores, espacamentos, estilosComuns, sombras } from '../configuracoes/estilos';

const { width } = Dimensions.get('window');

const OvoChocando = ({ 
  meta, 
  onConcluir, 
  onCancelar,
  emAndamento = false 
}) => {
  // Estados do componente
  const [tempoRestante, setTempoRestante] = useState(meta.minutos * 60); // em segundos
  const [progresso, setProgresso] = useState(0);
  const [pausado, setPausado] = useState(!emAndamento);
  
  // Animações
  const animacaoOvo = useRef(new Animated.Value(1)).current;
  const animacaoProgresso = useRef(new Animated.Value(0)).current;
  const animacaoTremida = useRef(new Animated.Value(0)).current;
  
  // Referência do timer
  const intervalRef = useRef(null);

  // Inicializar timer quando componente monta
  useEffect(() => {
    if (!pausado) {
      iniciarTimer();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pausado]);

  // Função para iniciar o timer
  const iniciarTimer = () => {
    intervalRef.current = setInterval(() => {
      setTempoRestante((tempo) => {
        const novoTempo = tempo - 1;
        
        // Calcular progresso (0 a 1)
        const progressoAtual = 1 - (novoTempo / (meta.minutos * 60));
        setProgresso(progressoAtual);
        
        // Animar progresso
        Animated.timing(animacaoProgresso, {
          toValue: progressoAtual,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        
        // Ativar tremida quando próximo do fim
        if (progressoAtual > 0.8) {
          ativarTremida();
        }
        
        // Meta concluída!
        if (novoTempo <= 0) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            onConcluir();
          }, 500);
          return 0;
        }
        
        return novoTempo;
      });
    }, 1000);
  };

  // Função para pausar/retomar
  const alternarPausa = () => {
    if (pausado) {
      setPausado(false);
      // Animar ovo voltando ao tamanho normal
      Animated.spring(animacaoOvo, {
        toValue: 1,
        tension: 150,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      setPausado(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Animar ovo diminuindo (pausado)
      Animated.spring(animacaoOvo, {
        toValue: 0.9,
        tension: 150,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  };

  // Função para ativar tremida do ovo
  const ativarTremida = () => {
    Animated.sequence([
      Animated.timing(animacaoTremida, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animacaoTremida, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animacaoTremida, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Função para cancelar timer
  const confirmarCancelamento = () => {
    Alert.alert(
      '⚠️ Cancelar Timer',
      'Tem certeza que deseja cancelar? O progresso será perdido.',
      [
        { text: 'Continuar', style: 'cancel' },
        { 
          text: 'Cancelar', 
          style: 'destructive',
          onPress: () => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            onCancelar();
          }
        },
      ]
    );
  };

  // Formatar tempo para exibição
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Título da meta */}
      <Text style={estilosComuns.titulo}>{meta.titulo}</Text>
      
      {/* Timer visual circular */}
      <View style={styles.containerTimer}>
        {/* Círculo de progresso */}
        <View style={styles.circuloProgresso}>
          <Animated.View
            style={[
              styles.progressoPreenchido,
              {
                transform: [
                  {
                    rotate: animacaoProgresso.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          
          {/* Ovo no centro */}
          <Animated.View
            style={[
              styles.containerOvo,
              {
                transform: [
                  { scale: animacaoOvo },
                  { translateX: animacaoTremida },
                ],
              },
            ]}
          >
            <Text style={styles.emojiOvo}>🥚</Text>
          </Animated.View>
        </View>
        
        {/* Tempo restante */}
        <Text style={styles.tempoRestante}>
          {formatarTempo(tempoRestante)}
        </Text>
        
        {/* Porcentagem */}
        <Text style={styles.porcentagem}>
          {Math.round(progresso * 100)}%
        </Text>
      </View>

      {/* Barra de progresso linear */}
      <View style={styles.barraProgresso}>
        <Animated.View
          style={[
            styles.progressoLinear,
            {
              width: animacaoProgresso.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      {/* Mensagem de status */}
      <View style={styles.containerStatus}>
        {pausado ? (
          <Text style={styles.textoStatus}>⏸️ Timer pausado</Text>
        ) : (
          <Text style={styles.textoStatus}>
            {progresso > 0.8 ? '🐣 Quase nascendo...' : '🥚 Chocando...'}
          </Text>
        )}
      </View>

      {/* Botões de controle */}
      <View style={styles.botoesControle}>
        <TouchableOpacity
          style={[estilosComuns.botaoSecundario, styles.botaoControle]}
          onPress={confirmarCancelamento}
        >
          <Text style={styles.textoBotaoSecundario}>❌ Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[estilosComuns.botaoPrimario, styles.botaoControle]}
          onPress={alternarPausa}
        >
          <Text style={estilosComuns.textoBotao}>
            {pausado ? '▶️ Continuar' : '⏸️ Pausar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos específicos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: espacamentos.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundoApp,
  },
  
  containerTimer: {
    alignItems: 'center',
    marginVertical: espacamentos.xl,
  },
  
  circuloProgresso: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...sombras.media,
  },
  
  progressoPreenchido: {
    position: 'absolute',
    top: -5,
    left: -5,
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 5,
    borderColor: cores.primaria,
    borderTopColor: cores.primaria,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  
  containerOvo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: cores.fundoOvo,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombras.leve,
  },
  
  emojiOvo: {
    fontSize: 60,
  },
  
  tempoRestante: {
    fontSize: 32,
    fontWeight: 'bold',
    color: cores.primaria,
    marginTop: espacamentos.md,
  },
  
  porcentagem: {
    fontSize: 18,
    color: cores.cinzaMedio,
    marginTop: espacamentos.xs,
  },
  
  barraProgresso: {
    width: width - (espacamentos.lg * 2),
    height: 8,
    backgroundColor: cores.cinzaClaro,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: espacamentos.lg,
  },
  
  progressoLinear: {
    height: '100%',
    backgroundColor: cores.primaria,
    borderRadius: 4,
  },
  
  containerStatus: {
    paddingVertical: espacamentos.md,
    paddingHorizontal: espacamentos.lg,
    backgroundColor: cores.fundoCard,
    borderRadius: 20,
    marginBottom: espacamentos.xl,
    ...sombras.leve,
  },
  
  textoStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: cores.cinzaEscuro,
    textAlign: 'center',
  },
  
  botoesControle: {
    flexDirection: 'row',
    width: '100%',
    gap: espacamentos.md,
  },
  
  botaoControle: {
    flex: 1,
  },
  
  textoBotaoSecundario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.primaria,
  },
});

export default OvoChocando;
```

---

## 🐣 Componente BichinhoNascido

Agora vamos criar o componente que exibe o popup quando um bichinho nasce.

### 1. Criar popup de nascimento

**Arquivo:** `src/componentes/BichinhoNascido.js`

```javascript
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

// Importar configurações
import { cores, espacamentos, estilosComuns, sombras } from '../configuracoes/estilos';

const { width, height } = Dimensions.get('window');

const BichinhoNascido = ({ 
  bichinho, 
  visivel, 
  onFechar 
}) => {
  // Animações
  const animacaoEscala = useRef(new Animated.Value(0)).current;
  const animacaoOpacidade = useRef(new Animated.Value(0)).current;
  const animacaoBichinho = useRef(new Animated.Value(0)).current;

  // Iniciar animações quando modal aparece
  useEffect(() => {
    if (visivel) {
      // Sequência de animações
      Animated.sequence([
        // Fundo aparece
        Animated.timing(animacaoOpacidade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Modal cresce
        Animated.spring(animacaoEscala, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
        // Bichinho "pula" para aparecer
        Animated.spring(animacaoBichinho, {
          toValue: 1,
          tension: 200,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animações
      animacaoEscala.setValue(0);
      animacaoOpacidade.setValue(0);
      animacaoBichinho.setValue(0);
    }
  }, [visivel]);

  // Função para fechar com animação
  const fecharComAnimacao = () => {
    Animated.sequence([
      Animated.spring(animacaoBichinho, {
        toValue: 0,
        tension: 200,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(animacaoEscala, {
        toValue: 0,
        tension: 150,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(animacaoOpacidade, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFechar();
    });
  };

  // Cores baseadas na raridade
  const coresRaridade = {
    comum: cores.comum,
    raro: cores.raro,
    epico: cores.epico,
    lendario: cores.lendario,
  };

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="none"
      onRequestClose={fecharComAnimacao}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: animacaoOpacidade,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ scale: animacaoEscala }],
            },
          ]}
        >
          {/* Cabeçalho com raridade */}
          <View style={[
            styles.cabecalho,
            { backgroundColor: coresRaridade[bichinho?.raridade] || cores.comum }
          ]}>
            <Text style={styles.tituloModal}>🎉 Nasceu um bichinho!</Text>
            <Text style={styles.raridade}>
              {bichinho?.raridade?.toUpperCase() || 'COMUM'}
            </Text>
          </View>

          {/* Bichinho com animação */}
          <Animated.View
            style={[
              styles.containerBichinho,
              {
                transform: [
                  { 
                    scale: animacaoBichinho.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1.2, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.circuloBichinho}>
              <Text style={styles.emojiBichinho}>
                {bichinho?.emoji || '🐾'}
              </Text>
            </View>
          </Animated.View>

          {/* Informações do bichinho */}
          <View style={styles.informacoes}>
            <Text style={styles.nomeBichinho}>
              {bichinho?.nome || 'Bichinho Misterioso'}
            </Text>
            <Text style={styles.descricao}>
              {bichinho?.descricao || 'Um novo amigo se juntou à sua coleção!'}
            </Text>
          </View>

          {/* Estatísticas */}
          <View style={styles.estatisticas}>
            <View style={styles.estatistica}>
              <Text style={styles.numeroEstat}>#{bichinho?.numero || '???'}</Text>
              <Text style={styles.labelEstat}>Número</Text>
            </View>
            <View style={styles.estatistica}>
              <Text style={styles.numeroEstat}>{bichinho?.nivel || 1}</Text>
              <Text style={styles.labelEstat}>Nível</Text>
            </View>
            <View style={styles.estatistica}>
              <Text style={styles.numeroEstat}>
                {bichinho?.raridade === 'lendario' ? '0.1%' :
                 bichinho?.raridade === 'epico' ? '5%' :
                 bichinho?.raridade === 'raro' ? '25%' : '70%'}
              </Text>
              <Text style={styles.labelEstat}>Chance</Text>
            </View>
          </View>

          {/* Botão para fechar */}
          <TouchableOpacity
            style={[
              estilosComuns.botaoPrimario,
              styles.botaoFechar,
              { backgroundColor: coresRaridade[bichinho?.raridade] || cores.primaria }
            ]}
            onPress={fecharComAnimacao}
          >
            <Text style={estilosComuns.textoBotao}>
              ✨ Adicionar à Coleção
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

// Estilos do popup
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modal: {
    width: width * 0.9,
    maxWidth: 350,
    backgroundColor: cores.branco,
    borderRadius: 20,
    overflow: 'hidden',
    ...sombras.forte,
  },
  
  cabecalho: {
    padding: espacamentos.lg,
    alignItems: 'center',
  },
  
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.branco,
    marginBottom: espacamentos.xs,
  },
  
  raridade: {
    fontSize: 14,
    fontWeight: 'bold',
    color: cores.branco,
    opacity: 0.9,
  },
  
  containerBichinho: {
    alignItems: 'center',
    paddingVertical: espacamentos.xl,
  },
  
  circuloBichinho: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: cores.fundoOvo,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombras.media,
  },
  
  emojiBichinho: {
    fontSize: 50,
  },
  
  informacoes: {
    padding: espacamentos.lg,
    alignItems: 'center',
  },
  
  nomeBichinho: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    textAlign: 'center',
    marginBottom: espacamentos.sm,
  },
  
  descricao: {
    fontSize: 16,
    color: cores.cinzaMedio,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  estatisticas: {
    flexDirection: 'row',
    paddingHorizontal: espacamentos.lg,
    paddingBottom: espacamentos.lg,
    justifyContent: 'space-around',
  },
  
  estatistica: {
    alignItems: 'center',
  },
  
  numeroEstat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  
  labelEstat: {
    fontSize: 12,
    color: cores.cinzaMedio,
    marginTop: espacamentos.xs,
  },
  
  botaoFechar: {
    margin: espacamentos.lg,
    marginTop: 0,
  },
});

export default BichinhoNascido;
```

---

## 🎯 Integrando com TelaInicial

Agora vamos atualizar a tela inicial para usar nossos novos componentes.

### 1. Atualizar TelaInicial.js

**Arquivo:** `src/telas/TelaInicial.js`

```javascript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

// Importar componentes
import OvoChocando from '../componentes/OvoChocando';
import BichinhoNascido from '../componentes/BichinhoNascido';

// Importar configurações
import { cores, espacamentos, estilosComuns } from '../configuracoes/estilos';

// Importar dados (vamos implementar depois)
import { buscarMetas, salvarBichinho } from '../dados/bancoDados';

const TelaInicial = ({ navigation }) => {
  // Estados
  const [metas, setMetas] = useState([]);
  const [metaAtiva, setMetaAtiva] = useState(null);
  const [bichinhoNascido, setBichinhoNascido] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carregar dados quando tela abre
  useEffect(() => {
    carregarMetas();
  }, []);

  // Atualizar quando volta para tela (depois de criar meta)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarMetas();
    });
    
    return unsubscribe;
  }, [navigation]);

  // Função para carregar metas
  const carregarMetas = async () => {
    try {
      // Por enquanto, dados fictícios (implementaremos banco depois)
      const metasFicticias = [
        { 
          id: 1, 
          titulo: 'Estudar React Native', 
          minutos: 2, // 2 minutos para teste rápido
          ativa: false 
        },
        { 
          id: 2, 
          titulo: 'Fazer exercícios', 
          minutos: 1, // 1 minuto para teste
          ativa: false 
        },
      ];
      
      setMetas(metasFicticias);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as metas');
    } finally {
      setCarregando(false);
    }
  };

  // Função para iniciar uma meta
  const iniciarMeta = (meta) => {
    setMetaAtiva(meta);
  };

  // Função quando meta é concluída
  const concluirMeta = async () => {
    try {
      // Sortear bichinho (implementaremos depois)
      const bichinhoSorteado = sortearBichinho();
      
      // Salvar no banco (implementaremos depois)
      // await salvarBichinho(bichinhoSorteado);
      
      // Exibir popup
      setBichinhoNascido(bichinhoSorteado);
      setMostrarPopup(true);
      
      // Resetar meta ativa
      setMetaAtiva(null);
      
    } catch (erro) {
      Alert.alert('Erro', 'Houve um problema ao concluir a meta');
    }
  };

  // Função para cancelar meta
  const cancelarMeta = () => {
    setMetaAtiva(null);
  };

  // Função para fechar popup
  const fecharPopup = () => {
    setMostrarPopup(false);
    setBichinhoNascido(null);
    // Recarregar metas para atualizar a lista
    carregarMetas();
  };

  // Função temporária para sortear bichinho
  const sortearBichinho = () => {
    const bichinhos = [
      {
        id: 1,
        numero: 1,
        nome: 'Pichinho Fofo',
        emoji: '🐱',
        raridade: 'comum',
        descricao: 'Um gatinho muito carinhoso que adora cochilar.',
        nivel: 1,
      },
      {
        id: 2,
        numero: 2,
        nome: 'Dragãozinho',
        emoji: '🐲',
        raridade: 'raro',
        descricao: 'Um pequeno dragão cheio de energia!',
        nivel: 1,
      },
      {
        id: 3,
        numero: 3,
        nome: 'Unicórnio Mágico',
        emoji: '🦄',
        raridade: 'epico',
        descricao: 'Uma criatura mágica que traz sorte e alegria.',
        nivel: 1,
      },
      {
        id: 4,
        numero: 4,
        nome: 'Fênix Dourada',
        emoji: '🔥',
        raridade: 'lendario',
        descricao: 'A lendária ave de fogo que renasce das cinzas.',
        nivel: 1,
      },
    ];
    
    // Probabilidades baseadas na raridade
    const rand = Math.random();
    if (rand < 0.001) return bichinhos[3]; // 0.1% lendário
    if (rand < 0.05) return bichinhos[2];  // 5% épico
    if (rand < 0.25) return bichinhos[1];  // 25% raro
    return bichinhos[0];                   // 70% comum
  };

  // Navegar para outras telas
  const irParaNovaMeta = () => {
    navigation.navigate('NovaMeta');
  };

  const irParaPokedex = () => {
    navigation.navigate('Pokedex');
  };

  const irParaConfiguracoes = () => {
    navigation.navigate('Configuracoes');
  };

  // Se há uma meta ativa, mostrar componente do ovo
  if (metaAtiva) {
    return (
      <>
        <OvoChocando
          meta={metaAtiva}
          onConcluir={concluirMeta}
          onCancelar={cancelarMeta}
          emAndamento={true}
        />
        
        <BichinhoNascido
          bichinho={bichinhoNascido}
          visivel={mostrarPopup}
          onFechar={fecharPopup}
        />
      </>
    );
  }

  // Tela principal (sem meta ativa)
  return (
    <View style={estilosComuns.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={estilosComuns.titulo}>
          Chocadeira de Bichinhos 🥚
        </Text>
        <Text style={estilosComuns.subtitulo}>
          Escolha uma meta para começar a chocar!
        </Text>
      </View>

      {/* Lista de metas */}
      <ScrollView style={styles.listaMetas}>
        {metas.length === 0 ? (
          // Estado vazio
          <View style={estilosComuns.card}>
            <Text style={styles.textoVazio}>
              🌟 Nenhuma meta criada ainda!
            </Text>
            <Text style={styles.descricaoVazia}>
              Crie uma meta para começar a chocar ovos{'\n'}
              e ganhar bichinhos incríveis!
            </Text>
            <TouchableOpacity
              style={estilosComuns.botaoPrimario}
              onPress={irParaNovaMeta}
            >
              <Text style={estilosComuns.textoBotao}>
                🥚 Criar Primeira Meta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Lista com metas
          metas.map((meta) => (
            <TouchableOpacity
              key={meta.id}
              style={[estilosComuns.card, styles.cardMeta]}
              onPress={() => iniciarMeta(meta)}
            >
              <Text style={styles.tituloMeta}>{meta.titulo}</Text>
              <Text style={styles.tempoMeta}>⏰ {meta.minutos} minutos</Text>
              <View style={styles.statusOvo}>
                <Text style={styles.emojiOvo}>🥚</Text>
                <Text style={styles.textoStatus}>Toque para iniciar!</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botões de navegação */}
      <View style={styles.botoesFixos}>
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaNovaMeta}
        >
          <Text style={styles.textoBotaoNav}>➕ Nova Meta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaPokedex}
        >
          <Text style={styles.textoBotaoNav}>📚 Coleção</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaConfiguracoes}
        >
          <Text style={styles.textoBotaoNav}>⚙️ Config</Text>
        </TouchableOpacity>
      </View>
      
      {/* Popup do bichinho */}
      <BichinhoNascido
        bichinho={bichinhoNascido}
        visivel={mostrarPopup}
        onFechar={fecharPopup}
      />
    </View>
  );
};

// Estilos específicos desta tela
const styles = StyleSheet.create({
  cabecalho: {
    paddingVertical: espacamentos.lg,
    alignItems: 'center',
  },
  
  listaMetas: {
    flex: 1,
    marginVertical: espacamentos.md,
  },
  
  textoVazio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    textAlign: 'center',
    marginBottom: espacamentos.sm,
  },
  
  descricaoVazia: {
    fontSize: 16,
    color: cores.cinzaMedio,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: espacamentos.lg,
  },
  
  cardMeta: {
    borderLeftWidth: 4,
    borderLeftColor: cores.primaria,
  },
  
  tituloMeta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    marginBottom: espacamentos.xs,
  },
  
  tempoMeta: {
    fontSize: 14,
    color: cores.cinzaMedio,
    marginBottom: espacamentos.sm,
  },
  
  statusOvo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: espacamentos.sm,
    backgroundColor: cores.fundoOvo,
    borderRadius: 8,
  },
  
  emojiOvo: {
    fontSize: 24,
    marginRight: espacamentos.sm,
  },
  
  textoStatus: {
    fontSize: 16,
    color: cores.cinzaEscuro,
    fontWeight: '500',
  },
  
  botoesFixos: {
    flexDirection: 'row',
    paddingVertical: espacamentos.md,
    paddingTop: espacamentos.lg,
    borderTopWidth: 1,
    borderTopColor: cores.cinzaClaro,
    gap: espacamentos.sm,
  },
  
  botaoNavegacao: {
    flex: 1,
    backgroundColor: cores.primaria,
    paddingVertical: espacamentos.md,
    borderRadius: 25,
    alignItems: 'center',
  },
  
  textoBotaoNav: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TelaInicial;
```

---

## 🧪 Testando as funcionalidades

### 1. Comandos para testar

```bash
# Iniciar o app
npx expo start

# Teste o fluxo completo:
# 1. Toque em uma meta para iniciar
# 2. Veja o timer funcionando
# 3. Teste pausar/continuar
# 4. Aguarde ou cancele para testar
# 5. Veja o popup de nascimento
```

### 2. Funcionalidades que devem estar funcionando

- ✅ **Timer visual** com círculo de progresso
- ✅ **Animações suaves** no ovo e progresso
- ✅ **Pausar/Continuar** timer
- ✅ **Tremida do ovo** próximo ao fim
- ✅ **Popup animado** quando nasce bichinho
- ✅ **Sistema de raridades** com cores diferentes
- ✅ **Cancelamento** com confirmação

---

## 🐞 Troubleshooting

### Problema: Timer não funciona
```bash
# Verificar se as dependências estão corretas
npm list react-native

# Limpar cache se necessário
npx expo start --clear
```

### Problema: Animações travando
```javascript
// Adicionar no componente OvoChocando se necessário
import { InteractionManager } from 'react-native';

useEffect(() => {
  InteractionManager.runAfterInteractions(() => {
    // Iniciar animações aqui
  });
}, []);
```

### Problema: Modal não aparece
```javascript
// Verificar se o estado está sendo atualizado corretamente
console.log('Mostrar popup:', mostrarPopup);
console.log('Bichinho:', bichinhoNascido);
```

---

## 🎯 Objetivos da Parte 4

Nesta parte, você deve ter:

- ✅ **Componente OvoChocando** com timer funcional
- ✅ **Animações suaves** e feedback visual
- ✅ **Sistema de pausar/continuar** timer
- ✅ **Popup BichinhoNascido** com animações
- ✅ **Integração completa** com TelaInicial
- ✅ **Sistema de sorteio** básico implementado

---

## ✨ Recursos implementados

| Funcionalidade | Status | Descrição |
|---------------|--------|-----------|
| Timer Visual | ✅ | Círculo de progresso animado |
| Controles | ✅ | Pausar, continuar, cancelar |
| Animações | ✅ | Ovo tremendo, escala, rotação |
| Popup Nascimento | ✅ | Modal animado com informações |
| Sistema Raridade | ✅ | Cores e chances diferentes |
| Integração | ✅ | Fluxo completo funcionando |

---

## 🔄 Comandos úteis

```bash
# Testar com timer rápido (1-2 minutos)
# Verificar console para debug
npx expo start

# Se precisar resetar completamente
npx expo start --clear
rm -rf node_modules
npm install
npx expo start
```

---

## ➡️ Próxima parte

Na **Parte 5**, vamos:
- 🎲 **Sistema de sorteio** mais elaborado
- 🏆 **Sistema de raridades** com probabilidades
- 💎 **Efeitos especiais** para bichinhos raros
- 📊 **Estatísticas** de progresso do usuário
- 🎁 **Bônus e recompensas** especiais

---

**🎉 Parabéns! Você concluiu a Parte 4 do tutorial.**

*Agora você tem um timer funcional com animações incríveis! Quando estiver pronto, peça a **Parte 5** para continuar implementando o sistema de sorteio avançado!*

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Alert 
} from 'react-native';

// Importa as mensagens personalizáveis
import { obterMensagem, formatarTempo } from '../configuracoes/mensagens';
// Importa as imagens base64
import { obterImagemOvoPorRaridade, obterCorPorRaridade } from '../recursos/imagensBase64';

const OvoChocando = ({ meta, aoCompletar }) => {
  // Estados para controlar o timer e animação
  const [tempoRestante, setTempoRestante] = useState(meta.tempoTotal);
  const [animacaoTremer] = useState(new Animated.Value(0));
  const [estaAtivo, setEstaAtivo] = useState(false);

  // Determina raridade do ovo baseado na duração da meta
  const raridadeOvo = React.useMemo(() => {
    const minutos = meta.tempoTotal / 60;
    if (minutos >= 120) return 'lendario';  // 2+ horas
    if (minutos >= 60) return 'epico';      // 1+ hora
    if (minutos >= 30) return 'raro';       // 30+ minutos
    return 'comum';                         // Menos de 30 min
  }, [meta.tempoTotal]);

  // Efeito para o countdown do timer
  useEffect(() => {
    let intervalo = null;
    
    if (estaAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante(tempo => {
          if (tempo <= 1) {
            // Timer completado! Ovo vai eclodir
            setEstaAtivo(false);
            aoCompletar(meta);
            return 0;
          }
          return tempo - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(intervalo);
  }, [estaAtivo, tempoRestante, meta, aoCompletar]);

  // Efeito para animação de tremor quando perto do fim
  useEffect(() => {
    if (tempoRestante <= 30 && tempoRestante > 0 && estaAtivo) {
      // Ovo treme quando faltam 30 segundos
      Animated.loop(
        Animated.sequence([
          Animated.timing(animacaoTremer, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animacaoTremer, {
            toValue: -5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animacaoTremer, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [tempoRestante, estaAtivo]);

  // Função para iniciar/pausar o timer
  const alternarTimer = () => {
    if (tempoRestante === 0) {
      // Timer já acabou
      Alert.alert(
        obterMensagem('ovoJaEclodiuTitulo'),
        obterMensagem('ovoJaEclodiuMensagem')
      );
      return;
    }
    
    setEstaAtivo(!estaAtivo);
  };

  // Função para resetar o timer
  const resetarTimer = () => {
    Alert.alert(
      'Resetar Timer',
      'Tem certeza que quer recomeçar? O ovo voltará ao estado inicial.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetar', 
          onPress: () => {
            setEstaAtivo(false);
            setTempoRestante(meta.tempoTotal);
          }
        }
      ]
    );
  };

  // Calcula progresso para mudança de cor do ovo
  const progresso = 1 - (tempoRestante / meta.tempoTotal);
  const corOvo = progresso < 0.3 ? '#E5E7EB' : progresso < 0.7 ? '#FEF3C7' : '#FCA5A5';

  return (
    <View style={styles.container}>
      {/* Título da meta */}
      <Text style={styles.tituloMeta}>{meta.titulo}</Text>
      
      {/* Container do ovo com animação */}
      <Animated.View 
        style={[
          styles.containerOvo,
          { 
            transform: [{ translateX: animacaoTremer }],
            borderColor: obterCorPorRaridade(raridadeOvo),
            borderWidth: 3,
          }
        ]}
      >
        {/* Imagem do ovo com base na raridade */}
        <Image 
          source={{ uri: obterImagemOvoPorRaridade(raridadeOvo) }}
          style={styles.imagemOvo}
          resizeMode="contain"
        />
        
        {/* Barra de progresso */}
        <View style={styles.barraProgresso}>
          <View 
            style={[
              styles.progressoPreenchido, 
              { 
                width: `${progresso * 100}%`,
                backgroundColor: obterCorPorRaridade(raridadeOvo)
              }
            ]} 
          />
        </View>
      </Animated.View>

      {/* Timer */}
      <Text style={styles.timer}>
        ⏰ {formatarTempo(tempoRestante)}
      </Text>

      {/* Mensagem de status */}
      <Text style={styles.status}>
        {estaAtivo ? 
          obterMensagem('ovoChocandoStatus') : 
          tempoRestante === 0 ? 
            obterMensagem('ovoEclodiuStatus') :
            obterMensagem('ovoEsperandoStatus')
        }
      </Text>

      {/* Botões de controle */}
      <View style={styles.containerBotoes}>
        <TouchableOpacity 
          style={[styles.botao, styles.botaoPrincipal]} 
          onPress={alternarTimer}
        >
          <Text style={styles.textoBotao}>
            {estaAtivo ? '⏸️ Pausar' : '▶️ Iniciar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botao, styles.botaoSecundario]} 
          onPress={resetarTimer}
        >
          <Text style={styles.textoBotaoSecundario}>🔄 Resetar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tituloMeta: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerOvo: {
    width: 120,
    height: 150,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#D1D5DB',
  },
  emojiOvo: {
    fontSize: 80,
  },
  barraProgresso: {
    width: 100,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  imagemOvo: {
    width: 100,
    height: 120,
    marginBottom: 15,
  },
  progressoPreenchido: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  containerBotoes: {
    flexDirection: 'row',
    gap: 15,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  botaoPrincipal: {
    backgroundColor: '#4F46E5',
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoBotaoSecundario: {
    color: '#4F46E5',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OvoChocando;

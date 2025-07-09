import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Image 
} from 'react-native';

// Importa mensagens personalizáveis
import { obterMensagem, obterMensagemRaridade } from '../configuracoes/mensagens';
// Importa as imagens base64
import { gerarImagemBichinho, obterCorPorRaridade } from '../recursos/imagensBase64';

const BichinhoNascido = ({ visivel, bichinho, aoFechar }) => {
  // Animações para entrada do popup
  const [escalaAnimacao] = useState(new Animated.Value(0));
  const [opacidadeAnimacao] = useState(new Animated.Value(0));

  // Anima entrada quando popup aparece
  useEffect(() => {
    if (visivel) {
      Animated.parallel([
        Animated.spring(escalaAnimacao, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacidadeAnimacao, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animações quando fecha
      escalaAnimacao.setValue(0);
      opacidadeAnimacao.setValue(0);
    }
  }, [visivel]);

  if (!bichinho) return null;

  // Determina raridade se não estiver definida
  const determinarRaridade = (nomeBichinho) => {
    const raros = ['unicornio', 'phoenix', 'dragao', 'fada'];
    const epicos = ['leao-dourado', 'aguia-real', 'lobo-lunar'];
    const lendarios = ['cosmic-cat', 'stellar-bird', 'time-guardian'];
    
    if (lendarios.includes(nomeBichinho)) return 'lendario';
    if (epicos.includes(nomeBichinho)) return 'epico';
    if (raros.includes(nomeBichinho)) return 'raro';
    return 'comum';
  };

  const raridade = bichinho.raridade || determinarRaridade(bichinho.nome);
  const corRaridade = obterCorPorRaridade(raridade);

  return (
    <Modal visible={visivel} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.popup,
            {
              transform: [{ scale: escalaAnimacao }],
              opacity: opacidadeAnimacao,
              borderColor: corRaridade,
            }
          ]}
        >
          {/* Efeitos de fundo baseados na raridade */}
          {raridade === 'lendario' && (
            <View style={styles.efeitoLendario}>
              <Text style={styles.brilhos}>✨ ⭐ ✨ ⭐ ✨</Text>
            </View>
          )}

          {/* Título de nascimento */}
          <Text style={styles.titulo}>
            {obterMensagem('bichinhoNasceuTitulo')}
          </Text>

          {/* Imagem do bichinho - usa gerador de imagem base64 */}
          <View style={[styles.containerBichinho, { backgroundColor: corRaridade + '20' }]}>
            <Image 
              source={{ uri: gerarImagemBichinho(bichinho.nome, 120) }}
              style={styles.imagemBichinho}
              resizeMode="contain"
            />
          </View>

          {/* Nome do bichinho */}
          <Text style={styles.nome}>{bichinho.nome}</Text>

          {/* Raridade com cor especial */}
          <View style={[styles.tagRaridade, { backgroundColor: corRaridade }]}>
            <Text style={styles.textoRaridade}>
              {obterMensagemRaridade(raridade)}
            </Text>
          </View>

          {/* Descrição do bichinho */}
          {bichinho.descricao && (
            <Text style={styles.descricao}>{bichinho.descricao}</Text>
          )}

          {/* Estatísticas do bichinho */}
          <View style={styles.stats}>
            <Text style={styles.statTexto}>💖 Carinho: {bichinho.carinho || 50}</Text>
            <Text style={styles.statTexto}>⚡ Energia: {bichinho.energia || 50}</Text>
            <Text style={styles.statTexto}>🎯 Foco: {bichinho.foco || 50}</Text>
          </View>

          {/* Mensagem personalizada baseada na raridade */}
          <Text style={styles.mensagemEspecial}>
            {obterMensagem(`bichinho${bichinho.raridade.charAt(0).toUpperCase() + bichinho.raridade.slice(1)}`)}
          </Text>

          {/* Botão para fechar */}
          <TouchableOpacity 
            style={[styles.botaoFechar, { backgroundColor: corRaridade }]} 
            onPress={aoFechar}
          >
            <Text style={styles.textoBotao}>
              🎉 Adicionar à Coleção
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Estilos do popup
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    maxWidth: 350,
    width: '100%',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  efeitoLendario: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brilhos: {
    fontSize: 20,
    color: '#F59E0B',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerBichinho: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  imagemBichinho: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  emojiBichinho: {
    fontSize: 60,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  tagRaridade: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  textoRaridade: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  descricao: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  statTexto: {
    fontSize: 12,
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mensagemEspecial: {
    fontSize: 14,
    color: '#4F46E5',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  botaoFechar: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BichinhoNascido;

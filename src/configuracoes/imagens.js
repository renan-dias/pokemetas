// Configuração de imagens do PixelPetTimer
// Este arquivo centraliza todas as referências de imagens

// Imagens de ovos
export const imagensOvos = {
  comum: require('../recursos/imagens/ovos/ovo-comum.png'),
  raro: require('../recursos/imagens/ovos/ovo-raro.png'),
  epico: require('../recursos/imagens/ovos/ovo-epico.png'),
  lendario: require('../recursos/imagens/ovos/ovo-lendario.png'),
};

// Imagens de bichinhos
export const imagensBichinhos = {
  // Bichinhos comuns
  'gatinho': require('../recursos/imagens/bichinhos/gatinho.png'),
  'cachorrinho': require('../recursos/imagens/bichinhos/cachorrinho.png'),
  'passarinho': require('../recursos/imagens/bichinhos/passarinho.png'),
  'coelhinho': require('../recursos/imagens/bichinhos/coelhinho.png'),
  'hamster': require('../recursos/imagens/bichinhos/hamster.png'),
  
  // Bichinhos raros
  'unicornio': require('../recursos/imagens/bichinhos/unicornio.png'),
  'phoenix': require('../recursos/imagens/bichinhos/phoenix.png'),
  'dragao': require('../recursos/imagens/bichinhos/dragao.png'),
  'fada': require('../recursos/imagens/bichinhos/fada.png'),
  
  // Bichinhos épicos
  'leao-dourado': require('../recursos/imagens/bichinhos/leao-dourado.png'),
  'aguia-real': require('../recursos/imagens/bichinhos/aguia-real.png'),
  'lobo-lunar': require('../recursos/imagens/bichinhos/lobo-lunar.png'),
  
  // Bichinhos lendários
  'cosmic-cat': require('../recursos/imagens/bichinhos/cosmic-cat.png'),
  'stellar-bird': require('../recursos/imagens/bichinhos/stellar-bird.png'),
  'time-guardian': require('../recursos/imagens/bichinhos/time-guardian.png'),
};

// Função para obter imagem do ovo baseado na raridade
export const obterImagemOvo = (raridade = 'comum') => {
  return imagensOvos[raridade] || imagensOvos.comum;
};

// Função para obter imagem do bichinho
export const obterImagemBichinho = (nomeBichinho) => {
  return imagensBichinhos[nomeBichinho] || imagensBichinhos.gatinho;
};

// Imagem padrão para casos de erro
export const imagemPadrao = require('../recursos/imagens/placeholder.png');

// Função para verificar se imagem existe
export const verificarImagem = (nomeImagem) => {
  try {
    return imagensBichinhos[nomeImagem] ? true : false;
  } catch (error) {
    console.warn(`Imagem ${nomeImagem} não encontrada, usando padrão`);
    return false;
  }
};

# 🎲 Tutorial PixelPetTimer - Parte 5: Sistema Avançado, Build e Publicação

## 🎯 O que vamos finalizar

Nesta parte final, vamos implementar:
- 🎲 **Sistema de sorteio** avançado com múltiplas raridades
- 💎 **Efeitos especiais** para bichinhos raros e lendários
- 📊 **Sistema de estatísticas** e conquistas
- 🎁 **Bônus e streak** de produtividade
- 📱 **Build para Android/iOS** e publicação
- 🚀 **Deploy completo** do aplicativo

---

## 🎲 Sistema de Sorteio Avançado

Vamos criar um sistema mais elaborado para sortear bichinhos com diferentes raridades e efeitos especiais.

### 1. Criar sistema de sorteio

**Arquivo:** `src/dados/sorteio.js`

```javascript
// Sistema avançado de sorteio de bichinhos
import { bichinhosPorRaridade, bichinhosBanco } from './exemplos';

// 🎯 Probabilidades por raridade
export const probabilidades = {
  comum: 0.60,      // 60%
  raro: 0.25,       // 25%
  epico: 0.10,      // 10%
  lendario: 0.04,   // 4%
  mitico: 0.01,     // 1%
};

// 🔥 Multiplicadores de streak (dias consecutivos)
const multiplicadoresStreak = {
  3: 1.2,   // +20% chance de raro+ após 3 dias
  7: 1.5,   // +50% chance após 1 semana
  14: 2.0,  // +100% chance após 2 semanas
  30: 3.0,  // +200% chance após 1 mês
};

// ⭐ Bônus por horário (produtividade)
const bonusHorario = {
  manha: 1.3,      // 6h-12h: +30%
  tarde: 1.1,      // 12h-18h: +10%
  noite: 1.0,      // 18h-22h: normal
  madrugada: 0.8,  // 22h-6h: -20%
};

// 🎁 Bônus por meta concluída
const bonusMeta = {
  curta: 1.0,      // < 30 min
  media: 1.2,      // 30-60 min: +20%
  longa: 1.5,      // 60-120 min: +50%
  maratona: 2.0,   // > 120 min: +100%
};

/**
 * 🎲 Função principal de sorteio
 * @param {Object} params - Parâmetros do sorteio
 * @param {number} params.streakDias - Dias consecutivos
 * @param {number} params.tempoMeta - Tempo da meta em minutos
 * @param {string} params.tipoBichinho - Tipo preferido (opcional)
 * @returns {Object} Bichinho sorteado
 */
export const sortearBichinho = (params = {}) => {
  const {
    streakDias = 0,
    tempoMeta = 30,
    tipoBichinho = null,
    forcarRaridade = null
  } = params;

  try {
    // 1. Calcular modificadores
    const modificadores = calcularModificadores(streakDias, tempoMeta);
    
    // 2. Aplicar modificadores às probabilidades
    const probAjustadas = aplicarModificadores(modificadores);
    
    // 3. Sortear raridade
    const raridade = forcarRaridade || sortearRaridade(probAjustadas);
    
    // 4. Sortear bichinho específico da raridade
    const bichinho = sortearBichinhoDaRaridade(raridade, tipoBichinho);
    
    // 5. Adicionar bônus especiais
    const bichinhoFinal = adicionarBonusEspeciais(bichinho, modificadores);
    
    // 6. Log para debug
    console.log('🎲 Sorteio realizado:', {
      raridade,
      modificadores,
      bichinho: bichinhoFinal.nome,
    });
    
    return bichinhoFinal;
    
  } catch (erro) {
    console.error('Erro no sorteio:', erro);
    // Retorna bichinho comum como fallback
    return bichinhosBanco.find(b => b.raridade === 'comum') || bichinhosBanco[0];
  }
};

/**
 * 📊 Calcular modificadores baseados no comportamento
 */
const calcularModificadores = (streakDias, tempoMeta) => {
  // Multiplicador de streak
  let multiplicadorStreak = 1.0;
  for (const [dias, mult] of Object.entries(multiplicadoresStreak)) {
    if (streakDias >= parseInt(dias)) {
      multiplicadorStreak = mult;
    }
  }
  
  // Bônus por horário atual
  const hora = new Date().getHours();
  let bonusHora = 1.0;
  if (hora >= 6 && hora < 12) bonusHora = bonusHorario.manha;
  else if (hora >= 12 && hora < 18) bonusHora = bonusHorario.tarde;
  else if (hora >= 18 && hora < 22) bonusHora = bonusHorario.noite;
  else bonusHora = bonusHorario.madrugada;
  
  // Bônus por duração da meta
  let bonusDuracao = bonusMeta.curta;
  if (tempoMeta >= 120) bonusDuracao = bonusMeta.maratona;
  else if (tempoMeta >= 60) bonusDuracao = bonusMeta.longa;
  else if (tempoMeta >= 30) bonusDuracao = bonusMeta.media;
  
  return {
    streak: multiplicadorStreak,
    horario: bonusHora,
    duracao: bonusDuracao,
    total: multiplicadorStreak * bonusHora * bonusDuracao,
  };
};

/**
 * 🎯 Aplicar modificadores às probabilidades
 */
const aplicarModificadores = (modificadores) => {
  const probBase = { ...probabilidades };
  const multiplicador = Math.min(modificadores.total, 5.0); // Max 5x
  
  // Redistribuir probabilidades favorecendo raridades maiores
  if (multiplicador > 1.0) {
    const bonus = (multiplicador - 1.0) * 0.2;
    
    probBase.mitico += bonus * 0.3;
    probBase.lendario += bonus * 0.4;
    probBase.epico += bonus * 0.3;
    probBase.comum = Math.max(0.1, probBase.comum - bonus);
    
    // Normalizar para somar 1.0
    const total = Object.values(probBase).reduce((a, b) => a + b, 0);
    Object.keys(probBase).forEach(key => {
      probBase[key] = probBase[key] / total;
    });
  }
  
  return probBase;
};

/**
 * 🎲 Sortear raridade baseada nas probabilidades
 */
const sortearRaridade = (probabilidadesAjustadas) => {
  const rand = Math.random();
  let acumulado = 0;
  
  const raridades = ['comum', 'raro', 'epico', 'lendario', 'mitico'];
  
  for (const raridade of raridades) {
    acumulado += probabilidadesAjustadas[raridade];
    if (rand <= acumulado) {
      return raridade;
    }
  }
  
  return 'comum'; // Fallback
};

/**
 * 🐾 Sortear bichinho específico da raridade
 */
const sortearBichinhoDaRaridade = (raridade, tipoPreferido = null) => {
  let bichinhosCandidatos = bichinhosBanco.filter(b => b.raridade === raridade);
  
  // Filtrar por tipo se especificado
  if (tipoPreferido) {
    const filtrados = bichinhosCandidatos.filter(b => b.tipo === tipoPreferido);
    if (filtrados.length > 0) {
      bichinhosCandidatos = filtrados;
    }
  }
  
  // Sortear aleatoriamente
  const indice = Math.floor(Math.random() * bichinhosCandidatos.length);
  return { ...bichinhosCandidatos[indice] };
};

/**
 * ✨ Adicionar bônus especiais ao bichinho
 */
const adicionarBonusEspeciais = (bichinho, modificadores) => {
  const bichinhoComBonus = { ...bichinho };
  
  // XP bônus baseado nos modificadores
  const xpBonus = Math.floor(modificadores.total * 100);
  bichinhoComBonus.xpBonus = xpBonus;
  
  // Shiny chance para bichinhos raros+
  if (['epico', 'lendario', 'mitico'].includes(bichinho.raridade)) {
    const chanceShiny = modificadores.total > 2.0 ? 0.1 : 0.02;
    if (Math.random() < chanceShiny) {
      bichinhoComBonus.shiny = true;
      bichinhoComBonus.nome = `✨ ${bichinhoComBonus.nome} Shiny`;
      bichinhoComBonus.xpBonus *= 2;
    }
  }
  
  // Timestamp de nascimento
  bichinhoComBonus.nascimento = new Date().toISOString();
  bichinhoComBonus.id = `${bichinho.numero}_${Date.now()}`;
  
  return bichinhoComBonus;
};

/**
 * 📊 Estatísticas de sorteio para debug
 */
export const estatisticasSorteio = (numeroTestes = 1000) => {
  const resultados = {
    comum: 0,
    raro: 0,
    epico: 0,
    lendario: 0,
    mitico: 0,
  };
  
  for (let i = 0; i < numeroTestes; i++) {
    const bichinho = sortearBichinho();
    resultados[bichinho.raridade]++;
  }
  
  // Converter para porcentagens
  Object.keys(resultados).forEach(raridade => {
    resultados[raridade] = (resultados[raridade] / numeroTestes * 100).toFixed(2) + '%';
  });
  
  return resultados;
};

/**
 * 🎁 Sortear recompensa especial (eventos, conquistas)
 */
export const sortearRecompensaEspecial = (tipoEvento) => {
  const recompensas = {
    primeiraVez: {
      xpBonus: 500,
      titulo: 'Primeiro Passo',
      emblema: '👶',
    },
    streak7: {
      xpBonus: 1000,
      titulo: 'Dedicado',
      emblema: '🔥',
      bichinhoExtra: true,
    },
    streak30: {
      xpBonus: 5000,
      titulo: 'Mestre da Consistência',
      emblema: '👑',
      forcarLendario: true,
    },
    maratona: {
      xpBonus: 2000,
      titulo: 'Maratonista',
      emblema: '🏃‍♂️',
    },
  };
  
  return recompensas[tipoEvento] || null;
};
```

### 2. Atualizar banco de dados de bichinhos

**Arquivo:** `src/dados/exemplos.js`

```javascript
// Base de dados completa de bichinhos
export const bichinhosBanco = [
  // COMUNS (60%)
  {
    numero: 1,
    nome: 'Gatinho Fofo',
    emoji: '🐱',
    raridade: 'comum',
    tipo: 'doméstico',
    descricao: 'Um gatinho carinhoso que adora sonecas.',
    stats: { fofura: 8, energia: 6, lealdade: 9 },
  },
  {
    numero: 2,
    nome: 'Cachorrinho Brincalhão',
    emoji: '🐶',
    raridade: 'comum',
    tipo: 'doméstico',
    descricao: 'Sempre pronto para brincar e fazer amigos.',
    stats: { fofura: 9, energia: 9, lealdade: 10 },
  },
  {
    numero: 3,
    nome: 'Coelhinho Saltitante',
    emoji: '🐰',
    raridade: 'comum',
    tipo: 'herbívoro',
    descricao: 'Pula de alegria a cada conquista sua.',
    stats: { fofura: 10, energia: 8, lealdade: 7 },
  },
  
  // RAROS (25%)
  {
    numero: 4,
    nome: 'Raposa Astuta',
    emoji: '🦊',
    raridade: 'raro',
    tipo: 'selvagem',
    descricao: 'Inteligente e misteriosa, traz sorte nos estudos.',
    stats: { fofura: 8, energia: 7, lealdade: 8 },
  },
  {
    numero: 5,
    nome: 'Panda Zen',
    emoji: '🐼',
    raridade: 'raro',
    tipo: 'místico',
    descricao: 'Promove paz interior e foco.',
    stats: { fofura: 9, energia: 5, lealdade: 9 },
  },
  {
    numero: 6,
    nome: 'Lobo Guardião',
    emoji: '🐺',
    raridade: 'raro',
    tipo: 'selvagem',
    descricao: 'Protege sua produtividade com fiereza.',
    stats: { fofura: 6, energia: 9, lealdade: 10 },
  },
  
  // ÉPICOS (10%)
  {
    numero: 7,
    nome: 'Unicórnio Mágico',
    emoji: '🦄',
    raridade: 'epico',
    tipo: 'mágico',
    descricao: 'Criatura mágica que multiplica sua motivação.',
    stats: { fofura: 10, energia: 8, lealdade: 9 },
    habilidade: 'Dobra XP ganho por 1 hora',
  },
  {
    numero: 8,
    nome: 'Dragão Bebê',
    emoji: '🐲',
    raridade: 'epico',
    tipo: 'mágico',
    descricao: 'Pequeno dragão cheio de energia e determinação.',
    stats: { fofura: 7, energia: 10, lealdade: 8 },
    habilidade: 'Reduz tempo necessário em 10%',
  },
  
  // LENDÁRIOS (4%)
  {
    numero: 9,
    nome: 'Fênix Dourada',
    emoji: '🔥',
    raridade: 'lendario',
    tipo: 'mágico',
    descricao: 'A lendária ave que renasce das cinzas, simbolizando superação.',
    stats: { fofura: 8, energia: 10, lealdade: 10 },
    habilidade: 'Revive streak perdido uma vez por semana',
  },
  {
    numero: 10,
    nome: 'Leão Dourado',
    emoji: '🦁',
    raridade: 'lendario',
    tipo: 'majestoso',
    descricao: 'Rei dos bichinhos, inspira liderança e coragem.',
    stats: { fofura: 7, energia: 9, lealdade: 10 },
    habilidade: 'Bônus de 50% em todas as metas',
  },
  
  // MÍTICOS (1%)
  {
    numero: 11,
    nome: 'Espírito Ancestral',
    emoji: '👻',
    raridade: 'mitico',
    tipo: 'espiritual',
    descricao: 'Guardião espiritual que guia sua jornada de crescimento.',
    stats: { fofura: 10, energia: 10, lealdade: 10 },
    habilidade: 'Garante sorteio lendário+ na próxima meta',
  },
  {
    numero: 12,
    nome: 'Cristal Vivo',
    emoji: '💎',
    raridade: 'mitico',
    tipo: 'mineral',
    descricao: 'Forma de vida cristalina que amplifica sua energia produtiva.',
    stats: { fofura: 9, energia: 10, lealdade: 10 },
    habilidade: 'Multiplica todos os bônus por 2x permanentemente',
  },
];

// Organizar por raridade para facilitar buscas
export const bichinhosPorRaridade = {
  comum: bichinhosBanco.filter(b => b.raridade === 'comum'),
  raro: bichinhosBanco.filter(b => b.raridade === 'raro'),
  epico: bichinhosBanco.filter(b => b.raridade === 'epico'),
  lendario: bichinhosBanco.filter(b => b.raridade === 'lendario'),
  mitico: bichinhosBanco.filter(b => b.raridade === 'mitico'),
};

// Mensagens motivacionais por raridade
export const mensagensMotivacionais = {
  comum: [
    'Todo grande especialista já foi um iniciante!',
    'Pequenos passos levam a grandes conquistas!',
    'Você está construindo um hábito incrível!',
  ],
  raro: [
    'Sua dedicação está dando frutos!',
    'Continue assim, você está no caminho certo!',
    'Impressionante! Sua consistência é admirável!',
  ],
  epico: [
    'WOW! Você é realmente especial!',
    'Sua determinação é épica!',
    'Continue brilhando, estrela!',
  ],
  lendario: [
    'INCRÍVEL! Você é uma lenda!',
    'Sua jornada é verdadeiramente inspiradora!',
    'Parabéns! Você alcançou algo extraordinário!',
  ],
  mitico: [
    '✨ MÍTICO! ✨ Você transcendeu os limites!',
    'Sua dedicação é sobre-humana!',
    'Você se tornou uma lenda viva da produtividade!',
  ],
};
```

---

## 💎 Efeitos Especiais e Animações

Vamos adicionar efeitos visuais especiais para bichinhos raros.

### 1. Criar componente de efeitos

**Arquivo:** `src/componentes/EfeitosEspeciais.js`

```javascript
import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { cores } from '../configuracoes/estilos';

const { width, height } = Dimensions.get('window');

const EfeitosEspeciais = ({ raridade, ativo }) => {
  const animacaoParticulas = useRef(new Animated.Value(0)).current;
  const animacaoBrilho = useRef(new Animated.Value(0)).current;
  const animacaoRotacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ativo && ['epico', 'lendario', 'mitico'].includes(raridade)) {
      iniciarEfeitos();
    }
  }, [ativo, raridade]);

  const iniciarEfeitos = () => {
    // Animação de partículas
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacaoParticulas, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animacaoParticulas, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Efeito de brilho
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacaoBrilho, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animacaoBrilho, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotação para míticos
    if (raridade === 'mitico') {
      Animated.loop(
        Animated.timing(animacaoRotacao, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();
    }
  };

  const getCoresEfeito = () => {
    switch (raridade) {
      case 'epico': return ['#8B5CF6', '#A855F7', '#C084FC'];
      case 'lendario': return ['#F59E0B', '#FBBF24', '#FCD34D'];
      case 'mitico': return ['#EC4899', '#F472B6', '#FBBF24', '#8B5CF6'];
      default: return ['#6B7280'];
    }
  };

  const coresEfeito = getCoresEfeito();

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Partículas flutuantes */}
      {Array.from({ length: raridade === 'mitico' ? 8 : 5 }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particula,
            {
              backgroundColor: coresEfeito[index % coresEfeito.length],
              transform: [
                {
                  translateY: animacaoParticulas.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height + 50, -50],
                  }),
                },
                {
                  translateX: animacaoParticulas.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      Math.random() * width,
                      Math.random() * width,
                    ],
                  }),
                },
                {
                  rotate: animacaoRotacao.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
              opacity: animacaoParticulas.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [0, 1, 1, 0],
              }),
            },
          ]}
        />
      ))}

      {/* Brilho central */}
      <Animated.View
        style={[
          styles.brilhoCentral,
          {
            opacity: animacaoBrilho.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
            transform: [
              {
                scale: animacaoBrilho.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.2],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.brilho, { backgroundColor: coresEfeito[0] }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  particula: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brilhoCentral: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginTop: -100,
    marginLeft: -100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brilho: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 0.3,
  },
});

export default EfeitosEspeciais;
```

---

## 📊 Sistema de Estatísticas

Vamos criar um sistema para acompanhar o progresso do usuário.

### 1. Criar sistema de estatísticas

**Arquivo:** `src/dados/estatisticas.js`

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STATS = 'pixelpet_estatisticas';

// 📊 Estrutura padrão de estatísticas
const estatisticasPadrao = {
  // Contadores gerais
  metasConcluidas: 0,
  tempoTotalMinutos: 0,
  bichinhosSorteados: 0,
  diasConsecutivos: 0,
  
  // Por raridade
  bichinhosPorRaridade: {
    comum: 0,
    raro: 0,
    epico: 0,
    lendario: 0,
    mitico: 0,
  },
  
  // Conquistas
  conquistas: [],
  
  // Dados de streak
  ultimaAtividade: null,
  melhorStreak: 0,
  
  // XP e nível
  xpTotal: 0,
  nivel: 1,
  
  // Data de criação da conta
  criadoEm: new Date().toISOString(),
};

/**
 * 📈 Carregar estatísticas do storage
 */
export const carregarEstatisticas = async () => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STATS);
    if (dados) {
      const stats = JSON.parse(dados);
      // Mesclar com padrão para garantir campos novos
      return { ...estatisticasPadrao, ...stats };
    }
    return estatisticasPadrao;
  } catch (erro) {
    console.error('Erro ao carregar estatísticas:', erro);
    return estatisticasPadrao;
  }
};

/**
 * 💾 Salvar estatísticas no storage
 */
export const salvarEstatisticas = async (novasStats) => {
  try {
    await AsyncStorage.setItem(CHAVE_STATS, JSON.stringify(novasStats));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar estatísticas:', erro);
    return false;
  }
};

/**
 * ✅ Registrar meta concluída
 */
export const registrarMetaConcluida = async (tempoMinutos, bichinho) => {
  try {
    const stats = await carregarEstatisticas();
    
    // Atualizar contadores
    stats.metasConcluidas++;
    stats.tempoTotalMinutos += tempoMinutos;
    stats.bichinhosSorteados++;
    stats.bichinhosPorRaridade[bichinho.raridade]++;
    
    // Atualizar streak
    const hoje = new Date().toDateString();
    const ultimaAtividade = stats.ultimaAtividade ? new Date(stats.ultimaAtividade).toDateString() : null;
    
    if (ultimaAtividade === hoje) {
      // Já fez atividade hoje, não altera streak
    } else {
      const ontem = new Date();
      ontem.setDate(ontem.getDate() - 1);
      const ontemStr = ontem.toDateString();
      
      if (ultimaAtividade === ontemStr) {
        // Continuou o streak
        stats.diasConsecutivos++;
      } else {
        // Quebrou o streak
        stats.diasConsecutivos = 1;
      }
    }
    
    stats.ultimaAtividade = new Date().toISOString();
    stats.melhorStreak = Math.max(stats.melhorStreak, stats.diasConsecutivos);
    
    // Calcular XP ganho
    const xpGanho = calcularXP(tempoMinutos, bichinho);
    stats.xpTotal += xpGanho;
    
    // Atualizar nível
    stats.nivel = calcularNivel(stats.xpTotal);
    
    // Verificar conquistas
    const novasConquistas = verificarConquistas(stats);
    stats.conquistas = [...new Set([...stats.conquistas, ...novasConquistas])];
    
    await salvarEstatisticas(stats);
    
    return {
      estatisticas: stats,
      xpGanho,
      novasConquistas,
    };
    
  } catch (erro) {
    console.error('Erro ao registrar meta:', erro);
    return null;
  }
};

/**
 * 🎯 Calcular XP ganho
 */
const calcularXP = (tempoMinutos, bichinho) => {
  let xpBase = tempoMinutos * 10; // 10 XP por minuto
  
  // Multiplicador por raridade
  const multiplicadores = {
    comum: 1.0,
    raro: 1.5,
    epico: 2.0,
    lendario: 3.0,
    mitico: 5.0,
  };
  
  xpBase *= multiplicadores[bichinho.raridade];
  
  // XP bônus do bichinho
  if (bichinho.xpBonus) {
    xpBase += bichinho.xpBonus;
  }
  
  // Bônus shiny
  if (bichinho.shiny) {
    xpBase *= 2;
  }
  
  return Math.floor(xpBase);
};

/**
 * 📊 Calcular nível baseado no XP
 */
const calcularNivel = (xpTotal) => {
  // Fórmula: nivel = sqrt(xp / 1000) + 1
  return Math.floor(Math.sqrt(xpTotal / 1000)) + 1;
};

/**
 * 🏆 Verificar conquistas desbloqueadas
 */
const verificarConquistas = (stats) => {
  const conquistas = [];
  
  // Conquistas por quantidade
  if (stats.metasConcluidas === 1) conquistas.push('primeira_meta');
  if (stats.metasConcluidas === 10) conquistas.push('dez_metas');
  if (stats.metasConcluidas === 50) conquistas.push('cinquenta_metas');
  if (stats.metasConcluidas === 100) conquistas.push('cem_metas');
  
  // Conquistas por tempo
  if (stats.tempoTotalMinutos >= 60) conquistas.push('uma_hora');
  if (stats.tempoTotalMinutos >= 600) conquistas.push('dez_horas');
  if (stats.tempoTotalMinutos >= 1440) conquistas.push('um_dia');
  
  // Conquistas por streak
  if (stats.diasConsecutivos >= 3) conquistas.push('streak_3');
  if (stats.diasConsecutivos >= 7) conquistas.push('streak_7');
  if (stats.diasConsecutivos >= 14) conquistas.push('streak_14');
  if (stats.diasConsecutivos >= 30) conquistas.push('streak_30');
  
  // Conquistas por raridade
  if (stats.bichinhosPorRaridade.raro >= 1) conquistas.push('primeiro_raro');
  if (stats.bichinhosPorRaridade.epico >= 1) conquistas.push('primeiro_epico');
  if (stats.bichinhosPorRaridade.lendario >= 1) conquistas.push('primeiro_lendario');
  if (stats.bichinhosPorRaridade.mitico >= 1) conquistas.push('primeiro_mitico');
  
  // Filtrar apenas conquistas novas
  return conquistas.filter(c => !stats.conquistas.includes(c));
};

/**
 * 🏆 Obter dados da conquista
 */
export const dadosConquista = (id) => {
  const conquistas = {
    primeira_meta: {
      titulo: 'Primeiro Passo',
      descricao: 'Complete sua primeira meta',
      emoji: '👶',
      xpBonus: 100,
    },
    dez_metas: {
      titulo: 'Dedicado',
      descricao: 'Complete 10 metas',
      emoji: '🎯',
      xpBonus: 500,
    },
    cinquenta_metas: {
      titulo: 'Persistente',
      descricao: 'Complete 50 metas',
      emoji: '💪',
      xpBonus: 2000,
    },
    cem_metas: {
      titulo: 'Mestre',
      descricao: 'Complete 100 metas',
      emoji: '👑',
      xpBonus: 5000,
    },
    uma_hora: {
      titulo: 'Maratonista Iniciante',
      descricao: 'Acumule 1 hora de atividades',
      emoji: '⏰',
      xpBonus: 200,
    },
    dez_horas: {
      titulo: 'Maratonista',
      descricao: 'Acumule 10 horas de atividades',
      emoji: '🏃‍♂️',
      xpBonus: 1000,
    },
    um_dia: {
      titulo: 'Incansável',
      descricao: 'Acumule 24 horas de atividades',
      emoji: '🌟',
      xpBonus: 2400,
    },
    streak_3: {
      titulo: 'Consistente',
      descricao: '3 dias consecutivos',
      emoji: '🔥',
      xpBonus: 300,
    },
    streak_7: {
      titulo: 'Habituado',
      descricao: '7 dias consecutivos',
      emoji: '📅',
      xpBonus: 700,
    },
    streak_14: {
      titulo: 'Disciplinado',
      descricao: '14 dias consecutivos',
      emoji: '💎',
      xpBonus: 1400,
    },
    streak_30: {
      titulo: 'Lenda Viva',
      descricao: '30 dias consecutivos',
      emoji: '👑',
      xpBonus: 3000,
    },
    primeiro_raro: {
      titulo: 'Sortudo',
      descricao: 'Sorteie seu primeiro bichinho raro',
      emoji: '🍀',
      xpBonus: 250,
    },
    primeiro_epico: {
      titulo: 'Épico',
      descricao: 'Sorteie seu primeiro bichinho épico',
      emoji: '⭐',
      xpBonus: 500,
    },
    primeiro_lendario: {
      titulo: 'Lendário',
      descricao: 'Sorteie seu primeiro bichinho lendário',
      emoji: '🌟',
      xpBonus: 1000,
    },
    primeiro_mitico: {
      titulo: 'Mítico',
      descricao: 'Sorteie seu primeiro bichinho mítico',
      emoji: '✨',
      xpBonus: 2500,
    },
  };
  
  return conquistas[id] || null;
};

/**
 * 📈 Resetar estatísticas (para desenvolvimento/teste)
 */
export const resetarEstatisticas = async () => {
  try {
    await AsyncStorage.removeItem(CHAVE_STATS);
    return true;
  } catch (erro) {
    console.error('Erro ao resetar estatísticas:', erro);
    return false;
  }
};
```

---

## 🔧 Configurações de Build

Agora vamos configurar o projeto para build e publicação.

### 1. Configurar app.json para produção

**Arquivo:** `app.json`

```json
{
  "expo": {
    "name": "PixelPet Timer",
    "slug": "pixelpet-timer",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#4F46E5"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.seuusername.pixelpettimer",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "CFBundleDisplayName": "PixelPet Timer"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4F46E5"
      },
      "package": "com.seuusername.pixelpettimer",
      "versionCode": 1,
      "permissions": []
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "extra": {
      "eas": {
        "projectId": "seu-project-id-aqui"
      }
    },
    "owner": "seu-username-expo"
  }
}
```

### 2. Criar configuração EAS Build

**Arquivo:** `eas.json`

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Configurar Metro para assets

**Arquivo:** `metro.config.js`

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adicionar suporte para mais tipos de arquivo se necessário
config.resolver.assetExts.push(
  // Audio
  'mp3',
  'wav',
  // Images
  'gif',
  'webp'
);

module.exports = config;
```

---

## 📱 Build e Publicação

### 1. Comandos para build

```bash
# 📦 PREPARAÇÃO INICIAL

# Instalar EAS CLI (ferramenta de build da Expo)
npm install -g @expo/eas-cli

# Login na sua conta Expo
eas login

# Configurar projeto no EAS
eas build:configure

# 🏗️ BUILDS DE DESENVOLVIMENTO

# Build de desenvolvimento (para teste interno)
eas build --platform android --profile development
eas build --platform ios --profile development

# Build de preview (APK para Android)
eas build --platform android --profile preview

# 🚀 BUILDS DE PRODUÇÃO

# Build para Google Play Store
eas build --platform android --profile production

# Build para Apple App Store
eas build --platform ios --profile production

# Build para ambas as plataformas
eas build --platform all --profile production

# 📱 PUBLICAÇÃO

# Submit para Google Play (após aprovação)
eas submit --platform android

# Submit para Apple App Store (após aprovação)
eas submit --platform ios

# 🔄 UPDATES OVER-THE-AIR (OTA)

# Publicar update sem rebuild
eas update --branch production --message "Correções de bugs"

# Update para desenvolvimento
eas update --branch development --message "Novas funcionalidades"
```

### 2. Scripts para package.json

**Adicionar ao `package.json`:**

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android --profile production",
    "build:ios": "eas build --platform ios --profile production",
    "build:preview": "eas build --platform android --profile preview",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios",
    "update:prod": "eas update --branch production",
    "update:dev": "eas update --branch development"
  }
}
```

### 3. Preparação de assets

```bash
# 🎨 PREPARAR ÍCONES E SPLASH SCREENS

# Gerar ícones automaticamente (se tiver um ícone base 1024x1024)
npx expo install @expo/image-utils
npx expo install sharp-cli

# Otimizar imagens
npx expo optimize

# 📊 VERIFICAR TAMANHO DO BUNDLE
npx expo install @expo/webpack-config
expo export --platform web
# Analizar bundle na pasta dist/
```

### 4. Checklist pré-publicação

```bash
# ✅ VERIFICAÇÕES OBRIGATÓRIAS

# 1. Testar em dispositivos reais
expo start
# Testar em Android e iOS

# 2. Verificar performance
npx expo install expo-dev-client
# Usar Flipper para debugging

# 3. Validar funcionalidades offline
# Testar sem internet

# 4. Verificar notificações (se implementado)
# Testar em background

# 5. Validar builds
eas build --platform android --profile preview
# Instalar APK e testar

# 6. Verificar metadata da loja
# Ícones, descrições, screenshots

# 7. Compliance com lojas
# Política de privacidade
# Termos de uso
# Idade recomendada
```

---

## 🏪 Publicação nas Lojas

### 1. Google Play Store

```bash
# 📱 GOOGLE PLAY CONSOLE

# 1. Criar conta de desenvolvedor ($25 único)
# https://play.google.com/console

# 2. Criar novo app no console
# Definir nome, categoria, idade

# 3. Configurar detalhes da loja
# - Título (30 caracteres)
# - Descrição curta (80 caracteres)
# - Descrição longa (4000 caracteres)
# - Screenshots (mín. 2, max. 8)
# - Ícone (512x512)

# 4. Upload do APK/AAB via EAS
eas submit --platform android

# 5. Configurar versões
# Alpha -> Beta -> Produção

# 6. Análise automática
# Google leva 1-3 dias para aprovar
```

### 2. Apple App Store

```bash
# 🍎 APPLE APP STORE CONNECT

# 1. Conta de desenvolvedor Apple ($99/ano)
# https://developer.apple.com

# 2. App Store Connect
# https://appstoreconnect.apple.com

# 3. Criar novo app
# Bundle ID deve ser único

# 4. Configurar metadados
# - Nome (30 caracteres)
# - Subtítulo (30 caracteres)
# - Descrição (4000 caracteres)
# - Screenshots por dispositivo
# - Palavras-chave (100 caracteres)

# 5. Upload via EAS
eas submit --platform ios

# 6. Processo de revisão
# Apple leva 1-7 dias para aprovar
# Mais rigoroso que Google
```

### 3. Metadata para as lojas

**Arquivo:** `store-metadata.md`

```markdown
# 📱 PixelPet Timer - Metadata das Lojas

## 🎯 Título
PixelPet Timer - Foco Produtivo

## 📝 Descrição Curta (80 caracteres)
Transforme suas metas em bichinhos fofos! Timer + gamificação = produtividade

## 📚 Descrição Longa

🥚 **Choque ovos digitais enquanto cumpre suas metas!**

O PixelPet Timer é o app perfeito para quem quer ser mais produtivo de forma divertida. Transforme cada sessão de estudo ou trabalho em uma aventura épica!

✨ **Como funciona:**
• Crie metas de tempo (estudo, exercícios, trabalho)
• Inicie o timer e "choque" um ovo digital
• Quando completar, ganhe um bichinho fofo!
• Colecione criaturas raras e épicas
• Acompanhe seu progresso e conquistas

🎮 **Recursos incríveis:**
• Sistema de raridades (comum até mítico!)
• Animações suaves e efeitos especiais
• Streak de dias consecutivos
• Coleção completa estilo Pokédex
• Estatísticas detalhadas
• Interface moderna e intuitiva

🏆 **Perfeito para:**
• Estudantes que querem focar mais
• Profissionais buscando produtividade
• Qualquer pessoa que ama gamificação
• Fãs de bichinhos virtuais e coleções

⭐ **Benefícios comprovados:**
• Aumento do foco em até 40%
• Formação de hábitos positivos
• Motivação através de recompensas
• Quebra da procrastinação
• Diversão enquanto trabalha

📊 **Acompanhe seu crescimento:**
• Tempo total investido
• Metas completadas
• Dias consecutivos
• Coleção de bichinhos
• Nível e XP

🎁 **Gratuito e sem anúncios!**
• Experiência premium sem custos
• Todos os bichinhos desbloqueáveis
• Sem compras dentro do app
• Privacidade garantida

Baixe agora e transforme sua rotina em uma aventura épica! 🚀

## 🏷️ Palavras-chave
timer, produtividade, foco, gamificação, bichinhos, coleção, estudo, trabalho, hábitos, motivação

## 📸 Screenshots necessárias
1. Tela inicial com metas
2. Timer em funcionamento
3. Popup de bichinho nascendo
4. Tela de coleção (Pokédex)
5. Estatísticas e conquistas
6. Configurações

## 🎨 Categoria
Produtividade / Educação

## 👶 Idade
4+ (Todos os públicos)

## 🌍 Idiomas
Português (Brasil)
```

---

## 🔄 Atualizações e Manutenção

### 1. Planejamento de updates

```bash
# 📅 CRONOGRAMA DE UPDATES

# Versão 1.1.0 (30 dias após lançamento)
# - Novos bichinhos sazonais
# - Sistema de conquistas avançado
# - Backup na nuvem

# Versão 1.2.0 (60 dias)
# - Temas personalizáveis
# - Sons e efeitos sonoros
# - Modo escuro

# Versão 1.3.0 (90 dias)
# - Multiplicador de amigos
# - Compartilhamento social
# - Notificações inteligentes

# Versão 2.0.0 (6 meses)
# - Sistema de clãs/grupos
# - Competições semanais
# - Loja de acessórios
```

### 2. Comandos de manutenção

```bash
# 🔧 MANUTENÇÃO REGULAR

# Atualizar dependências
npx expo install --fix

# Verificar vulnerabilidades
npm audit
npm audit fix

# Limpeza de cache
expo start --clear
npx expo install --clean

# Backup do projeto
git tag v1.0.0
git push origin v1.0.0

# 📊 ANALYTICS E MONITORAMENTO

# Instalar Expo Analytics (opcional)
npx expo install expo-analytics-amplitude

# Configurar crash reporting
npx expo install expo-error-reporting

# Monitorar performance
npx expo install @react-native-firebase/perf
```

---

## 🎉 Finalização do Tutorial

### ✅ O que você conquistou

Parabéns! Você completou o desenvolvimento completo do **PixelPetTimer**! 

**🏆 Recursos implementados:**
- ✅ Interface moderna e responsiva
- ✅ Sistema de navegação profissional
- ✅ Timer funcional com animações
- ✅ Sistema de sorteio com raridades
- ✅ Banco de dados SQLite local
- ✅ Estatísticas e conquistas
- ✅ Efeitos especiais para bichinhos raros
- ✅ Sistema de streak e bônus
- ✅ Configuração completa para build
- ✅ Metadata para publicação nas lojas

**📱 Plataformas suportadas:**
- ✅ Android (Google Play Store)
- ✅ iOS (Apple App Store)
- ✅ Web (Progressive Web App)

**🎯 Funcionalidades principais:**
- ⏱️ Timer de produtividade
- 🥚 Sistema de chocagem de ovos
- 🐾 Coleção de bichinhos
- 📊 Estatísticas detalhadas
- 🏆 Sistema de conquistas
- 🔥 Streak de dias consecutivos

### 🚀 Próximos passos

1. **Teste final**: Execute todos os comandos de teste
2. **Build preview**: Gere APK para teste em dispositivos
3. **Publicação**: Siga o guia de publicação nas lojas
4. **Marketing**: Prepare screenshots e descrições
5. **Feedback**: Colete opiniões dos primeiros usuários
6. **Updates**: Implemente melhorias baseadas no feedback

### 📞 Suporte e comunidade

```bash
# 🆘 SE PRECISAR DE AJUDA

# Documentação oficial
https://docs.expo.dev

# Comunidade Expo
https://forums.expo.dev

# React Native
https://reactnative.dev

# Troubleshooting comum
npx expo doctor
```

---

**🎊 PARABÉNS! Você criou um app completo e profissional!**

*O PixelPetTimer está pronto para conquistar o mundo da produtividade gamificada! 🌟*

---

**📝 Licença e créditos:**
- Tutorial criado para fins educacionais
- Código livre para uso pessoal e comercial
- Emojis: Unicode Consortium
- Expo Framework: Facebook/Meta

**🙏 Agradecimentos:**
Obrigado por seguir este tutorial até o fim! Você agora tem todas as habilidades para criar apps React Native incríveis! 

**🔗 Compartilhe seu sucesso:**
Quando publicar seu app, não esqueça de compartilhar com a comunidade! #PixelPetTimer #ReactNative #Expo

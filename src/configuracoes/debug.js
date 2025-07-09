// Configurações de debug e desenvolvimento do PixelPetTimer
import { Alert } from 'react-native';

// Configurações de debug
export const DEBUG_CONFIG = {
  // Ativar logs detalhados
  VERBOSE_LOGS: __DEV__,
  
  // Ativar debug de banco de dados
  DEBUG_DATABASE: __DEV__,
  
  // Ativar debug de animações
  DEBUG_ANIMATIONS: false,
  
  // Ativar debug de timers
  DEBUG_TIMERS: __DEV__,
  
  // Mostrar informações de performance
  SHOW_PERFORMANCE: false,
  
  // Acelerar timers para testes (em segundos)
  FAST_TIMERS: false,
  TIMER_SPEED_MULTIPLIER: 1, // 60 = 1 minuto vira 1 segundo
};

// Cores para logs coloridos
const LOG_COLORS = {
  info: '\x1b[36m',    // Ciano
  success: '\x1b[32m', // Verde
  warning: '\x1b[33m', // Amarelo
  error: '\x1b[31m',   // Vermelho
  debug: '\x1b[35m',   // Magenta
  reset: '\x1b[0m',    // Reset
};

// Sistema de logs customizado
export const logger = {
  info: (message, data = null) => {
    if (DEBUG_CONFIG.VERBOSE_LOGS) {
      console.log(`${LOG_COLORS.info}[INFO]${LOG_COLORS.reset}`, message, data || '');
    }
  },
  
  success: (message, data = null) => {
    if (DEBUG_CONFIG.VERBOSE_LOGS) {
      console.log(`${LOG_COLORS.success}[SUCCESS]${LOG_COLORS.reset}`, message, data || '');
    }
  },
  
  warning: (message, data = null) => {
    if (DEBUG_CONFIG.VERBOSE_LOGS) {
      console.warn(`${LOG_COLORS.warning}[WARNING]${LOG_COLORS.reset}`, message, data || '');
    }
  },
  
  error: (message, error = null) => {
    console.error(`${LOG_COLORS.error}[ERROR]${LOG_COLORS.reset}`, message, error || '');
  },
  
  debug: (message, data = null) => {
    if (DEBUG_CONFIG.VERBOSE_LOGS) {
      console.log(`${LOG_COLORS.debug}[DEBUG]${LOG_COLORS.reset}`, message, data || '');
    }
  },
  
  database: (operation, data = null) => {
    if (DEBUG_CONFIG.DEBUG_DATABASE) {
      console.log(`${LOG_COLORS.info}[DB]${LOG_COLORS.reset}`, operation, data || '');
    }
  },
  
  timer: (action, data = null) => {
    if (DEBUG_CONFIG.DEBUG_TIMERS) {
      console.log(`${LOG_COLORS.debug}[TIMER]${LOG_COLORS.reset}`, action, data || '');
    }
  },
  
  animation: (component, action) => {
    if (DEBUG_CONFIG.DEBUG_ANIMATIONS) {
      console.log(`${LOG_COLORS.debug}[ANIM]${LOG_COLORS.reset}`, `${component}: ${action}`);
    }
  }
};

// Função para medir performance
export const measurePerformance = (name, fn) => {
  if (!DEBUG_CONFIG.SHOW_PERFORMANCE) {
    return fn();
  }
  
  const start = Date.now();
  const result = fn();
  const end = Date.now();
  
  logger.debug(`Performance [${name}]: ${end - start}ms`);
  return result;
};

// Debug de dados para testes
export const debugData = {
  // Metas de teste rápidas (em segundos para debug)
  metasRapidas: [
    { nome: 'Teste 5s', duracao: 5 },
    { nome: 'Teste 10s', duracao: 10 },
    { nome: 'Teste 30s', duracao: 30 },
  ],
  
  // Forçar bichinhos específicos para teste
  forcarBichinho: null, // Ex: 'unicornio'
  
  // Limpar dados ao iniciar (para testes)
  limparDadosIniciais: false,
};

// Funções de debug para desenvolvimento
export const debugUtils = {
  // Completar meta instantaneamente
  completarMetaAgora: async (metaId) => {
    if (!__DEV__) return;
    
    logger.debug('Completando meta instantaneamente:', metaId);
    // Aqui você pode chamar funções do banco para completar a meta
    Alert.alert('Debug', `Meta ${metaId} completada instantaneamente!`);
  },
  
  // Adicionar bichinho específico
  adicionarBichinhoTeste: (nomeBichinho) => {
    if (!__DEV__) return;
    
    logger.debug('Adicionando bichinho de teste:', nomeBichinho);
    // Aqui você pode chamar funções do banco para adicionar o bichinho
  },
  
  // Resetar todos os dados
  resetarDados: () => {
    if (!__DEV__) return;
    
    Alert.alert(
      'Debug - Resetar Dados',
      'Tem certeza que deseja apagar todos os dados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetar', 
          style: 'destructive',
          onPress: () => {
            logger.warning('Resetando todos os dados do app');
            // Aqui você pode chamar funções do banco para limpar tudo
          }
        }
      ]
    );
  },
  
  // Mostrar informações do app
  mostrarInfoApp: () => {
    if (!__DEV__) return;
    
    const info = {
      'Debug Mode': __DEV__,
      'Verbose Logs': DEBUG_CONFIG.VERBOSE_LOGS,
      'Fast Timers': DEBUG_CONFIG.FAST_TIMERS,
      'Timer Multiplier': DEBUG_CONFIG.TIMER_SPEED_MULTIPLIER,
    };
    
    Alert.alert('App Info', JSON.stringify(info, null, 2));
  },
};

// Menu de debug para desenvolvimento
export const showDebugMenu = () => {
  if (!__DEV__) return;
  
  Alert.alert(
    'Menu de Debug',
    'Escolha uma opção:',
    [
      { text: 'Info do App', onPress: debugUtils.mostrarInfoApp },
      { text: 'Completar Meta', onPress: () => debugUtils.completarMetaAgora(1) },
      { text: 'Add Bichinho Teste', onPress: () => debugUtils.adicionarBichinhoTeste('unicornio') },
      { text: 'Resetar Dados', onPress: debugUtils.resetarDados },
      { text: 'Cancelar', style: 'cancel' },
    ]
  );
};

// Interceptar erros globais (opcional)
export const setupErrorHandler = () => {
  if (!__DEV__) return;
  
  const originalError = console.error;
  console.error = (...args) => {
    logger.error('Erro interceptado:', args);
    originalError(...args);
  };
};

// Timer de debug (acelera timers para testes)
export const getDebugTimer = (originalSeconds) => {
  if (DEBUG_CONFIG.FAST_TIMERS && __DEV__) {
    return Math.max(1, Math.floor(originalSeconds / DEBUG_CONFIG.TIMER_SPEED_MULTIPLIER));
  }
  return originalSeconds;
};

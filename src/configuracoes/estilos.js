// Configuração de estilos e temas do PixelPetTimer
import { Platform } from 'react-native';

// Cores principais
export const cores = {
  // Tema principal
  primaria: '#FF6B6B',
  secundaria: '#4ECDC4', 
  terciaria: '#45B7D1',
  
  // Tons neutros
  branco: '#FFFFFF',
  cinzaClaro: '#F8F9FA',
  cinzaMedio: '#6C757D',
  cinzaEscuro: '#343A40',
  preto: '#000000',
  
  // Estados
  sucesso: '#28A745',
  aviso: '#FFC107',
  erro: '#DC3545',
  info: '#17A2B8',
  
  // Raridades dos bichinhos
  comum: '#808080',
  raro: '#0080FF',
  epico: '#8B00FF',
  lendario: '#FFD700',
  
  // Cores de fundo
  fundoApp: '#F0F8FF',
  fundoCard: '#FFFFFF',
  fundoOvo: '#FFF5E1',
  fundoPokedex: '#E8F5E8',
};

// Tipografia
export const tipografia = {
  tamanhos: {
    pequeno: 12,
    medio: 16,
    grande: 20,
    titulo: 24,
    display: 32,
  },
  pesos: {
    normal: '400',
    medio: '500',
    negrito: '700',
    extraNegrito: '900',
  },
  familias: Platform.select({
    ios: {
      regular: 'System',
      mono: 'Courier New',
    },
    android: {
      regular: 'Roboto',
      mono: 'monospace',
    },
    default: {
      regular: 'System',
      mono: 'monospace',
    },
  }),
};

// Espaçamentos
export const espacamentos = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordas e raios
export const bordas = {
  raio: {
    pequeno: 4,
    medio: 8,
    grande: 12,
    redondo: 50,
  },
  largura: {
    fina: 1,
    media: 2,
    grossa: 3,
  },
};

// Sombras
export const sombras = {
  leve: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  media: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forte: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Estilos comuns de componentes
export const estilosComuns = {
  container: {
    flex: 1,
    backgroundColor: cores.fundoApp,
    paddingHorizontal: espacamentos.md,
  },
  
  card: {
    backgroundColor: cores.fundoCard,
    borderRadius: bordas.raio.medio,
    padding: espacamentos.md,
    marginVertical: espacamentos.sm,
    ...sombras.leve,
  },
  
  botaoPrimario: {
    backgroundColor: cores.primaria,
    borderRadius: bordas.raio.medio,
    paddingVertical: espacamentos.md,
    paddingHorizontal: espacamentos.lg,
    alignItems: 'center',
    ...sombras.media,
  },
  
  botaoSecundario: {
    backgroundColor: cores.secundaria,
    borderRadius: bordas.raio.medio,
    paddingVertical: espacamentos.md,
    paddingHorizontal: espacamentos.lg,
    alignItems: 'center',
    ...sombras.leve,
  },
  
  textoBotao: {
    color: cores.branco,
    fontSize: tipografia.tamanhos.medio,
    fontWeight: tipografia.pesos.negrito,
  },
  
  titulo: {
    fontSize: tipografia.tamanhos.titulo,
    fontWeight: tipografia.pesos.negrito,
    color: cores.cinzaEscuro,
    textAlign: 'center',
    marginBottom: espacamentos.md,
  },
  
  subtitulo: {
    fontSize: tipografia.tamanhos.grande,
    fontWeight: tipografia.pesos.medio,
    color: cores.cinzaMedio,
    textAlign: 'center',
    marginBottom: espacamentos.sm,
  },
  
  input: {
    borderWidth: bordas.largura.fina,
    borderColor: cores.cinzaClaro,
    borderRadius: bordas.raio.medio,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm,
    fontSize: tipografia.tamanhos.medio,
    backgroundColor: cores.branco,
  },
};

// Animações
export const animacoes = {
  duracao: {
    rapida: 200,
    normal: 300,
    lenta: 500,
    muitoLenta: 1000,
  },
  
  tipos: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
};

// Tema escuro (opcional)
export const temaEscuro = {
  cores: {
    ...cores,
    fundoApp: '#121212',
    fundoCard: '#1E1E1E',
    cinzaClaro: '#2C2C2C',
    cinzaMedio: '#AAAAAA',
    cinzaEscuro: '#FFFFFF',
  },
};

// Função para aplicar tema
export const aplicarTema = (escuro = false) => {
  return escuro ? temaEscuro : { cores, tipografia, espacamentos, bordas, sombras };
};

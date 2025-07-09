import * as SQLite from 'expo-sqlite';
import { logger, debugData } from '../configuracoes/debug';

// Abre conexão com banco de dados local
const bd = SQLite.openDatabaseSync('chocadeiraPixelPets.db');

// Função principal para configurar o banco na inicialização
export const configurarBancoDados = () => {
  try {
    logger.database('Configurando banco de dados...');
    
    // Tabela para armazenar as metas de tempo definidas pelo usuário
    bd.execSync(`
      CREATE TABLE IF NOT EXISTS metas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único da meta
        titulo TEXT NOT NULL,                  -- Nome da tarefa
        minutos INTEGER NOT NULL,              -- Duração em minutos
        concluida INTEGER DEFAULT 0,           -- 0 = não concluída, 1 = concluída
        criadaEm DATETIME DEFAULT CURRENT_TIMESTAMP  -- Data/hora de criação
      );
    `);

    // Tabela para armazenar os bichinhos coletados
    bd.execSync(`
      CREATE TABLE IF NOT EXISTS bichinhos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID único do bichinho
        nome TEXT NOT NULL,                    -- Nome do bichinho
        imagem TEXT NOT NULL,                  -- Nome do arquivo de imagem
        conquistadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Quando foi conquistado
        metaTitulo TEXT NOT NULL               -- Qual meta foi cumprida
      );
    `);

    // Se debug habilitado, limpar dados iniciais se necessário
    if (debugData.limparDadosIniciais && __DEV__) {
      logger.warning('Limpando dados iniciais para debug...');
      limparTodosDados();
    }

    logger.success('Banco de dados configurado com sucesso!');
  } catch (erro) {
    logger.error('Erro ao configurar banco de dados:', erro);
  }
};

// Função para adicionar uma nova meta de tempo
export const adicionarMeta = (titulo, minutos, callback) => {
  try {
    logger.database('Adicionando nova meta', { titulo, minutos });
    
    // Valida se os dados estão corretos
    if (!titulo || !minutos || minutos <= 0) {
      throw new Error('Título e minutos são obrigatórios e minutos deve ser maior que 0');
    }

    // Insere nova meta na tabela
    const resultado = bd.runSync(
      'INSERT INTO metas (titulo, minutos) VALUES (?, ?)',
      [titulo, minutos]
    );
    
    logger.success(`Meta "${titulo}" adicionada com ID: ${resultado.lastInsertRowId}`);
    
    // Executa função callback se fornecida (geralmente para voltar à tela anterior)
    if (callback) callback();
  } catch (erro) {
    logger.error('Erro ao adicionar meta:', erro);
    throw erro; // Re-lança erro para tratar na interface
  }
};

// Função para buscar todas as metas que ainda não foram concluídas
export const buscarMetas = () => {
  try {
    logger.database('Buscando metas não concluídas');
    
    // Busca apenas metas onde concluida = 0 (não concluídas)
    const metas = bd.getAllSync(
      'SELECT * FROM metas WHERE concluida = 0 ORDER BY criadaEm DESC'
    );
    
    logger.info(`Encontradas ${metas.length} metas não concluídas`);
    return metas;
  } catch (erro) {
    logger.error('Erro ao buscar metas:', erro);
    return []; // Retorna array vazio em caso de erro
  }
};

// Função para marcar meta como concluída e sortear bichinho
export const concluirMeta = (metaId, metaTitulo) => {
  try {
    logger.database('Concluindo meta', { metaId, metaTitulo });
    
    // Marca a meta como concluída (concluida = 1)
    bd.runSync('UPDATE metas SET concluida = 1 WHERE id = ?', [metaId]);
    
    // Sorteia e adiciona bichinho aleatório à coleção
    const bichinhoSorteado = sortearBichinhoAleatorio();
    adicionarBichinhoNaColecao(bichinhoSorteado, metaTitulo);
    
    logger.success(`Meta "${metaTitulo}" concluída! Bichinho adicionado: ${bichinhoSorteado.nome}`);
    
    return bichinhoSorteado; // Retorna o bichinho para mostrar na tela
  } catch (erro) {
    logger.error('Erro ao concluir meta:', erro);
    throw erro;
  }
};

// Lista completa de bichinhos disponíveis por raridade
const BICHINHOS_DISPONIVEIS = {
  comum: [
    { nome: 'gatinho', imagem: 'gatinho.png', raridade: 'comum', chance: 70 },
    { nome: 'cachorrinho', imagem: 'cachorrinho.png', raridade: 'comum', chance: 70 },
    { nome: 'passarinho', imagem: 'passarinho.png', raridade: 'comum', chance: 70 },
    { nome: 'coelhinho', imagem: 'coelhinho.png', raridade: 'comum', chance: 70 },
    { nome: 'hamster', imagem: 'hamster.png', raridade: 'comum', chance: 70 },
  ],
  raro: [
    { nome: 'unicornio', imagem: 'unicornio.png', raridade: 'raro', chance: 20 },
    { nome: 'phoenix', imagem: 'phoenix.png', raridade: 'raro', chance: 20 },
    { nome: 'dragao', imagem: 'dragao.png', raridade: 'raro', chance: 20 },
    { nome: 'fada', imagem: 'fada.png', raridade: 'raro', chance: 20 },
  ],
  epico: [
    { nome: 'leao-dourado', imagem: 'leao-dourado.png', raridade: 'epico', chance: 8 },
    { nome: 'aguia-real', imagem: 'aguia-real.png', raridade: 'epico', chance: 8 },
    { nome: 'lobo-lunar', imagem: 'lobo-lunar.png', raridade: 'epico', chance: 8 },
  ],
  lendario: [
    { nome: 'cosmic-cat', imagem: 'cosmic-cat.png', raridade: 'lendario', chance: 2 },
    { nome: 'stellar-bird', imagem: 'stellar-bird.png', raridade: 'lendario', chance: 2 },
    { nome: 'time-guardian', imagem: 'time-guardian.png', raridade: 'lendario', chance: 2 },
  ]
};

// Função interna para sortear um bichinho aleatório com sistema de raridades
const sortearBichinhoAleatorio = () => {
  logger.debug('Sorteando bichinho aleatório...');
  
  // Se debug forçar bichinho específico
  if (debugData.forcarBichinho && __DEV__) {
    const bichinhoForcado = encontrarBichinhoPorNome(debugData.forcarBichinho);
    if (bichinhoForcado) {
      logger.debug('Usando bichinho forçado para debug:', bichinhoForcado.nome);
      return bichinhoForcado;
    }
  }
  
  // Sistema de raridades: 70% comum, 20% raro, 8% épico, 2% lendário
  const sorteio = Math.random() * 100;
  
  let raridade;
  if (sorteio <= 2) {
    raridade = 'lendario';
  } else if (sorteio <= 10) { // 2 + 8
    raridade = 'epico';
  } else if (sorteio <= 30) { // 2 + 8 + 20
    raridade = 'raro';
  } else {
    raridade = 'comum';
  }
  
  // Seleciona bichinho aleatório da raridade sorteada
  const bichinhosRaridade = BICHINHOS_DISPONIVEIS[raridade];
  const indiceAleatorio = Math.floor(Math.random() * bichinhosRaridade.length);
  const bichinhoSorteado = bichinhosRaridade[indiceAleatorio];
  
  logger.success(`Bichinho sorteado: ${bichinhoSorteado.nome} (${raridade})`);
  return bichinhoSorteado;
};

// Função auxiliar para encontrar bichinho por nome (para debug)
const encontrarBichinhoPorNome = (nome) => {
  for (const raridade in BICHINHOS_DISPONIVEIS) {
    const bichinho = BICHINHOS_DISPONIVEIS[raridade].find(b => b.nome === nome);
    if (bichinho) return bichinho;
  }
  return null;
};

// Função interna para adicionar bichinho à coleção
const adicionarBichinhoNaColecao = (bichinho, metaTitulo) => {
  try {
    logger.database('Adicionando bichinho à coleção', { bichinho: bichinho.nome, metaTitulo });
    
    // Insere bichinho na tabela de bichinhos coletados
    bd.runSync(
      'INSERT INTO bichinhos (nome, imagem, metaTitulo) VALUES (?, ?, ?)',
      [bichinho.nome, bichinho.imagem, metaTitulo]
    );
    
    logger.success(`Bichinho "${bichinho.nome}" adicionado à coleção!`);
  } catch (erro) {
    logger.error('Erro ao adicionar bichinho à coleção:', erro);
    throw erro;
  }
};

// Função para buscar todos os bichinhos coletados (para a Pokédex)
export const buscarBichinhos = () => {
  try {
    logger.database('Buscando bichinhos coletados');
    
    // Busca todos os bichinhos ordenados por data de conquista (mais recente primeiro)
    const bichinhos = bd.getAllSync(
      'SELECT * FROM bichinhos ORDER BY conquistadoEm DESC'
    );
    
    logger.info(`Encontrados ${bichinhos.length} bichinhos na coleção`);
    return bichinhos;
  } catch (erro) {
    logger.error('Erro ao buscar bichinhos:', erro);
    return [];
  }
};

// Função para obter estatísticas gerais
export const obterEstatisticas = () => {
  try {
    logger.database('Obtendo estatísticas gerais');
    
    // Conta metas concluídas
    const metasConcluidas = bd.getFirstSync(
      'SELECT COUNT(*) as total FROM metas WHERE concluida = 1'
    );
    
    // Conta metas pendentes
    const metasPendentes = bd.getFirstSync(
      'SELECT COUNT(*) as total FROM metas WHERE concluida = 0'
    );
    
    // Conta bichinhos únicos
    const bichinhosUnicos = bd.getFirstSync(
      'SELECT COUNT(DISTINCT nome) as total FROM bichinhos'
    );
    
    // Calcula total de bichinhos disponíveis
    const totalDisponiveis = Object.values(BICHINHOS_DISPONIVEIS)
      .reduce((total, raridade) => total + raridade.length, 0);
    
    const stats = {
      metasConcluidas: metasConcluidas.total,
      metasPendentes: metasPendentes.total,
      bichinhosUnicos: bichinhosUnicos.total,
      totalBichinhos: totalDisponiveis
    };
    
    logger.info('Estatísticas calculadas:', stats);
    return stats;
  } catch (erro) {
    logger.error('Erro ao obter estatísticas:', erro);
    return {
      metasConcluidas: 0,
      metasPendentes: 0,
      bichinhosUnicos: 0,
      totalBichinhos: 0
    };
  }
};

// Função para limpar dados (útil para testes)
export const limparTodosDados = () => {
  try {
    logger.warning('Limpando todos os dados do app...');
    bd.execSync('DELETE FROM metas');
    bd.execSync('DELETE FROM bichinhos');
    logger.success('Dados limpos com sucesso!');
  } catch (erro) {
    logger.error('Erro ao limpar dados:', erro);
  }
};

// Função para obter lista de todos os bichinhos disponíveis (para debug)
export const obterBichinhosDisponiveis = () => {
  return BICHINHOS_DISPONIVEIS;
};

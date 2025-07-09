// Exemplos práticos de uso do PixelPetTimer
// Este arquivo contém exemplos de como usar as funcionalidades

import { adicionarMeta, buscarMetas, concluirMeta, buscarBichinhos } from './bancoDados';
import { logger } from '../configuracoes/debug';

export const exemplosPraticos = {
  
  // Exemplo 1: Adicionar meta simples
  async criarMetaExemplo() {
    try {
      logger.info('Criando meta de exemplo...');
      
      await adicionarMeta('Estudar React Native', 30);
      logger.success('Meta de exemplo criada!');
      
    } catch (erro) {
      logger.error('Erro ao criar meta de exemplo:', erro);
    }
  },

  // Exemplo 2: Simular conclusão de meta
  async simularConclusaoMeta() {
    try {
      logger.info('Simulando conclusão de meta...');
      
      // Busca a primeira meta disponível
      const metas = await buscarMetas();
      if (metas.length === 0) {
        // Cria uma meta se não houver nenhuma
        await this.criarMetaExemplo();
        const novasMetas = await buscarMetas();
        
        if (novasMetas.length > 0) {
          const meta = novasMetas[0];
          const bichinho = await concluirMeta(meta.id, meta.titulo);
          logger.success('Meta concluída! Bichinho obtido:', bichinho.nome);
          return bichinho;
        }
      } else {
        // Conclui a primeira meta encontrada
        const meta = metas[0];
        const bichinho = await concluirMeta(meta.id, meta.titulo);
        logger.success('Meta concluída! Bichinho obtido:', bichinho.nome);
        return bichinho;
      }
      
    } catch (erro) {
      logger.error('Erro ao simular conclusão:', erro);
    }
  },

  // Exemplo 3: Obter relatório da coleção
  async obterRelatorioColecao() {
    try {
      logger.info('Obtendo relatório da coleção...');
      
      const bichinhos = await buscarBichinhos();
      
      // Agrupa bichinhos por raridade
      const relatorio = {
        total: bichinhos.length,
        porRaridade: {},
        ultimosColetados: bichinhos.slice(0, 5),
      };
      
      // Conta bichinhos por raridade
      bichinhos.forEach(bichinho => {
        // Aqui você precisaria determinar a raridade baseado no nome
        // Por simplicidade, vamos assumir que está no nome ou usar uma função auxiliar
        const raridade = this.determinarRaridade(bichinho.nome);
        relatorio.porRaridade[raridade] = (relatorio.porRaridade[raridade] || 0) + 1;
      });
      
      logger.info('Relatório da coleção:', relatorio);
      return relatorio;
      
    } catch (erro) {
      logger.error('Erro ao obter relatório:', erro);
      return { total: 0, porRaridade: {}, ultimosColetados: [] };
    }
  },

  // Função auxiliar para determinar raridade
  determinarRaridade(nomeBichinho) {
    const raros = ['unicornio', 'phoenix', 'dragao', 'fada'];
    const epicos = ['leao-dourado', 'aguia-real', 'lobo-lunar'];
    const lendarios = ['cosmic-cat', 'stellar-bird', 'time-guardian'];
    
    if (lendarios.includes(nomeBichinho)) return 'lendario';
    if (epicos.includes(nomeBichinho)) return 'epico';
    if (raros.includes(nomeBichinho)) return 'raro';
    return 'comum';
  },

  // Exemplo 4: Criar múltiplas metas de teste
  async criarMetasDeTeste() {
    const metasTeste = [
      { titulo: 'Ler por 15 minutos', minutos: 15 },
      { titulo: 'Exercitar-se', minutos: 30 },
      { titulo: 'Meditar', minutos: 10 },
      { titulo: 'Estudar programação', minutos: 45 },
      { titulo: 'Organizar mesa', minutos: 20 },
    ];

    logger.info('Criando metas de teste...');
    
    for (const meta of metasTeste) {
      try {
        await adicionarMeta(meta.titulo, meta.minutos);
        logger.success(`Meta "${meta.titulo}" criada`);
      } catch (erro) {
        logger.error(`Erro ao criar meta "${meta.titulo}":`, erro);
      }
    }
    
    logger.success('Todas as metas de teste foram criadas!');
  },

  // Exemplo 5: Demonstração de uso completo
  async demonstracaoCompleta() {
    logger.info('🎮 Iniciando demonstração completa do PixelPetTimer...');
    
    try {
      // 1. Criar algumas metas
      await this.criarMetasDeTeste();
      
      // 2. Simular conclusão de algumas metas
      await this.simularConclusaoMeta();
      await this.simularConclusaoMeta();
      
      // 3. Obter relatório
      const relatorio = await this.obterRelatorioColecao();
      
      // 4. Mostrar resultado
      logger.success('🎉 Demonstração concluída!');
      logger.info('Relatório final:', relatorio);
      
      return {
        sucesso: true,
        relatorio,
        mensagem: 'Demonstração executada com sucesso!'
      };
      
    } catch (erro) {
      logger.error('Erro na demonstração:', erro);
      return {
        sucesso: false,
        erro: erro.message,
        mensagem: 'Erro durante a demonstração'
      };
    }
  }
};

// Função auxiliar para executar demonstração
export const executarDemonstracao = async () => {
  return await exemplosPraticos.demonstracaoCompleta();
};

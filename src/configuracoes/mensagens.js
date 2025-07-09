// Sistema de mensagens personalizáveis do PixelPetTimer

// 🏠 Mensagens da Tela Inicial
export const mensagensTelaInicial = {
  titulo: 'Chocadeira de Bichinhos 🥚',
  subtitulo: 'Escolha uma meta para começar a chocar:',
  semMetas: 'Nenhuma meta criada ainda.\n\nCrie uma meta para começar a chocar ovos\ne ganhar bichinhos incríveis! 🌟',
  botaoNovaMeta: '🥚 Nova Meta',
  botaoColecao: '📚 Minha Coleção',
  metasDisponiveis: 'Metas Disponíveis',
  // Mensagens do timer
  timerIniciado: 'Timer iniciado! Seu ovo está chocando...',
  timerCancelado: 'Timer cancelado. Seu ovinho esfriou... 💔',
};

// ➕ Mensagens da Tela de Nova Meta
export const mensagensNovaMeta = {
  titulo: '🥚 Criar Nova Meta',
  subtitulo: 'Defina sua meta de foco para chocar um ovo especial!',
  explicacao: 'Quando você completar esta meta, um bichinho\naleatório nascerá do seu ovo! 🐾',
  
  // Labels dos campos
  labelTitulo: '📝 O que você vai fazer?',
  placeholderTitulo: 'Ex: Estudar React Native',
  labelDuracao: '⏰ Por quantos minutos?',
  placeholderDuracao: 'Ex: 25',
  
  // Botões de duração rápida
  duracaoRapida: '⚡ Ou escolha uma duração rápida:',
  
  // Botões de ação
  botaoSalvar: '🥚 Começar a Chocar!',
  botaoCancelar: '❌ Cancelar',
  
  // Mensagens de validação
  erroTituloVazio: '📝 Por favor, digite um título para sua meta!',
  erroDuracaoInvalida: '⏰ Por favor, digite uma duração válida maior que 0!',
  erroDuracaoMaxima: '⚡ Duração máxima é de 120 minutos!',
  
  // Sucesso
  sucessoCriada: '✅ Meta criada com sucesso!',
  sucessoTexto: 'Sua meta foi criada! Volte à tela inicial para começar a chocar.',
  
  // Dicas
  dicasTitulo: '💡 Dicas de Tempo:',
  dicas: [
    '• 15 min: Tarefas rápidas ou revisão',
    '• 25 min: Técnica Pomodoro clássica', 
    '• 45 min: Estudo focado profundo',
    '• 60 min: Projetos longos'
  ]
};

// 🥚 Mensagens do Componente Ovo
export const mensagensOvo = {
  // Estados do ovo
  pronto: 'Toque em uma meta para começar a chocar! 🥚',
  chocando: 'Chocando ovo... 🔥',
  quaseNascendo: 'Seu bichinho está quase nascendo! ✨',
  nasceu: 'Nasceu um bichinho! 🎉',
  cancelado: 'Ovinho esfriou... Tente novamente! 💔',
  
  // Mensagens motivacionais durante o processo
  motivacao: [
    '🔥 Seu ovo está esquentando!',
    '✨ Algo mágico está acontecendo...',
    '🌟 Falta pouco para seu bichinho nascer!',
    '💫 O ovo está tremulando...',
    '🥚 Continue focado, você consegue!',
    '⭐ Seu bichinho está quase pronto!',
    '🎯 Mantenha o foco, está indo bem!'
  ]
};

// 🎉 Mensagens de Nascimento
export const mensagensNascimento = {
  parabens: [
    '🎉 Parabéns! Seu bichinho nasceu!',
    '✨ Um novo amiguinho chegou!',
    '🌟 Que fofura nasceu do seu ovo!',
    '💖 Você ganhou um novo companheiro!',
    '🎊 Sucesso! Seu bichinho está aqui!',
    '🏆 Incrível! Mais um para sua coleção!'
  ],
  
  botaoColecao: '📚 Ver na Coleção',
  botaoContinuar: '✨ Continuar',
  
  // Mensagens baseadas na raridade
  raridadeLendario: '🌟 WOW! Um bichinho LENDÁRIO nasceu!',
  raridadeEpico: '💜 Que sorte! Um bichinho ÉPICO!',
  raridadeRaro: '💙 Legal! Um bichinho RARO apareceu!',
  raridadeComum: '💚 Fofo! Um bichinho COMUM nasceu!'
};

// 😢 Mensagens de Cancelamento  
export const mensagensCancelamento = {
  titulo: '😔 Cancelar Timer?',
  pergunta: 'Tem certeza que quer parar?\nSeu ovinho vai esfriar...',
  
  botaoContinuar: '✨ Continuar Chocando',
  botaoCancelar: '❌ Parar Timer',
  
  mensagens: [
    '😢 O ovinho esfriou...',
    '💔 Seu bichinho não conseguiu nascer.',
    '😔 Tente novamente com mais foco!',
    '🥶 O ovo precisa de mais calor...',
    '⏰ Que pena! Faltou pouco tempo...',
    '💭 Não desista! Tente outra vez!'
  ]
};

// 📚 Mensagens da Pokédex
export const mensagensPokedex = {
  titulo: '📖 Minha Coleção de Bichinhos',
  contadorPets: (quantidade) => `🐾 ${quantidade} bichinhos coletados`,
  
  // Lista vazia
  listaVazia: {
    titulo: '🥚 Nenhum bichinho coletado ainda!',
    subtitulo: 'Complete suas metas de foco para chocar ovos\ne ganhar bichinhos incríveis! 🌟',
    botao: '🥚 Criar Meta'
  },
  
  // Detalhes do bichinho
  detalhes: {
    titulo: '🐾 Detalhes do Bichinho',
    conquistadoEm: '🗓️ Conquistado em:',
    metaCumprida: '🎯 Meta cumprida:',
    raridade: '💎 Raridade:',
    botaoFechar: '✨ Fechar'
  },
  
  // Estatísticas
  estatisticas: {
    titulo: '📊 Suas Estatísticas',
    metasConcluidas: 'Metas Concluídas',
    metasPendentes: 'Metas Pendentes', 
    bichinhosUnicos: 'Bichinhos Únicos',
    progresso: (atual, total) => `${atual}/${total} bichinhos descobertos`
  }
};

// 🎮 Mensagens de Interface Geral
export const mensagensGerais = {
  // Botões comuns
  botoes: {
    ok: 'OK',
    cancelar: 'Cancelar',
    voltar: '← Voltar',
    continuar: 'Continuar →',
    fechar: 'Fechar',
    salvar: 'Salvar',
    editar: 'Editar',
    excluir: 'Excluir'
  },
  
  // Mensagens de erro genéricas
  erros: {
    generico: 'Ops! Algo deu errado. Tente novamente.',
    conexao: 'Problema de conexão. Verifique sua internet.',
    dadosInvalidos: 'Por favor, verifique os dados inseridos.'
  },
  
  // Mensagens de sucesso
  sucessos: {
    dadosSalvos: 'Dados salvos com sucesso!',
    operacaoConcluida: 'Operação concluída!',
    bemVindo: 'Bem-vindo ao PixelPetTimer!'
  },
  
  // Unidades de tempo
  tempo: {
    minuto: 'minuto',
    minutos: 'minutos',
    segundo: 'segundo', 
    segundos: 'segundos',
    formatoTimer: (min, seg) => `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`
  }
};

// 🎲 Funções Utilitárias para Mensagens

// Todas as mensagens em um objeto centralizado
const todasMensagens = {
  telaInicial: mensagensTelaInicial,
  novaMeta: mensagensNovaMeta,
  pokedex: mensagensPokedex,
  nascimento: mensagensNascimento,
  gerais: mensagensGerais,
};

// Função principal para obter mensagens
export const obterMensagem = (chave, secao = null) => {
  try {
    if (secao) {
      // Busca mensagem específica em uma seção
      return todasMensagens[secao][chave] || `Mensagem '${chave}' não encontrada na seção '${secao}'`;
    }
    
    // Busca em todas as seções
    for (const nomeSecao in todasMensagens) {
      if (todasMensagens[nomeSecao][chave]) {
        return todasMensagens[nomeSecao][chave];
      }
    }
    
    return `Mensagem '${chave}' não encontrada`;
  } catch (erro) {
    console.warn('Erro ao obter mensagem:', erro);
    return 'Mensagem não disponível';
  }
};

// Função para pegar mensagem aleatória de uma lista
export const obterMensagemAleatoria = (listaMensagens) => {
  if (!Array.isArray(listaMensagens) || listaMensagens.length === 0) {
    return 'Mensagem não encontrada';
  }
  
  const indiceAleatorio = Math.floor(Math.random() * listaMensagens.length);
  return listaMensagens[indiceAleatorio];
};

// Função para formatar tempo em MM:SS
export const formatarTempo = (segundosTotais) => {
  const minutos = Math.floor(segundosTotais / 60);
  const segundos = segundosTotais % 60;
  return mensagensGerais.tempo.formatoTimer(minutos, segundos);
};

// Função para obter mensagem de raridade
export const obterMensagemRaridade = (raridade) => {
  switch (raridade) {
    case 'lendário':
      return mensagensNascimento.raridadeLendario;
    case 'épico':
      return mensagensNascimento.raridadeEpico;
    case 'raro':
      return mensagensNascimento.raridadeRaro;
    default:
      return mensagensNascimento.raridadeComum;
  }
};

// Função para personalizar mensagem com nome
export const personalizarMensagem = (template, dados) => {
  let mensagem = template;
  
  // Substitui placeholders pelos dados reais
  Object.keys(dados).forEach(chave => {
    const placeholder = `{${chave}}`;
    mensagem = mensagem.replace(placeholder, dados[chave]);
  });
  
  return mensagem;
};

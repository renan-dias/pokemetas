# 🥚 Tutorial Completo: PixelPetTimer - Chocadeira de Bichinhos

Um aplicativo React Native onde você define metas de tempo e "choca" ovos que se transformam em bichinhos aleatórios quando você completa suas tarefas!

## 📖 Índice

1. [📦 Configuração Inicial](#configuração-inicial)
2. [🗄️ Sistema de Banco de Dados](#sistema-de-banco-de-dados)
3. [💬 Sistema de Mensagens](#sistema-de-mensagens)
4. [🥚 Componente do Ovo](#componente-do-ovo)
5. [🏠 Tela Principal](#tela-principal)
6. [➕ Tela Nova Meta](#tela-nova-meta)
7. [📚 Tela Pokédex](#tela-pokédex)
8. [🎨 Guia de Estilização](#guia-de-estilização)
9. [🚀 Build e Publicação](#build-e-publicação)
10. [💡 Desafios Extras](#desafios-extras)

---

## 📦 Configuração Inicial

### 🏗️ Estrutura do Projeto

```
PixelPetTimer/
├── src/
│   ├── telas/                    # Telas do aplicativo
│   │   ├── TelaInicial.js        # Tela principal com ovo
│   │   ├── TelaNovaMeta.js       # Criar nova meta
│   │   └── TelaPokedex.js        # Coleção de bichinhos
│   ├── componentes/              # Componentes reutilizáveis
│   │   ├── OvoChocando.js        # Componente do ovo
│   │   └── BichinhoNascido.js    # Popup do bichinho
│   ├── dados/                    # Banco de dados
│   │   └── bancoDados.js         # Configuração SQLite
│   ├── configuracoes/            # Configurações
│   │   └── mensagens.js          # Mensagens personalizáveis
│   └── recursos/                 # Imagens e assets
│       ├── ovos/                 # Imagens dos ovos
│       └── bichinhos/            # Imagens dos bichinhos
├── assets/                       # Assets do Expo
│   ├── icon.png                  # Ícone do app
│   └── splash.png                # Tela de splash
├── App.js                        # Componente principal
├── app.json                      # Configuração do Expo
└── package.json                  # Dependências
```

### 📋 Dependências Necessárias

Crie o arquivo `package.json` com todas as dependências:

```json
{
  "name": "pixelpettimer",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-status-bar": "~1.12.0",
    "expo-sqlite": "~14.0.0",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/native-stack": "^6.9.0",
    "react-native-screens": "~3.31.0",
    "react-native-safe-area-context": "4.10.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

### ⚙️ Configuração do Babel

Crie o arquivo `babel.config.js`:

```javascript
// Configuração do Babel para transpilar código React Native
module.exports = function (api) {
  // Cache habilitado para melhor performance
  api.cache(true);
  return {
    // Preset do Expo com todas as configurações necessárias
    presets: ['babel-preset-expo'],
  };
};
```

### 📱 Configuração do App Principal

Crie o arquivo `App.js` - o coração da aplicação:

```javascript
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importando nossas telas personalizadas
import TelaInicial from './src/telas/TelaInicial';
import TelaNovaMeta from './src/telas/TelaNovaMeta';
import TelaPokedex from './src/telas/TelaPokedex';

// Importando configuração do banco de dados
import { configurarBancoDados } from './src/dados/bancoDados';

// Criando navegador para trocar entre telas
const Navegador = createNativeStackNavigator();

export default function App() {
  // Configura banco quando app inicializa
  useEffect(() => {
    configurarBancoDados();
  }, []);

  return (
    <NavigationContainer>
      {/* Configurações gerais do cabeçalho */}
      <Navegador.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' }, // Fundo roxo
          headerTintColor: '#FFFFFF',                   // Texto branco
          headerTitleStyle: { fontWeight: 'bold' },     // Texto negrito
        }}
      >
        {/* Tela principal - onde ficam os ovos */}
        <Navegador.Screen
          name="Inicial"
          component={TelaInicial}
          options={{ title: '🥚 Chocadeira de Pets' }}
        />
        
        {/* Tela para criar nova meta */}
        <Navegador.Screen
          name="NovaMeta"
          component={TelaNovaMeta}
          options={{ title: '⏰ Nova Meta' }}
        />
        
        {/* Tela tipo Pokédex */}
        <Navegador.Screen
          name="Pokedex"
          component={TelaPokedex}
          options={{ title: '📖 Minha Coleção' }}
        />
      </Navegador.Navigator>
      
      {/* Barra de status em cor clara */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
```

### 📄 Arquivo de Entrada

Crie o arquivo `index.js`:

```javascript
// Arquivo de entrada principal da aplicação
import { registerRootComponent } from 'expo';
import App from './App';

// Registra componente principal para o Expo
registerRootComponent(App);
```

---

*Parte 1 do tutorial criada! Esta é a base do projeto com toda configuração inicial.*

**🎯 O que fizemos até agora:**
- ✅ Estrutura de pastas organizada
- ✅ Dependências configuradas
- ✅ Navegação entre telas
- ✅ Configuração do Expo

**📋 Próximas partes:**
- Parte 2: Sistema de Banco de Dados
- Parte 3: Sistema de Mensagens
- Parte 4: Componentes visuais
- Parte 5: Telas da aplicação

*Digite "continue" para a próxima parte do tutorial!*

---

## 🗄️ Sistema de Banco de Dados

### 📚 Entendendo o SQLite no React Native

O SQLite é um banco de dados local que armazena informações diretamente no dispositivo. No nosso app, vamos usar para:
- **Metas**: Guardar as tarefas que o usuário quer fazer
- **Bichinhos**: Salvar os pets coletados quando metas são completidas

### 🔧 Criando o Sistema de Dados

Crie o arquivo `src/dados/bancoDados.js`:

```javascript
import * as SQLite from 'expo-sqlite';

// Abre conexão com banco de dados local
const bd = SQLite.openDatabaseSync('chocadeiraPixelPets.db');

// Função principal para configurar o banco na inicialização
export const configurarBancoDados = () => {
  try {
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

    console.log('✅ Banco de dados configurado com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao configurar banco de dados:', erro);
  }
};

// Função para adicionar uma nova meta de tempo
export const adicionarMeta = (titulo, minutos, callback) => {
  try {
    // Valida se os dados estão corretos
    if (!titulo || !minutos || minutos <= 0) {
      throw new Error('Título e minutos são obrigatórios e minutos deve ser maior que 0');
    }

    // Insere nova meta na tabela
    const resultado = bd.runSync(
      'INSERT INTO metas (titulo, minutos) VALUES (?, ?)',
      [titulo, minutos]
    );
    
    console.log(`✅ Meta "${titulo}" adicionada com ID: ${resultado.lastInsertRowId}`);
    
    // Executa função callback se fornecida (geralmente para voltar à tela anterior)
    if (callback) callback();
  } catch (erro) {
    console.error('❌ Erro ao adicionar meta:', erro);
    throw erro; // Re-lança erro para tratar na interface
  }
};

// Função para buscar todas as metas que ainda não foram concluídas
export const buscarMetas = () => {
  try {
    // Busca apenas metas onde concluida = 0 (não concluídas)
    const metas = bd.getAllSync(
      'SELECT * FROM metas WHERE concluida = 0 ORDER BY criadaEm DESC'
    );
    
    console.log(`📋 Encontradas ${metas.length} metas não concluídas`);
    return metas;
  } catch (erro) {
    console.error('❌ Erro ao buscar metas:', erro);
    return []; // Retorna array vazio em caso de erro
  }
};

// Função para marcar meta como concluída e sortear bichinho
export const concluirMeta = (metaId, metaTitulo) => {
  try {
    // Marca a meta como concluída (concluida = 1)
    bd.runSync('UPDATE metas SET concluida = 1 WHERE id = ?', [metaId]);
    
    // Sorteia e adiciona bichinho aleatório à coleção
    const bichinhoSorteado = sortearBichinhoAleatorio();
    adicionarBichinhoNaColecao(bichinhoSorteado, metaTitulo);
    
    console.log(`✅ Meta "${metaTitulo}" concluída! Bichinho adicionado: ${bichinhoSorteado.nome}`);
    
    return bichinhoSorteado; // Retorna o bichinho para mostrar na tela
  } catch (erro) {
    console.error('❌ Erro ao concluir meta:', erro);
    throw erro;
  }
};

// Lista completa de bichinhos disponíveis (personalizável)
const BICHINHOS_DISPONIVEIS = [
  { 
    nome: 'Dragãozinho Fofo', 
    imagem: 'dragao.png',
    raridade: 'lendário' 
  },
  { 
    nome: 'Gatinho Estudioso', 
    imagem: 'gato.png',
    raridade: 'comum' 
  },
  { 
    nome: 'Corujinha Sábia', 
    imagem: 'coruja.png',
    raridade: 'raro' 
  },
  { 
    nome: 'Peixinho Dourado', 
    imagem: 'peixe.png',
    raridade: 'comum' 
  },
  { 
    nome: 'Coelhinho Veloz', 
    imagem: 'coelho.png',
    raridade: 'comum' 
  },
  { 
    nome: 'Tartaruga Zen', 
    imagem: 'tartaruga.png',
    raridade: 'raro' 
  },
  { 
    nome: 'Fênix Determinada', 
    imagem: 'fenix.png',
    raridade: 'lendário' 
  }
];

// Função interna para sortear um bichinho aleatório
const sortearBichinhoAleatorio = () => {
  // Seleciona índice aleatório da lista
  const indiceAleatorio = Math.floor(Math.random() * BICHINHOS_DISPONIVEIS.length);
  return BICHINHOS_DISPONIVEIS[indiceAleatorio];
};

// Função interna para adicionar bichinho à coleção
const adicionarBichinhoNaColecao = (bichinho, metaTitulo) => {
  try {
    // Insere bichinho na tabela de bichinhos coletados
    bd.runSync(
      'INSERT INTO bichinhos (nome, imagem, metaTitulo) VALUES (?, ?, ?)',
      [bichinho.nome, bichinho.imagem, metaTitulo]
    );
    
    console.log(`🎉 Bichinho "${bichinho.nome}" adicionado à coleção!`);
  } catch (erro) {
    console.error('❌ Erro ao adicionar bichinho à coleção:', erro);
    throw erro;
  }
};

// Função para buscar todos os bichinhos coletados (para a Pokédex)
export const buscarBichinhos = () => {
  try {
    // Busca todos os bichinhos ordenados por data de conquista (mais recente primeiro)
    const bichinhos = bd.getAllSync(
      'SELECT * FROM bichinhos ORDER BY conquistadoEm DESC'
    );
    
    console.log(`🐾 Encontrados ${bichinhos.length} bichinhos na coleção`);
    return bichinhos;
  } catch (erro) {
    console.error('❌ Erro ao buscar bichinhos:', erro);
    return [];
  }
};

// Função para obter estatísticas gerais
export const obterEstatisticas = () => {
  try {
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
    
    return {
      metasConcluidas: metasConcluidas.total,
      metasPendentes: metasPendentes.total,
      bichinhosUnicos: bichinhosUnicos.total,
      totalBichinhos: BICHINHOS_DISPONIVEIS.length
    };
  } catch (erro) {
    console.error('❌ Erro ao obter estatísticas:', erro);
    return {
      metasConcluidas: 0,
      metasPendentes: 0,
      bichinhosUnicos: 0,
      totalBichinhos: BICHINHOS_DISPONIVEIS.length
    };
  }
};

// Função para limpar dados (útil para testes)
export const limparDados = () => {
  try {
    bd.execSync('DELETE FROM metas');
    bd.execSync('DELETE FROM bichinhos');
    console.log('🧹 Dados limpos com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao limpar dados:', erro);
  }
};
```

### 💡 Como Personalizar os Bichinhos

**1. Adicionar novos bichinhos:**
```javascript
// Edite a constante BICHINHOS_DISPONIVEIS
const BICHINHOS_DISPONIVEIS = [
  // ...bichinhos existentes...
  { 
    nome: 'Seu Novo Bichinho', 
    imagem: 'seubichinho.png',
    raridade: 'épico' 
  }
];
```

**2. Modificar sistema de raridade:**
```javascript
// Criar função para sortear baseado na raridade
const sortearComRaridade = () => {
  const chance = Math.random();
  
  if (chance < 0.05) { // 5% - Lendário
    return BICHINHOS_DISPONIVEIS.filter(b => b.raridade === 'lendário');
  } else if (chance < 0.20) { // 15% - Épico
    return BICHINHOS_DISPONIVEIS.filter(b => b.raridade === 'épico');
  } else if (chance < 0.50) { // 30% - Raro
    return BICHINHOS_DISPONIVEIS.filter(b => b.raridade === 'raro');
  } else { // 50% - Comum
    return BICHINHOS_DISPONIVEIS.filter(b => b.raridade === 'comum');
  }
};
```

### 📊 Testando o Banco de Dados

Para testar se tudo está funcionando, você pode criar metas e verificar no console:

```javascript
// Exemplo de uso (você pode testar no console)
configurarBancoDados();

// Adicionar meta de teste
adicionarMeta('Estudar JavaScript', 25);

// Buscar metas
const metas = buscarMetas();
console.log('Metas encontradas:', metas);

// Concluir meta (substitua 1 pelo ID real)
concluirMeta(1, 'Estudar JavaScript');

// Ver bichinhos coletados
const bichinhos = buscarBichinhos();
console.log('Bichinhos coletados:', bichinhos);
```

---

*Parte 2 do tutorial concluída! Agora temos um sistema completo de banco de dados.*

**🎯 O que fizemos nesta parte:**
- ✅ Sistema de banco SQLite configurado
- ✅ Tabelas para metas e bichinhos
- ✅ Funções para adicionar, buscar e concluir metas
- ✅ Sistema de sorteio de bichinhos aleatórios
- ✅ Estatísticas e personalização explicadas

**📋 Próxima parte:**
- Parte 3: Sistema de Mensagens Personalizáveis

*Digite "continue" para a próxima parte do tutorial!*

---

## 💬 Sistema de Mensagens

### 🎯 Por que um Sistema de Mensagens?

Separar as mensagens em um arquivo facilita:
- **Personalização**: Mude textos sem mexer no código principal
- **Tradução**: Adicione outros idiomas facilmente  
- **Manutenção**: Todas as mensagens em um lugar só
- **Consistência**: Textos padronizados em todo o app

### 📝 Criando o Sistema de Mensagens

Crie o arquivo `src/configuracoes/mensagens.js`:

```javascript
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

// Exemplo de uso das funções:
// obterMensagemAleatoria(mensagensNascimento.parabens)
// formatarTempo(125) // retorna "02:05"
// obterMensagemRaridade('lendário')
// personalizarMensagem('Olá {nome}!', { nome: 'João' })
```

### 🎨 Como Personalizar as Mensagens

**1. Mudando textos básicos:**
```javascript
// Em mensagensTelaInicial, mude:
titulo: 'Minha Chocadeira Pessoal 🥚',
botaoNovaMeta: '🎯 Criar Meta',
```

**2. Adicionando mais mensagens motivacionais:**
```javascript
// Em mensagensOvo.motivacao, adicione:
'🚀 Você está mandando muito bem!',
'💪 Continue assim, campeão!',
'🎵 Seu bichinho está cantarolando!'
```

**3. Personalizando por tema (ex: estudo):**
```javascript
export const temaEstudo = {
  titulo: 'StudyPets - Bichinhos dos Estudos 📚',
  motivacao: [
    '📖 Conhecimento está sendo absorvido!',
    '🧠 Seu cérebro está crescendo!',
    '🎓 Cada minuto te deixa mais sábio!'
  ]
};
```

**4. Criando sistema de níveis:**
```javascript
export const mensagensNivel = {
  iniciante: 'Você é um Chocador Iniciante! 🥚',
  intermediario: 'Chocador Experiente! 🐣',
  avancado: 'Mestre dos Bichinhos! 🏆'
};
```

---

*Parte 3 do tutorial concluída! Agora temos um sistema completo de mensagens personalizáveis.*

**🎯 O que fizemos nesta parte:**
- ✅ Sistema de mensagens organizado por categoria
- ✅ Funções utilitárias para mensagens aleatórias
- ✅ Formatação de tempo padronizada
- ✅ Sistema de personalização explicado
- ✅ Exemplos de como customizar mensagens

**📋 Próxima parte:**
- Parte 4: Componente do Ovo Chocando

*Digite "continue" para a próxima parte do tutorial!*

---

## 🥚 Componente do Ovo

### 🎨 Componente OvoChocando.js

Este componente mostra o ovo que está sendo "chocado" durante o timer:

```javascript
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

const OvoChocando = ({ meta, aoCompletar }) => {
  // Estados para controlar o timer e animação
  const [tempoRestante, setTempoRestante] = useState(meta.tempoTotal);
  const [animacaoTremer] = useState(new Animated.Value(0));
  const [estaAtivo, setEstaAtivo] = useState(false);

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
            backgroundColor: corOvo 
          }
        ]}
      >
        {/* Aqui você pode colocar uma imagem de ovo real */}
        <Text style={styles.emojiOvo}>🥚</Text>
        
        {/* Barra de progresso */}
        <View style={styles.barraProgresso}>
          <View 
            style={[
              styles.progressoPreenchido, 
              { width: `${progresso * 100}%` }
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
```

### 🎉 Componente BichinhoNascido.js

Este componente mostra o popup quando um bichinho nasce:

```javascript
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

  // Cores baseadas na raridade
  const coresRaridade = {
    comum: '#10B981',    // Verde
    raro: '#3B82F6',     // Azul  
    epico: '#8B5CF6',    // Roxo
    lendario: '#F59E0B', // Dourado
  };

  const corRaridade = coresRaridade[bichinho.raridade] || coresRaridade.comum;

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
          {bichinho.raridade === 'lendario' && (
            <View style={styles.efeitoLendario}>
              <Text style={styles.brilhos}>✨ ⭐ ✨ ⭐ ✨</Text>
            </View>
          )}

          {/* Título de nascimento */}
          <Text style={styles.titulo}>
            {obterMensagem('bichinhoNasceuTitulo')}
          </Text>

          {/* Imagem do bichinho - pode ser emoji ou imagem real */}
          <View style={[styles.containerBichinho, { backgroundColor: corRaridade + '20' }]}
          >
            {bichinho.imagem ? (
              <Image source={{ uri: bichinho.imagem }} style={styles.imagemBichinho} />
            ) : (
              <Text style={styles.emojiBichinho}>{bichinho.emoji || '🐾'}</Text>
            )}
          </View>

          {/* Nome do bichinho */}
          <Text style={styles.nome}>{bichinho.nome}</Text>

          {/* Raridade com cor especial */}
          <View style={[styles.tagRaridade, { backgroundColor: corRaridade }]}>
            <Text style={styles.textoRaridade}>
              {obterMensagemRaridade(bichinho.raridade)}
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
```

---

## 🏠 Tela Principal

### 📱 TelaInicial.js

A tela principal onde ficam os ovos sendo chocados:

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  RefreshControl 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importa componentes personalizados
import OvoChocando from '../componentes/OvoChocando';
import BichinhoNascido from '../componentes/BichinhoNascido';

// Importa funções do banco de dados
import { 
  obterMetasAtivas, 
  concluirMeta, 
  sortearBichinho, 
  registrarBichinho,
  obterEstatisticas 
} from '../dados/bancoDados';

// Importa mensagens
import { obterMensagem } from '../configuracoes/mensagens';

const TelaInicial = ({ navigation }) => {
  // Estados da tela
  const [metas, setMetas] = useState([]);
  const [bichinhoAtual, setBichinhoAtual] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [estatisticas, setEstatisticas] = useState({});
  const [carregando, setCarregando] = useState(false);

  // Carrega dados quando tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  // Função para carregar metas ativas e estatísticas
  const carregarDados = async () => {
    setCarregando(true);
    try {
      const metasAtivas = await obterMetasAtivas();
      const stats = await obterEstatisticas();
      
      setMetas(metasAtivas);
      setEstatisticas(stats);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados');
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função chamada quando meta é completada
  const aoCompletarMeta = async (meta) => {
    try {
      // Marca meta como concluída no banco
      await concluirMeta(meta.id);
      
      // Sorteia um bichinho aleatório
      const bichinhoSorteado = await sortearBichinho();
      
      // Registra o bichinho na coleção
      await registrarBichinho(bichinhoSorteado);
      
      // Mostra popup com o bichinho
      setBichinhoAtual(bichinhoSorteado);
      setMostrarPopup(true);
      
      // Atualiza lista de metas
      await carregarDados();
      
    } catch (error) {
      Alert.alert('Erro', 'Problema ao completar meta');
      console.error('Erro ao completar meta:', error);
    }
  };

  // Função para fechar popup do bichinho
  const fecharPopupBichinho = () => {
    setMostrarPopup(false);
    setBichinhoAtual(null);
  };

  // Função para navegar para nova meta
  const irParaNovaMeta = () => {
    navigation.navigate('NovaMeta');
  };

  // Função para navegar para Pokédex
  const irParaPokedex = () => {
    navigation.navigate('Pokedex');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com estatísticas */}
      <View style={styles.cabecalho}>
        <Text style={styles.tituloPrincipal}>
          {obterMensagem('boasVindas')}
        </Text>
        
        <View style={styles.estatisticas}>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.totalBichinhos || 0}</Text>
            <Text style={styles.labelEstat}>Bichinhos</Text>
          </View>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.metasConcluidas || 0}</Text>
            <Text style={styles.labelEstat}>Metas</Text>
          </View>
          <View style={styles.estatistica}>
            <Text style={styles.numeroEstat}>{estatisticas.tempoTotal || 0}h</Text>
            <Text style={styles.labelEstat}>Tempo</Text>
          </View>
        </View>
      </View>

      {/* Lista de ovos (metas ativas) */}
      <ScrollView 
        style={styles.listaOvos}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregarDados} />
        }
      >
        {metas.length === 0 ? (
          // Tela vazia - nenhuma meta ativa
          <View style={styles.telaVazia}>
            <Text style={styles.emojiVazio}>🥚</Text>
            <Text style={styles.tituloVazio}>
              {obterMensagem('nenhumaMeta')}
            </Text>
            <Text style={styles.descricaoVazia}>
              {obterMensagem('crieFirstaMeta')}
            </Text>
            <TouchableOpacity style={styles.botaoPrimeiro} onPress={irParaNovaMeta}>
              <Text style={styles.textoBotaoPrimeiro}>
                ➕ Criar primeira meta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Lista de ovos
          metas.map((meta) => (
            <OvoChocando
              key={meta.id}
              meta={meta}
              aoCompletar={aoCompletarMeta}
            />
          ))
        )}
      </ScrollView>

      {/* Botões de navegação fixos na parte inferior */}
      <View style={styles.botoesFixos}>
        <TouchableOpacity style={styles.botaoNavegacao} onPress={irParaNovaMeta}>
          <Text style={styles.textoBotaoNav}>➕ Nova Meta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoNavegacao} onPress={irParaPokedex}>
          <Text style={styles.textoBotaoNav}>📖 Coleção</Text>
        </TouchableOpacity>
      </View>

      {/* Popup do bichinho nascido */}
      <BichinhoNascido
        visivel={mostrarPopup}
        bichinho={bichinhoAtual}
        aoFechar={fecharPopupBichinho}
      />
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cabecalho: {
    backgroundColor: '#4F46E5',
    padding: 20,
    paddingTop: 10,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  estatisticas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  estatistica: {
    alignItems: 'center',
  },
  numeroEstat: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  labelEstat: {
    fontSize: 12,
    color: '#E5E7EB',
    marginTop: 2,
  },
  listaOvos: {
    flex: 1,
  },
  telaVazia: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 50,
  },
  emojiVazio: {
    fontSize: 80,
    marginBottom: 20,
  },
  tituloVazio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  descricaoVazia: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  botaoPrimeiro: {
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  textoBotaoPrimeiro: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botoesFixos: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 15,
  },
  botaoNavegacao: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBotaoNav: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaInicial;
```

---

## 📋 Tela de Nova Meta

### 🎯 TelaNovaMeta.js

Tela para criar novas metas de timer:

```javascript
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView,
  Picker
} from 'react-native';

// Importa funções do banco de dados
import { adicionarMeta } from '../dados/bancoDados';

// Importa mensagens
import { obterMensagem } from '../configuracoes/mensagens';

const TelaNovaMeta = ({ navigation }) => {
  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(25); // Padrão Pomodoro
  const [categoria, setCategoria] = useState('estudo');
  const [salvando, setSalvando] = useState(false);

  // Opções de categoria
  const categorias = [
    { valor: 'estudo', label: '📚 Estudo' },
    { valor: 'trabalho', label: '💼 Trabalho' },
    { valor: 'exercicio', label: '🏃 Exercício' },
    { valor: 'meditacao', label: '🧘 Meditação' },
    { valor: 'leitura', label: '📖 Leitura' },
    { valor: 'hobby', label: '🎨 Hobby' },
    { valor: 'outro', label: '⭐ Outro' },
  ];

  // Templates de tempo pré-definidos
  const templates = [
    { nome: 'Pomodoro', horas: 0, minutos: 25 },
    { nome: 'Foco Curto', horas: 0, minutos: 15 },
    { nome: 'Foco Médio', horas: 0, minutos: 45 },
    { nome: 'Foco Longo', horas: 1, minutos: 30 },
    { nome: 'Deep Work', horas: 2, minutos: 0 },
  ];

  // Função para aplicar template
  const aplicarTemplate = (template) => {
    setHoras(template.horas);
    setMinutos(template.minutos);
  };

  // Função para validar formulário
  const validarFormulario = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Digite um título para sua meta');
      return false;
    }

    if (horas === 0 && minutos === 0) {
      Alert.alert('Erro', 'Defina um tempo maior que zero');
      return false;
    }

    if (titulo.length < 3) {
      Alert.alert('Erro', 'O título deve ter pelo menos 3 caracteres');
      return false;
    }

    if (titulo.length > 50) {
      Alert.alert('Erro', 'O título não pode ter mais que 50 caracteres');
      return false;
    }

    return true;
  };

  // Função para salvar meta
  const salvarMeta = async () => {
    if (!validarFormulario()) return;

    setSalvando(true);
    
    try {
      // Calcula tempo total em segundos
      const tempoTotal = (horas * 3600) + (minutos * 60);
      
      // Cria objeto da meta
      const novaMeta = {
        titulo: titulo.trim(),
        categoria,
        tempoTotal,
        criadaEm: new Date().toISOString(),
        status: 'ativa'
      };

      // Salva no banco de dados
      await adicionarMeta(novaMeta);

      // Mostra sucesso e volta para tela inicial
      Alert.alert(
        'Sucesso!', 
        `Meta "${titulo}" criada! Seu ovo está pronto para chocar.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a meta');
      console.error('Erro ao salvar meta:', error);
    } finally {
      setSalvando(false);
    }
  };

  // Calcula tempo total formatado
  const tempoTotalFormatado = () => {
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas}h`;
    return `${horas}h ${minutos}min`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>🥚 Nova Meta</Text>
        <Text style={styles.subtitulo}>
          {obterMensagem('criarNovoOvo')}
        </Text>
      </View>

      {/* Formulário */}
      <View style={styles.formulario}>
        
        {/* Campo título */}
        <Text style={styles.label}>Título da Meta</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Estudar React Native"
          placeholderTextColor="#9CA3AF"
          maxLength={50}
        />
        <Text style={styles.contador}>{titulo.length}/50</Text>

        {/* Seletor de categoria */}
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.containerCategorias}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.valor}
              style={[
                styles.categoria,
                categoria === cat.valor && styles.categoriaSelecionada
              ]}
              onPress={() => setCategoria(cat.valor)}
            >
              <Text style={[
                styles.textCategoria,
                categoria === cat.valor && styles.textCategoriaSelecionada
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Templates de tempo */}
        <Text style={styles.label}>Templates Rápidos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.containerTemplates}>
            {templates.map((template, index) => (
              <TouchableOpacity
                key={index}
                style={styles.template}
                onPress={() => aplicarTemplate(template)}
              >
                <Text style={styles.nomeTemplate}>{template.nome}</Text>
                <Text style={styles.tempoTemplate}>
                  {template.horas > 0 ? `${template.horas}h ` : ''}
                  {template.minutos}min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Seletores de tempo */}
        <Text style={styles.label}>Tempo Personalizado</Text>
        <View style={styles.containerTempo}>
          
          {/* Horas */}
          <View style={styles.seletorTempo}>
            <Text style={styles.labelTempo}>Horas</Text>
            <View style={styles.controleNumero}>
              <TouchableOpacity 
                style={styles.botaoMenos}
                onPress={() => setHoras(Math.max(0, horas - 1))}
              >
                <Text style={styles.textoBotaoNumero}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.numeroTempo}>{horas}</Text>
              
              <TouchableOpacity 
                style={styles.botaoMais}
                onPress={() => setHoras(Math.min(12, horas + 1))}
              >
                <Text style={styles.textoBotaoNumero}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Minutos */}
          <View style={styles.seletorTempo}>
            <Text style={styles.labelTempo}>Minutos</Text>
            <View style={styles.controleNumero}>
              <TouchableOpacity 
                style={styles.botaoMenos}
                onPress={() => setMinutos(Math.max(0, minutos - 5))}
              >
                <Text style={styles.textoBotaoNumero}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.numeroTempo}>{minutos}</Text>
              
              <TouchableOpacity 
                style={styles.botaoMais}
                onPress={() => setMinutos(Math.min(180, minutos + 5))}
              >
                <Text style={styles.textoBotaoNumero}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Preview do tempo total */}
        <View style={styles.previewTempo}>
          <Text style={styles.labelPreview}>Tempo Total:</Text>
          <Text style={styles.tempoPreview}>{tempoTotalFormatado()}</Text>
        </View>

        {/* Botões */}
        <View style={styles.containerBotoes}>
          <TouchableOpacity 
            style={styles.botaoCancelar} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]} 
            onPress={salvarMeta}
            disabled={salvando}
          >
            <Text style={styles.textoBotaoSalvar}>
              {salvando ? '⏳ Salvando...' : '🥚 Criar Ovo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cabecalho: {
    backgroundColor: '#4F46E5',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  formulario: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1F2937',
  },
  contador: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 5,
  },
  containerCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoria: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoriaSelecionada: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  textCategoria: {
    fontSize: 14,
    color: '#6B7280',
  },
  textCategoriaSelecionada: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  containerTemplates: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 5,
  },
  template: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    minWidth: 100,
  },
  nomeTemplate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  tempoTemplate: {
    fontSize: 12,
    color: '#6B7280',
  },
  containerTempo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  seletorTempo: {
    alignItems: 'center',
  },
  labelTempo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  controleNumero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  botaoMenos: {
    backgroundColor: '#EF4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoMais: {
    backgroundColor: '#10B981',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoNumero: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  numeroTempo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 40,
    textAlign: 'center',
  },
  previewTempo: {
    backgroundColor: '#F0F9FF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#0EA5E9',
  },
  labelPreview: {
    fontSize: 14,
    color: '#0369A1',
    marginBottom: 5,
  },
  tempoPreview: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0369A1',
  },
  containerBotoes: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 15,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6B7280',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#6B7280',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoSalvar: {
    flex: 2,
    backgroundColor: '#4F46E5',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#9CA3AF',
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaNovaMeta;
```

---

## 📚 Tela Pokédex (Coleção)

### 📚 TelaPokedex.js

Tela para visualizar todos os bichinhos coletados:

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Image,
  TextInput,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importa funções do banco de dados
import { 
  obterBichinhos, 
  obterEstatisticas,
  limparBichinhos 
} from '../dados/bancoDados';

// Importa mensagens
import { obterMensagem, obterMensagemRaridade } from '../configuracoes/mensagens';

const TelaPokedex = ({ navigation }) => {
  // Estados da tela
  const [bichinhos, setBichinhos] = useState([]);
  const [bichinhoSelecionado, setBichinhoSelecionado] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [filtroRaridade, setFiltroRaridade] = useState('todas');
  const [estatisticas, setEstatisticas] = useState({});
  const [carregando, setCarregando] = useState(false);

  // Carrega dados quando tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  // Função para carregar bichinhos e estatísticas
  const carregarDados = async () => {
    setCarregando(true);
    try {
      const listaBichinhos = await obterBichinhos();
      const stats = await obterEstatisticas();
      
      setBichinhos(listaBichinhos);
      setEstatisticas(stats);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a coleção');
      console.error('Erro ao carregar bichinhos:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Filtra bichinhos baseado no texto e raridade
  const bichinhosFiltrados = bichinhos.filter(bichinho => {
    const correspondeTexto = bichinho.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                            bichinho.descricao?.toLowerCase().includes(filtro.toLowerCase());
    
    const correspondeRaridade = filtroRaridade === 'todas' || 
                               bichinho.raridade === filtroRaridade;
    
    return correspondeTexto && correspondeRaridade;
  });

  // Função para mostrar detalhes do bichinho
  const mostrarDetalhesBichinho = (bichinho) => {
    setBichinhoSelecionado(bichinho);
    setMostrarDetalhes(true);
  };

  // Função para fechar detalhes
  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
    setBichinhoSelecionado(null);
  };

  // Função para limpar coleção (debug)
  const confirmarLimpeza = () => {
    Alert.alert(
      'Limpar Coleção',
      'ATENÇÃO: Isso apagará TODOS os seus bichinhos! Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar Tudo', 
          style: 'destructive',
          onPress: async () => {
            try {
             
              await limparBichinhos();
              await carregarDados();
              Alert.alert('Sucesso', 'Coleção limpa com sucesso');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar a coleção');
            }
          }
        }
      ]
    );
  };

  // Cores baseadas na raridade
  const coresRaridade = {
    comum: '#10B981',
    raro: '#3B82F6',
    epico: '#8B5CF6',
    lendario: '#F59E0B',
  };

  // Conta bichinhos por raridade
  const contarPorRaridade = (raridade) => {
    return bichinhos.filter(b => b.raridade === raridade).length;
  };

  // Renderiza cada bichinho na lista
  const renderizarBichinho = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.cartaoBichinho,
        { borderColor: coresRaridade[item.raridade] }
      ]}
      onPress={() => mostrarDetalhesBichinho(item)}
    >
      {/* Imagem/emoji do bichinho */}
      <View style={[styles.avatarBichinho, { backgroundColor: coresRaridade[item.raridade] + '20' }]}>
        {item.imagem ? (
          <Image source={{ uri: item.imagem }} style={styles.imagemAvatar} />
        ) : (
          <Text style={styles.emojiAvatar}>{item.emoji || '🐾'}</Text>
        )}
      </View>

      {/* Info do bichinho */}
      <View style={styles.infoBichinho}>
        <Text style={styles.nomeBichinho}>{item.nome}</Text>
        <View style={[styles.tagRaridade, { backgroundColor: coresRaridade[item.raridade] }]}>
          <Text style={styles.textoRaridade}>
            {obterMensagemRaridade(item.raridade)}
          </Text>
        </View>
        <Text style={styles.dataNascimento}>
          Nasceu em {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>📖 Coleção de Bichinhos</Text>
        
        {/* Estatísticas resumidas */}
        <View style={styles.estatisticasResumo}>
          <Text style={styles.totalBichinhos}>
            {bichinhos.length} {bichinhos.length === 1 ? 'bichinho' : 'bichinhos'}
          </Text>
          
          <View style={styles.raridadeResumo}>
            <Text style={styles.textoRaridadeResumo}>
              🟢 {contarPorRaridade('comum')} 
              🔵 {contarPorRaridade('raro')} 
              🟣 {contarPorRaridade('epico')} 
              🟡 {contarPorRaridade('lendario')}
            </Text>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.containerFiltros}>
        {/* Busca por texto */}
        <TextInput
          style={styles.campoBusca}
          value={filtro}
          onChangeText={setFiltro}
          placeholder="Buscar por nome..."
          placeholderTextColor="#9CA3AF"
        />

        {/* Filtro de raridade */}
        <View style={styles.filtrosRaridade}>
          {['todas', 'comum', 'raro', 'epico', 'lendario'].map((raridade) => (
            <TouchableOpacity
              key={raridade}
              style={[
                styles.botaoFiltro,
                filtroRaridade === raridade && styles.botaoFiltroAtivo,
                raridade !== 'todas' && { borderColor: coresRaridade[raridade] }
              ]}
              onPress={() => setFiltroRaridade(raridade)}
            >
              <Text style={[
                styles.textoFiltro,
                filtroRaridade === raridade && styles.textoFiltroAtivo
              ]}>
                {raridade === 'todas' ? 'Todas' : obterMensagemRaridade(raridade)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de bichinhos */}
      {bichinhosFiltrados.length === 0 ? (
        <View style={styles.listaVazia}>
          <Text style={styles.emojiVazio}>📭</Text>
          <Text style={styles.tituloVazio}>
            {bichinhos.length === 0 ? 
              'Coleção vazia' : 
              'Nenhum bichinho encontrado'
            }
          </Text>
          <Text style={styles.descricaoVazia}>
            {bichinhos.length === 0 ? 
              'Complete metas para ganhar seus primeiros bichinhos!' :
              'Tente ajustar os filtros de busca'
            }
          </Text>
          {bichinhos.length > 0 && (
            <TouchableOpacity 
              style={styles.botaoLimparFiltros}
              onPress={() => {
                setFiltro('');
                setFiltroRaridade('todas');
              }}
            >
              <Text style={styles.textoBotaoLimpar}>Limpar Filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={bichinhosFiltrados}
          renderItem={renderizarBichinho}
          keyExtractor={(item) => item.id.toString()}
          style={styles.lista}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregarDados}
        />
      )}

      {/* Botão debug para limpar coleção */}
      {bichinhos.length > 0 && (
        <TouchableOpacity 
          style={styles.botaoDebug} 
          onPress={confirmarLimpeza}
        >
          <Text style={styles.textoBotaoDebug}>🗑️ Limpar Coleção</Text>
        </TouchableOpacity>
      )}

      {/* Modal de detalhes do bichinho */}
      <Modal visible={mostrarDetalhes} transparent animationType="slide">
        {bichinhoSelecionado && (
          <View style={styles.overlayModal}>
            <View style={[
              styles.modalDetalhes,
              { borderColor: coresRaridade[bichinhoSelecionado.raridade] }
            ]}>
              {/* Fechar modal */}
              <TouchableOpacity style={styles.botaoFecharModal} onPress={fecharDetalhes}>
                <Text style={styles.textoFechar}>✕</Text>
              </TouchableOpacity>

              {/* Imagem grande */}
              <View style={[
                styles.imagemGrandeContainer,
                { backgroundColor: coresRaridade[bichinhoSelecionado.raridade] + '20' }
              ]}>
                {bichinhoSelecionado.imagem ? (
                  <Image source={{ uri: bichinhoSelecionado.imagem }} style={styles.imagemGrande} />
                ) : (
                  <Text style={styles.emojiGrande}>{bichinhoSelecionado.emoji || '🐾'}</Text>
                )}
              </View>

              {/* Detalhes */}
              <Text style={styles.nomeDetalhes}>{bichinhoSelecionado.nome}</Text>
              
              <View style={[styles.raridadeDetalhes, { backgroundColor: coresRaridade[bichinhoSelecionado.raridade] }]}>
                <Text style={styles.textoRaridadeDetalhes}>
                  {obterMensagemRaridade(bichinhoSelecionado.raridade)}
                </Text>
              </View>

              {bichinhoSelecionado.descricao && (
                <Text style={styles.descricaoDetalhes}>{bichinhoSelecionado.descricao}</Text>
              )}

              {/* Stats */}
              <View style={styles.statsDetalhes}>
                <Text style={styles.statItem}>💖 Carinho: {bichinhoSelecionado.carinho || 50}</Text>
                <Text style={styles.statItem}>⚡ Energia: {bichinhoSelecionado.energia || 50}</Text>
                <Text style={styles.statItem}>🎯 Foco: {bichinhoSelecionado.foco || 50}</Text>
              </View>

              <Text style={styles.dataDetalhes}>
                Nasceu em {new Date(bichinhoSelecionado.criadoEm).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

// Estilos da tela (muito extenso, versão resumida)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cabecalho: {
    backgroundColor: '#4F46E5',
    padding: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  // ... mais estilos aqui ...
  // (Para economizar espaço, mostrando apenas os principais)
});

export default TelaPokedex;
```

---

## 🎨 GUIA DE ESTILIZAÇÃO

### 📱 Personalização Visual

```javascript
// src/configuracoes/estilos.js
export const cores = {
  primaria: '#4F46E5',      // Índigo principal
  secundaria: '#10B981',    // Verde
  perigo: '#EF4444',        // Vermelho
  aviso: '#F59E0B',         // Amarelo
  fundo: '#F8FAFC',         // Cinza claro
  texto: '#1F2937',         // Cinza escuro
  
  // Raridades
  comum: '#10B981',
  raro: '#3B82F6', 
  epico: '#8B5CF6',
  lendario: '#F59E0B',
};

export const tipografia = {
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: cores.texto,
  },
  corpo: {
    fontSize: 16,
    color: cores.texto,
  },
  pequeno: {
    fontSize: 14,
    color: '#6B7280',
  },
};

export const espacamentos = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const sombras = {
  pequena: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  media: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  grande: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
};
```

### 🖼️ Adicionando Imagens Personalizadas

Para substituir os emojis por imagens reais:

1. **Crie a pasta de assets:**
```
src/recursos/imagens/
├── ovos/
│   ├── ovo-comum.png
│   ├── ovo-raro.png
│   └── ovo-lendario.png
└── bichinhos/
    ├── comum/
    │   ├── gatinho.png
    │   └── cachorrinho.png
    ├── raro/
    │   ├── dragao-azul.png
    │   └── unicornio.png
    ├── epico/
    │   └── fenix.png
    └── lendario/
        └── dragao-dourado.png
```

2. **Configure o sistema de imagens:**
```javascript
// src/configuracoes/imagens.js
const imagensOvos = {
  comum: require('../recursos/imagens/ovos/ovo-comum.png'),
  raro: require('../recursos/imagens/ovos/ovo-raro.png'),
  lendario: require('../recursos/imagens/ovos/ovo-lendario.png'),
};

const imagensBichinhos = {
  comum: [
    { nome: 'Gatinho', imagem: require('../recursos/imagens/bichinhos/comum/gatinho.png') },
    { nome: 'Cachorrinho', imagem: require('../recursos/imagens/bichinhos/comum/cachorrinho.png') },
  ],
  raro: [
    { nome: 'Dragão Azul', imagem: require('../recursos/imagens/bichinhos/raro/dragao-azul.png') },
    { nome: 'Unicórnio', imagem: require('../recursos/imagens/bichinhos/raro/unicornio.png') },
  ],
  // ... mais raridades
};

export { imagensOvos, imagensBichinhos };
```

3. **Use no componente:**
```javascript
// No OvoChocando.js
import { imagensOvos } from '../configuracoes/imagens';

// Substitua o emoji por:
<Image source={imagensOvos[tipoOvo]} style={styles.imagemOvo} />
```

---

## 🚀 BUILD E PUBLICAÇÃO

### 📦 Preparando para Build

1. **Configure o app.json:**
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
      "bundleIdentifier": "com.seuusuario.pixelpettimer"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4F46E5"
      },
      "package": "com.seuusuario.pixelpettimer"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

2. **Instale dependências finais:**
```bash
# Para build production
npm install --save-dev @expo/webpack-config

# Para navegação se não instalado
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# Para SQLite se não instalado  
npx expo install expo-sqlite
```

3. **Teste antes do build:**
```bash
# Teste no simulador
npx expo start

# Teste build local
npx expo export

# Preview de produção
npx expo start --no-dev --minify
```

### 🏗️ Fazendo o Build

**Para Android (APK):**
```bash
# Build local (requer Android Studio)
npx expo run:android --variant release

# Build na nuvem (EAS Build - recomendado)
npm install -g @expo/eas-cli
eas build:configure
eas build --platform android
```

**Para iOS:**
```bash
# Build na nuvem (requer conta Apple Developer)
eas build --platform ios
```

**Para Web:**
```bash
# Build para web
npx expo export:web

# Deploy no Netlify/Vercel
npm run build
```

### 📱 Criando Ícone e Logo

Use ferramentas como:
- **Figma** (gratuito)
- **Canva** (templates prontos)
- **Icon Kitchen** (gerador de ícones Android)

**Dimensões necessárias:**
- **icon.png**: 1024x1024px
- **adaptive-icon.png**: 1024x1024px  
- **splash-icon.png**: 1284x2778px
- **favicon.png**: 48x48px

---

## 🎯 DESAFIOS EXTRAS

### 🏆 Desafio 1: Sistema de Conquistas

Crie um sistema de conquistas/achievements:

```javascript
// src/dados/conquistas.js
export const conquistas = [
  {
    id: 'primeiro_bichinho',
    nome: 'Primeiro Amigo',
    descricao: 'Ganhe seu primeiro bichinho',
    icone: '🐣',
    condicao: (stats) => stats.totalBichinhos >= 1
  },
  {
    id: 'colecionador',
    nome: 'Colecionador',
    descricao: 'Tenha 10 bichinhos',
    icone: '🏆',
    condicao: (stats) => stats.totalBichinhos >= 10
  },
  {
    id: 'focado',
    nome: 'Super Focado',
    descricao: 'Complete 50 horas de foco',
    icone: '🎯',
    condicao: (stats) => stats.tempoTotal >= 50
  },
  {
    id: 'lendario',
    nome: 'Sortudo',
    descricao: 'Ganhe um bichinho lendário',
    icone: '⭐',
    condicao: (stats, bichinhos) => bichinhos.some(b => b.raridade === 'lendario')
  }
];

// Função para verificar conquistas
export const verificarConquistas = async (usuarioId) => {
  const stats = await obterEstatisticas();
  const bichinhos = await obterBichinhos();
  
  const conquistasDesbloqueadas = conquistas.filter(conquista => 
    conquista.condicao(stats, bichinhos)
  );
  
  return conquistasDesbloqueadas;
};
```

### 🎮 Desafio 2: Sistema de Cuidados

Implemente um sistema onde os bichinhos precisam de cuidados:

```javascript
// src/dados/cuidados.js
export const calcularStatusBichinho = (bichinho) => {
  const agora = new Date();
  const nascimento = new Date(bichinho.criadoEm);
  const horasVida = (agora - nascimento) / (1000 * 60 * 60);
  
  // Status diminui com o tempo
  const carinho = Math.max(0, (bichinho.carinho || 100) - horasVida * 2);
  const energia = Math.max(0, (bichinho.energia || 100) - horasVida * 1.5);
  const felicidade = Math.max(0, (bichinho.felicidade || 100) - horasVida * 1);
  
  return { carinho, energia, felicidade };
};

export const cuidarBichinho = async (bichinhoId, tipoCuidado) => {
  const incrementos = {
    carinho: { carinho: 20, energia: 5 },
    alimentar: { energia: 25, felicidade: 10 },
    brincar: { felicidade: 30, carinho: 15 },
  };
  
  // Atualizar no banco de dados
  await atualizarStatusBichinho(bichinhoId, incrementos[tipoCuidado]);
};
```

### 🎨 Desafio 3: Temas Personalizados

Adicione suporte a temas:

```javascript
// src/configuracoes/temas.js
export const temas = {
  claro: {
    cores: {
      fundo: '#FFFFFF',
      texto: '#1F2937',
      primaria: '#4F46E5',
    }
  },
  escuro: {
    cores: {
      fundo: '#111827',
      texto: '#F9FAFB', 
      primaria: '#6366F1',
    }
  },
  natureza: {
    cores: {
      fundo: '#ECFDF5',
      texto: '#065F46',
      primaria: '#059669',
    }
  }
};

// Context para tema
export const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('claro');
  
  return (
    <TemaContext.Provider value={{ tema, setTema, cores: temas[tema].cores }}>
      {children}
    </TemaContext.Provider>
  );
};
```

### 🔧 Desafio 4: Seletor de Horário Avançado

Substitua os botões simples por um picker mais bonito:

```bash
# Instale uma biblioteca de picker
npx expo install @react-native-community/datetimepicker
```

```javascript
// Componente SeletorTempo.js
import DateTimePicker from '@react-native-community/datetimepicker';

const SeletorTempo = ({ tempo, onChange }) => {
  const [modo, setModo] = useState('time');
  const [mostrar, setMostrar] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setMostrar(true)}>
        <Text>⏰ {formatarTempo(tempo)}</Text>
      </TouchableOpacity>
      
      {mostrar && (
        <DateTimePicker
          value={new Date(tempo * 1000)}
          mode={modo}
          display="spinner"
          onChange={(event, selectedTime) => {
            setMostrar(false);
            if (selectedTime) {
              onChange(selectedTime.getTime() / 1000);
            }
          }}
        />
      )}
    </View>
  );
};
```

---

## 📚 RECURSOS ADICIONAIS

### 🔗 Links Úteis

- **Expo Documentation**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native Paper** (UI Library): https://reactnativepaper.com/
- **Lottie Animations**: https://github.com/lottie-react-native/lottie-react-native
- **Expo Icons**: https://icons.expo.fyi/

### 🎨 Recursos de Design

- **Figma Community**: Templates gratuitos
- **Unsplash**: Imagens gratuitas
- **Flaticon**: Ícones gratuitos
- **Coolors**: Paletas de cores
- **Google Fonts**: Fontes gratuitas

### 📱 Teste e Debug

```javascript
// src/configuracoes/debug.js
export const DEBUG = __DEV__;

export const log = (tag, message, data = null) => {
  if (DEBUG) {
    console.log(`[${tag}] ${message}`, data || '');
  }
};

export const logError = (tag, error) => {
  if (DEBUG) {
    console.error(`[${tag}] ERROR:`, error);
  }
};

// Uso:
import { log, logError } from '../configuracoes/debug';

log('BancoDados', 'Salvando meta', meta);
logError('BancoDados', error);
```
---

## 🎉 FINALIZAÇÃO

### ✅ Checklist Final

- [ ] Todas as telas implementadas
- [ ] Sistema de banco de dados funcionando
- [ ] Mensagens personalizadas configuradas
- [ ] Componentes visuais criados
- [ ] Navegação entre telas
- [ ] Ícone e splash screen
- [ ] Testado em diferentes dispositivos
- [ ] Build de produção gerado
- [ ] Documentação atualizada

### 🚀 Próximos Passos

1. **Teste extensivamente** em diferentes dispositivos
2. **Adicione analytics** para entender uso
3. **Implemente push notifications** para lembrar do timer
4. **Crie um sistema de backup** na nuvem
5. **Adicione sons e haptic feedback**
6. **Publique na Play Store/App Store**

### 🎯 Ideias para Versões Futuras

- **Multiplayer**: Compete com amigos
- **Eventos especiais**: Bichinhos temáticos
- **Mini-games**: Interact com os bichinhos
- **Sistema de troca**: Troque bichinhos com outros usuários
- **AR/VR**: Veja seus bichinhos em realidade aumentada

---

*Tutorial completo finalizado! 🎉*

*Este tutorial foi criado para o projeto PixelPet Timer. Para dúvidas, consulte a documentação oficial do React Native e Expo.*

---

## 📖 APÊNDICES

### A. Estrutura Final do Projeto
```
PixelPetTimer/
├── App.js
├── app.json
├── package.json
├── babel.config.js
├── TUTORIAL-COMPLETO.md
├── assets/
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── src/
    ├── telas/
    │   ├── TelaInicial.js
    │   ├── TelaNovaMeta.js
    │   └── TelaPokedex.js
    ├── componentes/
    │   ├── OvoChocando.js
    │   └── BichinhoNascido.js
    ├── dados/
    │   └── bancoDados.js
    ├── configuracoes/
    │   ├── mensagens.js
    │   ├── estilos.js
    │   ├── imagens.js
    │   └── debug.js
    └── recursos/
        └── imagens/
            ├── ovos/
            └── bichinhos/
```

### B. Comandos Úteis
```bash
# Desenvolvimento
npx expo start
npx expo start --clear

# Build
npx expo export
eas build --platform android

# Dependências
npx expo install [package]
npm install [package]

# Limpeza
npx expo start --clear
rm -rf node_modules && npm install
```

### C. Troubleshooting Comum

**Erro: SQLite não funciona**
```bash
npx expo install expo-sqlite
```

**Erro: Navegação não funciona**
```bash
npx expo install @react-navigation/native @react-navigation/stack
```

**Erro: Build falha**
- Verifique app.json
- Limpe cache: `npx expo start --clear`
- Atualize dependências

---

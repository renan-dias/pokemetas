# 🥚 Tutorial PixelPetTimer - Parte 3: Banco de Dados e Sistema de Metas

## 💾 Configurando banco de dados SQLite

Agora vamos implementar um sistema de persistência de dados robusto usando SQLite.

### 1. Por que SQLite?

- ✅ **Local**: Funciona offline
- ✅ **Rápido**: Consultas muito rápidas
- ✅ **Confiável**: Usado por milhões de apps
- ✅ **Expo**: Integração nativa com `expo-sqlite`

### 2. Estrutura do banco

Vamos criar duas tabelas principais:

| Tabela | Finalidade |
|--------|------------|
| `metas` | Armazenar metas criadas pelo usuário |
| `bichinhos` | Armazenar bichinhos coletados |

---

## 📊 Implementando o banco de dados

### 1. Configurar banco principal

**Arquivo:** `src/dados/bancoDados.js`

```javascript
import * as SQLite from 'expo-sqlite';

// Abrir conexão com banco de dados local
const bd = SQLite.openDatabaseSync('pixelPetTimer.db');

// Função principal para configurar o banco na inicialização
export const configurarBancoDados = () => {
  try {
    console.log('🔧 Configurando banco de dados...');
    
    // Tabela para armazenar as metas de tempo definidas pelo usuário
    bd.execSync(`
      CREATE TABLE IF NOT EXISTS metas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        minutos INTEGER NOT NULL,
        concluida INTEGER DEFAULT 0,
        criadaEm DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela para armazenar os bichinhos coletados
    bd.execSync(`
      CREATE TABLE IF NOT EXISTS bichinhos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        imagem TEXT NOT NULL,
        raridade TEXT NOT NULL,
        conquistadoEm DATETIME DEFAULT CURRENT_TIMESTAMP,
        metaTitulo TEXT NOT NULL
      );
    `);

    console.log('✅ Banco de dados configurado com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao configurar banco de dados:', erro);
  }
};

// 📝 OPERAÇÕES COM METAS

// Função para adicionar uma nova meta de tempo
export const adicionarMeta = async (titulo, minutos) => {
  try {
    // Validar dados de entrada
    if (!titulo || !minutos || minutos <= 0) {
      throw new Error('Título e minutos são obrigatórios e minutos deve ser maior que 0');
    }

    // Inserir nova meta na tabela
    const resultado = bd.runSync(
      'INSERT INTO metas (titulo, minutos) VALUES (?, ?)',
      [titulo, minutos]
    );
    
    console.log(`✅ Meta "${titulo}" adicionada com ID: ${resultado.lastInsertRowId}`);
    return resultado.lastInsertRowId;
  } catch (erro) {
    console.error('❌ Erro ao adicionar meta:', erro);
    throw erro;
  }
};

// Função para buscar todas as metas que ainda não foram concluídas
export const buscarMetas = () => {
  try {
    // Buscar apenas metas onde concluida = 0 (não concluídas)
    const metas = bd.getAllSync(
      'SELECT * FROM metas WHERE concluida = 0 ORDER BY criadaEm DESC'
    );
    
    console.log(`📋 Encontradas ${metas.length} metas não concluídas`);
    return metas;
  } catch (erro) {
    console.error('❌ Erro ao buscar metas:', erro);
    return [];
  }
};

// Função para buscar meta específica por ID
export const buscarMetaPorId = (id) => {
  try {
    const meta = bd.getFirstSync(
      'SELECT * FROM metas WHERE id = ?',
      [id]
    );
    
    return meta;
  } catch (erro) {
    console.error('❌ Erro ao buscar meta por ID:', erro);
    return null;
  }
};

// Função para marcar meta como concluída
export const concluirMeta = async (metaId, metaTitulo) => {
  try {
    // Marcar a meta como concluída (concluida = 1)
    bd.runSync('UPDATE metas SET concluida = 1 WHERE id = ?', [metaId]);
    
    console.log(`✅ Meta "${metaTitulo}" concluída!`);
    return true;
  } catch (erro) {
    console.error('❌ Erro ao concluir meta:', erro);
    throw erro;
  }
};

// Função para deletar uma meta
export const deletarMeta = async (metaId) => {
  try {
    bd.runSync('DELETE FROM metas WHERE id = ?', [metaId]);
    console.log(`🗑️ Meta ${metaId} deletada`);
    return true;
  } catch (erro) {
    console.error('❌ Erro ao deletar meta:', erro);
    throw erro;
  }
};

// 🐾 OPERAÇÕES COM BICHINHOS

// Lista de bichinhos disponíveis por raridade
const BICHINHOS_DISPONIVEIS = {
  comum: [
    { nome: 'Gatinho', imagem: 'gatinho.png', raridade: 'comum' },
    { nome: 'Cachorrinho', imagem: 'cachorrinho.png', raridade: 'comum' },
    { nome: 'Passarinho', imagem: 'passarinho.png', raridade: 'comum' },
    { nome: 'Coelhinho', imagem: 'coelhinho.png', raridade: 'comum' },
    { nome: 'Hamster', imagem: 'hamster.png', raridade: 'comum' },
  ],
  raro: [
    { nome: 'Unicórnio', imagem: 'unicornio.png', raridade: 'raro' },
    { nome: 'Fênix', imagem: 'phoenix.png', raridade: 'raro' },
    { nome: 'Dragão', imagem: 'dragao.png', raridade: 'raro' },
    { nome: 'Fada', imagem: 'fada.png', raridade: 'raro' },
  ],
  epico: [
    { nome: 'Leão Dourado', imagem: 'leao-dourado.png', raridade: 'epico' },
    { nome: 'Águia Real', imagem: 'aguia-real.png', raridade: 'epico' },
    { nome: 'Lobo Lunar', imagem: 'lobo-lunar.png', raridade: 'epico' },
  ],
  lendario: [
    { nome: 'Gato Cósmico', imagem: 'cosmic-cat.png', raridade: 'lendario' },
    { nome: 'Pássaro Estelar', imagem: 'stellar-bird.png', raridade: 'lendario' },
    { nome: 'Guardião do Tempo', imagem: 'time-guardian.png', raridade: 'lendario' },
  ]
};

// Função para sortear bichinho baseado na duração da meta
export const sortearBichinho = (duracaoMinutos) => {
  // Determinar raridade baseada na duração
  let raridade;
  if (duracaoMinutos >= 120) {
    raridade = 'lendario';  // 2+ horas = lendário
  } else if (duracaoMinutos >= 60) {
    raridade = 'epico';     // 1+ hora = épico
  } else if (duracaoMinutos >= 30) {
    raridade = 'raro';      // 30+ min = raro
  } else {
    raridade = 'comum';     // Menos de 30 min = comum
  }

  // Adicionar elemento de sorte (pequena chance de raridade maior)
  const sorte = Math.random();
  if (sorte < 0.02 && raridade !== 'lendario') {
    // 2% de chance de ganhar raridade lendária
    raridade = 'lendario';
  } else if (sorte < 0.08 && raridade === 'comum') {
    // 8% de chance de comum virar épico
    raridade = 'epico';
  } else if (sorte < 0.20 && raridade === 'comum') {
    // 20% de chance de comum virar raro
    raridade = 'raro';
  }

  // Selecionar bichinho aleatório da raridade determinada
  const bichinhosRaridade = BICHINHOS_DISPONIVEIS[raridade];
  const indiceAleatorio = Math.floor(Math.random() * bichinhosRaridade.length);
  const bichinhoSorteado = bichinhosRaridade[indiceAleatorio];

  console.log(`🎲 Bichinho sorteado: ${bichinhoSorteado.nome} (${raridade})`);
  return bichinhoSorteado;
};

// Função para adicionar bichinho à coleção
export const adicionarBichinho = async (bichinho, metaTitulo) => {
  try {
    // Inserir bichinho na tabela
    const resultado = bd.runSync(
      'INSERT INTO bichinhos (nome, imagem, raridade, metaTitulo) VALUES (?, ?, ?, ?)',
      [bichinho.nome, bichinho.imagem, bichinho.raridade, metaTitulo]
    );
    
    console.log(`🎉 Bichinho "${bichinho.nome}" adicionado à coleção!`);
    return resultado.lastInsertRowId;
  } catch (erro) {
    console.error('❌ Erro ao adicionar bichinho:', erro);
    throw erro;
  }
};

// Função para buscar todos os bichinhos coletados
export const buscarBichinhos = () => {
  try {
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

// 📊 ESTATÍSTICAS

// Função para obter estatísticas gerais
export const obterEstatisticas = () => {
  try {
    // Contar metas concluídas
    const metasConcluidas = bd.getFirstSync(
      'SELECT COUNT(*) as total FROM metas WHERE concluida = 1'
    );
    
    // Contar metas pendentes
    const metasPendentes = bd.getFirstSync(
      'SELECT COUNT(*) as total FROM metas WHERE concluida = 0'
    );
    
    // Contar bichinhos únicos
    const bichinhosUnicos = bd.getFirstSync(
      'SELECT COUNT(DISTINCT nome) as total FROM bichinhos'
    );
    
    // Calcular total de bichinhos disponíveis
    const totalDisponiveis = Object.values(BICHINHOS_DISPONIVEIS)
      .reduce((total, raridade) => total + raridade.length, 0);
    
    return {
      metasConcluidas: metasConcluidas.total,
      metasPendentes: metasPendentes.total,
      bichinhosUnicos: bichinhosUnicos.total,
      totalBichinhos: totalDisponiveis,
    };
  } catch (erro) {
    console.error('❌ Erro ao obter estatísticas:', erro);
    return {
      metasConcluidas: 0,
      metasPendentes: 0,
      bichinhosUnicos: 0,
      totalBichinhos: 0,
    };
  }
};

// 🧹 UTILITÁRIOS

// Função para limpar dados (útil para testes e desenvolvimento)
export const limparDados = () => {
  try {
    bd.execSync('DELETE FROM metas');
    bd.execSync('DELETE FROM bichinhos');
    console.log('🧹 Dados limpos com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao limpar dados:', erro);
  }
};

// Função para obter todas as raridades disponíveis
export const obterRaridadesDisponiveis = () => {
  return Object.keys(BICHINHOS_DISPONIVEIS);
};

// Função para obter bichinhos por raridade
export const obterBichinhosPorRaridade = (raridade) => {
  return BICHINHOS_DISPONIVEIS[raridade] || [];
};
```

---

## 🎯 Implementando tela "Nova Meta"

Agora vamos fazer a tela de criação de metas funcionar completamente.

### 1. Tela Nova Meta completa

**Arquivo:** `src/telas/TelaNovaMeta.js`

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';

// Importar estilos e banco de dados
import { cores, espacamentos, estilosComuns } from '../configuracoes/estilos';
import { adicionarMeta } from '../dados/bancoDados';

const TelaNovaMeta = ({ navigation }) => {
  // Estados para controlar o formulário
  const [titulo, setTitulo] = useState('');
  const [minutos, setMinutos] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Validar se formulário está preenchido corretamente
  const formularioValido = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', '📝 Por favor, digite um título para sua meta!');
      return false;
    }
    
    const minutosNum = parseInt(minutos);
    if (!minutos || minutosNum <= 0) {
      Alert.alert('Erro', '⏰ Por favor, digite uma duração válida maior que 0!');
      return false;
    }
    
    if (minutosNum > 480) { // 8 horas máximo
      Alert.alert('Erro', '⚡ Duração máxima é de 480 minutos (8 horas)!');
      return false;
    }
    
    return true;
  };

  // Função para salvar meta no banco
  const salvarMeta = async () => {
    // Validar formulário
    if (!formularioValido()) return;
    
    try {
      setSalvando(true);
      Keyboard.dismiss(); // Fechar teclado
      
      // Salvar no banco de dados
      const metaId = await adicionarMeta(titulo.trim(), parseInt(minutos));
      
      // Mostrar sucesso
      Alert.alert(
        'Sucesso! 🎉',
        `Meta "${titulo}" criada com sucesso!\n\nVolte à tela inicial para começar a chocar.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a meta. Tente novamente.');
      console.error('Erro ao salvar meta:', erro);
    } finally {
      setSalvando(false);
    }
  };

  // Função para definir duração rápida
  const definirDuracaoRapida = (min) => {
    setMinutos(min.toString());
  };

  return (
    <ScrollView style={estilosComuns.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={estilosComuns.titulo}>🥚 Criar Nova Meta</Text>
        <Text style={estilosComuns.subtitulo}>
          Defina sua meta de foco para chocar um ovo especial!
        </Text>
        <Text style={styles.explicacao}>
          Quando você completar esta meta, um bichinho{'\n'}
          aleatório nascerá do seu ovo! 🐾
        </Text>
      </View>

      {/* Formulário */}
      <View style={estilosComuns.card}>
        {/* Campo Título */}
        <Text style={styles.label}>📝 O que você vai fazer?</Text>
        <TextInput
          style={[estilosComuns.input, styles.input]}
          placeholder="Ex: Estudar React Native"
          placeholderTextColor={cores.cinzaMedio}
          value={titulo}
          onChangeText={setTitulo}
          maxLength={100}
        />

        {/* Campo Duração */}
        <Text style={[styles.label, { marginTop: espacamentos.lg }]}>
          ⏰ Por quantos minutos?
        </Text>
        <TextInput
          style={[estilosComuns.input, styles.input]}
          placeholder="Ex: 25"
          placeholderTextColor={cores.cinzaMedio}
          value={minutos}
          onChangeText={setMinutos}
          keyboardType="numeric"
          maxLength={3}
        />

        {/* Botões de duração rápida */}
        <Text style={[styles.label, { marginTop: espacamentos.lg }]}>
          ⚡ Ou escolha uma duração rápida:
        </Text>
        <View style={styles.botoesRapidos}>
          {[15, 25, 30, 45, 60, 90].map((min) => (
            <TouchableOpacity
              key={min}
              style={[
                styles.botaoRapido,
                minutos === min.toString() && styles.botaoRapidoSelecionado
              ]}
              onPress={() => definirDuracaoRapida(min)}
            >
              <Text style={[
                styles.textoBotaoRapido,
                minutos === min.toString() && styles.textoBotaoRapidoSelecionado
              ]}>
                {min}min
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dicas de tempo */}
      <View style={estilosComuns.card}>
        <Text style={styles.dicasTitulo}>💡 Dicas de Tempo:</Text>
        <Text style={styles.dicas}>
          • 15-25 min: Tarefas rápidas ou técnica Pomodoro{'\n'}
          • 30-45 min: Estudo focado ou leitura{'\n'}
          • 60-90 min: Projetos longos ou trabalho profundo{'\n'}
          • 120+ min: Sessões épicas (bichinhos lendários!)
        </Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.botoesAcao}>
        <TouchableOpacity
          style={estilosComuns.botaoPrimario}
          onPress={salvarMeta}
          disabled={salvando}
        >
          <Text style={estilosComuns.textoBotao}>
            {salvando ? 'Salvando...' : '🥚 Começar a Chocar!'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilosComuns.botaoSecundario, { marginTop: espacamentos.sm }]}
          onPress={() => navigation.goBack()}
          disabled={salvando}
        >
          <Text style={[estilosComuns.textoBotao, { color: cores.primaria }]}>
            ❌ Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos específicos desta tela
const styles = StyleSheet.create({
  cabecalho: {
    paddingVertical: espacamentos.lg,
    alignItems: 'center',
  },
  
  explicacao: {
    fontSize: 14,
    color: cores.cinzaMedio,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: espacamentos.sm,
  },
  
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    marginBottom: espacamentos.sm,
  },
  
  input: {
    marginBottom: espacamentos.md,
  },
  
  botoesRapidos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamentos.sm,
    marginTop: espacamentos.sm,
  },
  
  botaoRapido: {
    backgroundColor: cores.cinzaClaro,
    paddingVertical: espacamentos.sm,
    paddingHorizontal: espacamentos.md,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  
  botaoRapidoSelecionado: {
    backgroundColor: cores.primaria,
  },
  
  textoBotaoRapido: {
    fontSize: 14,
    color: cores.cinzaEscuro,
    fontWeight: '500',
  },
  
  textoBotaoRapidoSelecionado: {
    color: cores.branco,
  },
  
  dicasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    marginBottom: espacamentos.sm,
  },
  
  dicas: {
    fontSize: 14,
    color: cores.cinzaMedio,
    lineHeight: 20,
  },
  
  botoesAcao: {
    paddingVertical: espacamentos.lg,
  },
});

export default TelaNovaMeta;
```

---

## 🔄 Conectando tela inicial com banco

Agora vamos atualizar a tela inicial para usar dados reais do banco.

### 1. Atualizar TelaInicial

**Arquivo:** `src/telas/TelaInicial.js` (atualizações principais)

```javascript
// Adicionar importações do banco
import { buscarMetas, deletarMeta } from '../dados/bancoDados';

// Dentro do componente TelaInicial, atualizar a função carregarMetas:

const carregarMetas = async () => {
  try {
    setCarregando(true);
    
    // Buscar metas reais do banco de dados
    const metasReais = buscarMetas();
    setMetas(metasReais);
    
  } catch (erro) {
    Alert.alert('Erro', 'Não foi possível carregar as metas');
    console.error('Erro ao carregar metas:', erro);
  } finally {
    setCarregando(false);
  }
};

// Adicionar função para deletar meta
const confirmarDeletarMeta = (meta) => {
  Alert.alert(
    'Deletar Meta',
    `Tem certeza que deseja deletar a meta "${meta.titulo}"?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: () => deletarMetaConfirmada(meta.id),
      },
    ]
  );
};

const deletarMetaConfirmada = async (metaId) => {
  try {
    await deletarMeta(metaId);
    carregarMetas(); // Recarregar lista
    Alert.alert('Sucesso', 'Meta deletada com sucesso!');
  } catch (erro) {
    Alert.alert('Erro', 'Não foi possível deletar a meta');
  }
};

// Atualizar useEffect para recarregar quando voltar de outras telas
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    carregarMetas();
  });

  return unsubscribe;
}, [navigation]);
```

---

## 🧪 Testando o sistema completo

### 1. Testar criação de metas

```bash
# Iniciar o app
npx expo start

# Teste este fluxo:
# 1. Abrir app
# 2. Tocar "Nova Meta"
# 3. Preencher: "Estudar React" / "30" minutos
# 4. Salvar
# 5. Voltar à tela inicial
# 6. Ver a meta aparecer na lista
```

### 2. Verificar banco no console

```javascript
// Você deve ver no console:
// ✅ Banco de dados configurado com sucesso!
// ✅ Meta "Estudar React" adicionada com ID: 1
// 📋 Encontradas 1 metas não concluídas
```

---

## 🎯 Objetivos da Parte 3

Nesta parte, você deve ter:

- ✅ **Banco SQLite** funcionando e configurado
- ✅ **Sistema de metas** completo (criar, ler, deletar)
- ✅ **Tela Nova Meta** totalmente funcional
- ✅ **Tela Inicial** conectada ao banco real
- ✅ **Sistema de sorteio** de bichinhos por raridade

---

## 🔍 Como verificar se funcionou

1. **Criar meta**: Formulário deve salvar e voltar à tela inicial
2. **Ver meta na lista**: Meta deve aparecer com título e duração
3. **Dados persistem**: Fechar e abrir app, dados devem estar lá
4. **Console limpo**: Não deve ter erros no console

---

## 🐛 Problemas comuns

### ❌ "expo-sqlite not found"
```bash
# Reinstalar dependência
npx expo install expo-sqlite
```

### ❌ Banco não persiste dados
```bash
# Limpar cache e reiniciar
npx expo start --clear
```

### ❌ Erro ao salvar meta
- Verificar se todos os campos estão preenchidos
- Verificar console para mensagens de erro específicas

---

## ➡️ Próxima parte

Na **Parte 4**, vamos:
- 🥚 Criar componente do ovo com timer visual
- ⏱️ Implementar countdown em tempo real
- 🎬 Adicionar animações de "tremor" quando perto do fim
- 🎉 Integrar sistema de conclusão de metas

---

**🎉 Parabéns! Você concluiu a Parte 3 do tutorial.**

*Agora você tem um sistema de banco de dados robusto e funcional! Quando estiver pronto, peça a **Parte 4** para continuar!*

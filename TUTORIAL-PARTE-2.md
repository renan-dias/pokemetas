# 🥚 Tutorial PixelPetTimer - Parte 2: Estrutura, Navegação e Estilos

## 📁 Organizando a estrutura do projeto

Primeiro, vamos criar uma estrutura profissional e escalável para nosso app.

### 1. Criar pastas principais

```bash
# Dentro da pasta do projeto, criar:
mkdir src
mkdir src/telas
mkdir src/componentes
mkdir src/dados
mkdir src/configuracoes
mkdir src/recursos
mkdir src/recursos/imagens
```

### 2. Estrutura final esperada

```
PixelPetTimer/
├── 📱 App.js
├── 📂 src/
│   ├── 🏠 telas/           # Telas do app
│   ├── 🧩 componentes/     # Componentes reutilizáveis
│   ├── 💾 dados/           # Banco de dados e lógica
│   ├── ⚙️ configuracoes/   # Estilos, cores, mensagens
│   └── 🎨 recursos/        # Imagens e assets
└── 📄 package.json
```

### 3. Por que essa estrutura?

| Pasta | Finalidade | Exemplo |
|-------|------------|---------|
| `telas/` | Telas principais do app | TelaInicial, TelaPokedex |
| `componentes/` | Componentes reutilizáveis | OvoChocando, BotaoCustom |
| `dados/` | Lógica de banco e APIs | bancoDados.js, sorteio.js |
| `configuracoes/` | Configurações globais | estilos.js, cores.js |
| `recursos/` | Assets visuais | imagens, ícones, sons |

---

## 🎨 Sistema de cores e estilos

Vamos criar um sistema de design consistente para todo o app.

### 1. Criar arquivo de estilos

**Arquivo:** `src/configuracoes/estilos.js`

```javascript
// Sistema de cores e estilos do PixelPetTimer
import { Platform } from 'react-native';

// 🎨 Paleta de cores principal
export const cores = {
  // Cores principais
  primaria: '#4F46E5',      // Roxo vibrante
  secundaria: '#10B981',    // Verde sucesso
  terciaria: '#F59E0B',     // Dourado
  
  // Tons neutros
  branco: '#FFFFFF',
  cinzaClaro: '#F3F4F6',
  cinzaMedio: '#6B7280',
  cinzaEscuro: '#374151',
  preto: '#111827',
  
  // Estados e feedback
  sucesso: '#10B981',
  aviso: '#F59E0B',
  erro: '#EF4444',
  info: '#3B82F6',
  
  // Raridades dos bichinhos
  comum: '#6B7280',      // Cinza
  raro: '#3B82F6',       // Azul
  epico: '#8B5CF6',      // Roxo
  lendario: '#F59E0B',   // Dourado
  
  // Fundos especiais
  fundoApp: '#F9FAFB',
  fundoCard: '#FFFFFF',
  fundoOvo: '#FEF3C7',
};

// 📝 Tipografia padronizada
export const tipografia = {
  tamanhos: {
    pequeno: 12,
    normal: 16,
    medio: 18,
    grande: 24,
    gigante: 32,
  },
  pesos: {
    normal: '400',
    medio: '500',
    negrito: '700',
    extra: '800',
  },
  familias: Platform.select({
    ios: {
      regular: 'System',
      titulo: 'System',
    },
    android: {
      regular: 'Roboto',
      titulo: 'Roboto',
    },
  }),
};

// 📏 Espaçamentos consistentes
export const espacamentos = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 🔘 Bordas e raios
export const bordas = {
  raio: {
    pequeno: 8,
    medio: 12,
    grande: 16,
    redondo: 50,
  },
  largura: {
    fina: 1,
    media: 2,
    grossa: 3,
  },
};

// ✨ Sombras elegantes
export const sombras = {
  leve: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  media: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  forte: {
    shadowColor: cores.preto,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// 🧩 Componentes base reutilizáveis
export const estilosComuns = {
  // Container principal
  container: {
    flex: 1,
    backgroundColor: cores.fundoApp,
    paddingHorizontal: espacamentos.md,
  },
  
  // Cards elegantes
  card: {
    backgroundColor: cores.fundoCard,
    borderRadius: bordas.raio.medio,
    padding: espacamentos.md,
    marginVertical: espacamentos.sm,
    ...sombras.leve,
  },
  
  // Botões principais
  botaoPrimario: {
    backgroundColor: cores.primaria,
    borderRadius: bordas.raio.grande,
    paddingVertical: espacamentos.md,
    paddingHorizontal: espacamentos.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombras.media,
  },
  
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: bordas.largura.media,
    borderColor: cores.primaria,
    borderRadius: bordas.raio.grande,
    paddingVertical: espacamentos.md,
    paddingHorizontal: espacamentos.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Textos padronizados
  titulo: {
    fontSize: tipografia.tamanhos.grande,
    fontWeight: tipografia.pesos.negrito,
    color: cores.cinzaEscuro,
    textAlign: 'center',
    marginBottom: espacamentos.md,
  },
  
  subtitulo: {
    fontSize: tipografia.tamanhos.medio,
    fontWeight: tipografia.pesos.medio,
    color: cores.cinzaMedio,
    textAlign: 'center',
    marginBottom: espacamentos.sm,
  },
  
  textoBotao: {
    fontSize: tipografia.tamanhos.normal,
    fontWeight: tipografia.pesos.negrito,
    color: cores.branco,
  },
  
  // Inputs elegantes
  input: {
    borderWidth: bordas.largura.fina,
    borderColor: cores.cinzaClaro,
    borderRadius: bordas.raio.medio,
    paddingHorizontal: espacamentos.md,
    paddingVertical: espacamentos.sm,
    fontSize: tipografia.tamanhos.normal,
    backgroundColor: cores.branco,
    color: cores.cinzaEscuro,
  },
};
```

### 2. Por que organizar estilos assim?

- ✅ **Consistência visual** em todo o app
- ✅ **Fácil manutenção** - mude uma cor e afeta tudo
- ✅ **Escalabilidade** - adicione novos componentes facilmente
- ✅ **Design System** profissional

---

## 🧭 Configurando navegação

Agora vamos configurar a navegação entre as telas do app.

### 1. Configurar App.js principal

**Arquivo:** `App.js`

```javascript
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar telas (vamos criar nas próximas etapas)
import TelaInicial from './src/telas/TelaInicial';
import TelaNovaMeta from './src/telas/TelaNovaMeta';
import TelaPokedex from './src/telas/TelaPokedex';
import TelaConfiguracoes from './src/telas/TelaConfiguracoes';

// Importar configuração do banco (vamos criar depois)
import { configurarBancoDados } from './src/dados/bancoDados';

// Criar o navegador
const Stack = createNativeStackNavigator();

export default function App() {
  // Configurar banco quando app inicializa
  useEffect(() => {
    configurarBancoDados();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { 
            backgroundColor: '#4F46E5' 
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { 
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        {/* Tela principal */}
        <Stack.Screen
          name="Inicial"
          component={TelaInicial}
          options={{ title: '🥚 Chocadeira de Pets' }}
        />
        
        {/* Tela para criar metas */}
        <Stack.Screen
          name="NovaMeta"
          component={TelaNovaMeta}
          options={{ title: '⏰ Nova Meta' }}
        />
        
        {/* Tela da coleção */}
        <Stack.Screen
          name="Pokedex"
          component={TelaPokedex}
          options={{ title: '📚 Minha Coleção' }}
        />
        
        {/* Tela de configurações */}
        <Stack.Screen
          name="Configuracoes"
          component={TelaConfiguracoes}
          options={{ title: '⚙️ Configurações' }}
        />
      </Stack.Navigator>
      
      {/* Barra de status clara */}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
```

---

## 🏠 Primeira tela: TelaInicial

Vamos criar nossa primeira tela funcional.

### 1. Tela inicial básica

**Arquivo:** `src/telas/TelaInicial.js`

```javascript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

// Importar nossos estilos
import { cores, espacamentos, estilosComuns } from '../configuracoes/estilos';

const TelaInicial = ({ navigation }) => {
  // Estados para controlar dados
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar dados quando tela abre
  useEffect(() => {
    carregarMetas();
  }, []);

  // Função para carregar metas (implementaremos depois)
  const carregarMetas = async () => {
    try {
      // Por enquanto, dados fictícios
      const metasFicticias = [
        { id: 1, titulo: 'Estudar React Native', minutos: 30 },
        { id: 2, titulo: 'Fazer exercícios', minutos: 45 },
      ];
      
      setMetas(metasFicticias);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar as metas');
    } finally {
      setCarregando(false);
    }
  };

  // Navegar para criar nova meta
  const irParaNovaMeta = () => {
    navigation.navigate('NovaMeta');
  };

  // Navegar para coleção
  const irParaPokedex = () => {
    navigation.navigate('Pokedex');
  };

  // Navegar para configurações
  const irParaConfiguracoes = () => {
    navigation.navigate('Configuracoes');
  };

  return (
    <View style={estilosComuns.container}>
      {/* Cabeçalho com título */}
      <View style={styles.cabecalho}>
        <Text style={estilosComuns.titulo}>
          Chocadeira de Bichinhos 🥚
        </Text>
        <Text style={estilosComuns.subtitulo}>
          Escolha uma meta para começar a chocar!
        </Text>
      </View>

      {/* Lista de metas */}
      <ScrollView style={styles.listaMetas}>
        {metas.length === 0 ? (
          // Estado vazio
          <View style={estilosComuns.card}>
            <Text style={styles.textoVazio}>
              🌟 Nenhuma meta criada ainda!
            </Text>
            <Text style={styles.descricaoVazia}>
              Crie uma meta para começar a chocar ovos{'\n'}
              e ganhar bichinhos incríveis!
            </Text>
            <TouchableOpacity
              style={estilosComuns.botaoPrimario}
              onPress={irParaNovaMeta}
            >
              <Text style={estilosComuns.textoBotao}>
                🥚 Criar Primeira Meta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Lista com metas
          metas.map((meta) => (
            <TouchableOpacity
              key={meta.id}
              style={[estilosComuns.card, styles.cardMeta]}
              onPress={() => Alert.alert('Meta', `Iniciar: ${meta.titulo}`)}
            >
              <Text style={styles.tituloMeta}>{meta.titulo}</Text>
              <Text style={styles.tempoMeta}>⏰ {meta.minutos} minutos</Text>
              <View style={styles.statusOvo}>
                <Text style={styles.emojiOvo}>🥚</Text>
                <Text style={styles.textoStatus}>Pronto para chocar!</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botões de navegação fixos */}
      <View style={styles.botoesFixos}>
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaNovaMeta}
        >
          <Text style={styles.textoBotaoNav}>➕ Nova Meta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaPokedex}
        >
          <Text style={styles.textoBotaoNav}>📚 Coleção</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botaoNavegacao}
          onPress={irParaConfiguracoes}
        >
          <Text style={styles.textoBotaoNav}>⚙️ Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos específicos desta tela
const styles = StyleSheet.create({
  cabecalho: {
    paddingVertical: espacamentos.lg,
    alignItems: 'center',
  },
  
  listaMetas: {
    flex: 1,
    marginVertical: espacamentos.md,
  },
  
  textoVazio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    textAlign: 'center',
    marginBottom: espacamentos.sm,
  },
  
  descricaoVazia: {
    fontSize: 16,
    color: cores.cinzaMedio,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: espacamentos.lg,
  },
  
  cardMeta: {
    borderLeftWidth: 4,
    borderLeftColor: cores.primaria,
  },
  
  tituloMeta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.cinzaEscuro,
    marginBottom: espacamentos.xs,
  },
  
  tempoMeta: {
    fontSize: 14,
    color: cores.cinzaMedio,
    marginBottom: espacamentos.sm,
  },
  
  statusOvo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: espacamentos.sm,
    backgroundColor: cores.fundoOvo,
    borderRadius: 8,
  },
  
  emojiOvo: {
    fontSize: 24,
    marginRight: espacamentos.sm,
  },
  
  textoStatus: {
    fontSize: 16,
    color: cores.cinzaEscuro,
    fontWeight: '500',
  },
  
  botoesFixos: {
    flexDirection: 'row',
    paddingVertical: espacamentos.md,
    paddingTop: espacamentos.lg,
    borderTopWidth: 1,
    borderTopColor: cores.cinzaClaro,
    gap: espacamentos.sm,
  },
  
  botaoNavegacao: {
    flex: 1,
    backgroundColor: cores.primaria,
    paddingVertical: espacamentos.md,
    borderRadius: 25,
    alignItems: 'center',
  },
  
  textoBotaoNav: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TelaInicial;
```

---

## 🎯 Testando o progresso

### 1. Criar telas temporárias

Para testar a navegação, vamos criar as outras telas temporariamente:

**Arquivo:** `src/telas/TelaNovaMeta.js`
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { estilosComuns } from '../configuracoes/estilos';

const TelaNovaMeta = () => {
  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>🥚 Nova Meta</Text>
      <Text style={estilosComuns.subtitulo}>Em construção...</Text>
    </View>
  );
};

export default TelaNovaMeta;
```

**Arquivo:** `src/telas/TelaPokedex.js`
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { estilosComuns } from '../configuracoes/estilos';

const TelaPokedex = () => {
  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>📚 Minha Coleção</Text>
      <Text style={estilosComuns.subtitulo}>Em construção...</Text>
    </View>
  );
};

export default TelaPokedex;
```

**Arquivo:** `src/telas/TelaConfiguracoes.js`
```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { estilosComuns } from '../configuracoes/estilos';

const TelaConfiguracoes = () => {
  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>⚙️ Configurações</Text>
      <Text style={estilosComuns.subtitulo}>Em construção...</Text>
    </View>
  );
};

export default TelaConfiguracoes;
```

### 2. Criar função temporária do banco

**Arquivo:** `src/dados/bancoDados.js`
```javascript
// Configuração temporária do banco de dados
export const configurarBancoDados = () => {
  console.log('✅ Banco de dados configurado com sucesso!');
};
```

---

## 🧪 Testar o app

```bash
# Iniciar o projeto
npx expo start

# Você deve ver:
# ✅ Tela inicial com título elegante
# ✅ Navegação funcionando entre todas as telas
# ✅ Estilos consistentes e profissionais
# ✅ Botões de navegação na parte inferior
```

---

## 🎯 Objetivos da Parte 2

Nesta parte, você deve ter:

- ✅ **Estrutura organizada** em pastas bem definidas
- ✅ **Sistema de estilos** profissional e reutilizável
- ✅ **Navegação funcional** entre 4 telas
- ✅ **Tela inicial** com interface elegante
- ✅ **Fundação sólida** para as próximas funcionalidades

---

## 🔄 Comandos para testar

```bash
# Se der erro, limpar cache
npx expo start --clear

# Ver estrutura de pastas
ls -la src/

# Verificar se navegação funciona
# Toque nos botões: Nova Meta, Coleção, Config
```

---

## ➡️ Próxima parte

Na **Parte 3**, vamos:
- 💾 Configurar banco de dados SQLite real
- 📝 Implementar sistema de metas completo
- 🔄 Criar funções CRUD (Create, Read, Update, Delete)
- 🎯 Fazer a tela "Nova Meta" funcionar completamente

---

**🎉 Parabéns! Você concluiu a Parte 2 do tutorial.**

*Quando estiver pronto, peça a **Parte 3** para continuar!*

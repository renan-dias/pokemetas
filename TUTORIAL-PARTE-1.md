# 🥚 Tutorial PixelPetTimer - Parte 1: Introdução e Setup

## 📖 O que vamos construir

Neste tutorial, você aprenderá a criar o **PixelPetTimer** - um app de produtividade gamificado onde:

- 🎯 **Crie metas** com duração personalizada
- 🥚 **Choque ovos** durante o timer da tarefa
- 🐾 **Colecione bichinhos** ao completar as metas
- 📚 **Monte sua Pokédex** de bichinhos raros

### 🎮 Como funciona

1. Usuário cria uma meta (ex: "Estudar React - 30 min")
2. Um ovo aparece na tela com countdown
3. Quando termina, um bichinho aleatório "nasce"
4. Bichinhos têm raridades baseadas na duração da meta

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React Native** | Latest | Framework mobile |
| **Expo** | SDK 49+ | Desenvolvimento e build |
| **SQLite** | expo-sqlite | Banco de dados local |
| **React Navigation** | v6 | Navegação entre telas |

---

## 📋 Pré-requisitos

### ✅ Conhecimentos necessários:
- JavaScript ES6+ básico
- React básico (componentes, hooks)
- Conceitos de mobile (opcional)

### 💻 Ferramentas necessárias:
- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** instalado globalmente
- **Smartphone** com Expo Go OU **Emulador Android/iOS**

---

## 🚀 Configuração do Ambiente

### 1. Instalar Node.js
```bash
# Verificar se Node está instalado
node --version
npm --version

# Se não estiver instalado, baixe em: https://nodejs.org/
```

### 2. Instalar Expo CLI
```bash
# Instalar Expo CLI globalmente
npm install -g @expo/cli

# Verificar instalação
expo --version
```

### 3. Criar o projeto
```bash
# Criar novo projeto Expo
npx create-expo-app PixelPetTimer

# Entrar na pasta
cd PixelPetTimer

# Iniciar o projeto
npx expo start
```

### 4. Testar no dispositivo
```bash
# No terminal, você verá um QR code
# Opções para testar:

# 📱 Celular: Baixe "Expo Go" e escaneie o QR
# 💻 Navegador: Pressione 'w'
# 📲 Android: Pressione 'a' (precisa do emulador)
# 🍎 iOS: Pressione 'i' (precisa do Xcode)
```

---

## 📁 Estrutura inicial do projeto

Após criar o projeto, você terá:

```
PixelPetTimer/
├── 📱 App.js              # Componente principal
├── 📄 app.json            # Configurações do Expo
├── 📄 package.json        # Dependências
├── 🖼️ assets/             # Ícones e splash screen
├── 📄 babel.config.js     # Configuração Babel
└── 📄 .gitignore         # Arquivos ignorados pelo Git
```

---

## 🧹 Limpeza inicial

### 1. Simplificar App.js
Substitua o conteúdo de `App.js` por:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥚 PixelPetTimer</Text>
      <Text style={styles.subtitle}>Em construção...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
  },
});
```

### 2. Testar se funciona
```bash
# Se o servidor não estiver rodando:
npx expo start

# O app deve mostrar "PixelPetTimer - Em construção..."
```

---

## 📦 Instalar dependências necessárias

```bash
# Navegação
npm install @react-navigation/native @react-navigation/native-stack

# Dependências específicas do Expo
npx expo install react-native-screens react-native-safe-area-context

# Banco de dados
npx expo install expo-sqlite

# Verificar se instalou corretamente
npm list
```

---

## 🎯 Objetivos da Parte 1

Nesta primeira parte, você deve ter:

- ✅ **Ambiente configurado** com Expo funcionando
- ✅ **Projeto criado** e rodando no dispositivo
- ✅ **Dependências instaladas** (navegação e SQLite)
- ✅ **App básico** mostrando título na tela

---

## 🔄 Comandos úteis para lembrar

```bash
# Iniciar projeto
npx expo start

# Limpar cache (se der problema)
npx expo start --clear

# Instalar nova dependência
npx expo install nome-da-dependencia

# Ver logs detalhados
npx expo start --dev-client
```

---

## 🐛 Problemas comuns

### ❌ "Expo command not found"
```bash
# Instalar Expo CLI novamente
npm install -g @expo/cli
```

### ❌ App não carrega no celular
- Verifique se celular e PC estão na **mesma rede WiFi**
- Tente **reiniciar** o servidor: `Ctrl+C` e `npx expo start`

### ❌ "Metro bundler failed"
```bash
# Limpar cache e reinstalar
npx expo start --clear
rm -rf node_modules
npm install
```

---

## ➡️ Próxima parte

Na **Parte 2**, vamos:
- 🏗️ Criar a estrutura de pastas organizada
- 🧭 Configurar navegação entre telas
- 🎨 Definir o sistema de cores e estilos
- 📱 Criar a primeira tela funcional

---

**🎉 Parabéns! Você concluiu a Parte 1 do tutorial.**

*Quando estiver pronto, peça a **Parte 2** para continuar!*

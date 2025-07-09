# PixelPetTimer 🐾⏰

Um aplicativo de timer Pomodoro com um pet virtual que reage ao seu progresso de foco!

## 📱 Como Usar

1. **Adicionar Meta**: Toque no botão `+` para criar uma nova meta de foco
2. **Iniciar Timer**: Selecione uma meta da lista para começar o timer
3. **Acompanhar Pet**: Seu pet virtual mudará de humor conforme você foca ou cancela
4. **Completar Meta**: Quando o timer termina, sua meta é marcada como concluída

## 🎨 Personalização

### Cores do Pet
Edite `src/components/PixelPet.js` para personalizar as cores:

```javascript
const styles = StyleSheet.create({
  // Cores do pet por status
  colorBlue: { backgroundColor: '#60A5FA' },    // Pronto
  colorYellow: { backgroundColor: '#FBBF24' },  // Focado
  colorGreen: { backgroundColor: '#34D399' },   // Concluído
  colorRed: { backgroundColor: '#F87171' },     // Cancelado
});
```

### Substituir Pet por Imagem
Para usar imagens personalizadas, substitua o componente `PetBody`:

```javascript
import { Image } from 'react-native';

const PetBody = ({ status }) => (
  <Image 
    source={petImages[status]} 
    style={styles.petImage}
  />
);
```

### Personalizar Cores da Interface
Edite as cores em `src/screens/HomeScreen.js` e `src/screens/AddGoalScreen.js`:

```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937', // Cor de fundo principal
  },
  // Outras cores...
});
```

### Adicionar Sons
Instale `expo-av` e adicione sons:

```bash
npx expo install expo-av
```

```javascript
import { Audio } from 'expo-av';

// Reproduzir som quando completar meta
const playSuccessSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('./assets/sounds/success.mp3')
  );
  await sound.playAsync();
};
```

### Personalizar Durações Padrão
Modifique `src/screens/AddGoalScreen.js` para adicionar botões de duração rápida:

```javascript
const quickDurations = [15, 25, 45, 60]; // minutos

{quickDurations.map(duration => (
  <TouchableOpacity 
    key={duration}
    onPress={() => setMinutes(duration.toString())}
  >
    <Text>{duration}min</Text>
  </TouchableOpacity>
))}
```

### Adicionar Notificações
Instale `expo-notifications`:

```bash
npx expo install expo-notifications
```

```javascript
import * as Notifications from 'expo-notifications';

// Notificar quando timer terminar
const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Timer Concluído!",
      body: "Parabéns! Você completou sua sessão de foco!",
    },
    trigger: { seconds: timeLeft },
  });
};
```

## 🛠️ Desenvolvimento

### Instalar Dependências
```bash
npm install
```

### Executar
```bash
npx expo start
```

### Estrutura do Projeto
```
src/
├── components/
│   └── PixelPet.js          # Componente do pet virtual
├── screens/
│   ├── HomeScreen.js        # Tela principal com timer
│   └── AddGoalScreen.js     # Tela para adicionar metas
└── db/
    └── database.js          # Configuração do SQLite
```

## 📋 Funcionalidades Futuras

- [ ] Histórico de metas completadas
- [ ] Estatísticas de produtividade
- [ ] Diferentes tipos de pets
- [ ] Sistema de recompensas
- [ ] Sincronização em nuvem
- [ ] Integração com calendário

## 🐛 Problemas Conhecidos

- O banco de dados é local (dados perdidos ao desinstalar)
- Pet é apenas visual (sem animações)

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para modificar e personalizar!

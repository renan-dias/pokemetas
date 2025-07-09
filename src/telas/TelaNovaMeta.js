import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView
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
    paddingTop: 40,
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

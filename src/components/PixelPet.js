import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Um pet simples feito com Views. Substitua por suas imagens personalizadas!
const PetBody = ({ color }) => <View style={[styles.petBody, color]} />;
const Eye = () => <View style={styles.eye} />;
const Mouth = ({ status }) => {
    if (status === 'happy') return <View style={[styles.mouth, styles.mouthHappy]} />;
    if (status === 'sad') return <View style={[styles.mouth, styles.mouthSad]} />;
    return <View style={[styles.mouth, styles.mouthNeutral]} />;
};

const PixelPet = ({ status = 'idle' }) => {
  const statusConfig = {
    idle: { color: styles.colorBlue, text: 'Pronto!' },
    working: { color: styles.colorYellow, text: 'Focado...' },
    happy: { color: styles.colorGreen, text: 'Concluído! :D' },
    sad: { color: styles.colorRed, text: 'Cancelado :(' },
  };

  const { color, text } = statusConfig[status];

  return (
    <View style={styles.container}>
      <PetBody color={color}>
        <View style={styles.eyeContainer}>
          <Eye />
          <Eye />
        </View>
        <Mouth status={status} />
      </PetBody>
      <Text style={styles.statusText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  petBody: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  colorBlue: {
    backgroundColor: '#60A5FA', // blue-400
  },
  colorYellow: {
    backgroundColor: '#FBBF24', // yellow-400
  },
  colorGreen: {
    backgroundColor: '#34D399', // green-400
  },
  colorRed: {
    backgroundColor: '#F87171', // red-400
  },
  eyeContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  eye: {
    width: 16,
    height: 16,
    backgroundColor: 'black',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  mouth: {
    width: 32,
    height: 16,
    backgroundColor: 'black',
    marginTop: 8,
  },
  mouthHappy: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: 4,
    width: 40,
    height: 20,
  },
  mouthSad: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 12,
    width: 40,
    height: 20,
  },
  mouthNeutral: {
    height: 4,
    marginTop: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
});

export default PixelPet;


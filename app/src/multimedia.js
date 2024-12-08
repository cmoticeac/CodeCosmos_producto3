// Multimedia.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Multimedia = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Componente Multimedia</Text>
      <Text>Aquí iría tu contenido multimedia</Text>
      <Text>
        {'\n'}
      </Text>
      <Button
        title="Volver a los detalles"
        onPress={onBack} // Volver al componente Detalle
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Multimedia;

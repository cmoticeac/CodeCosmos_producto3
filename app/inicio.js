import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InicioApp() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: 'red' }}>Pantalla de Inicio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

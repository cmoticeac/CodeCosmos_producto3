// Detalle.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Multimedia from './multimedia'; // Importamos el componente Multimedia

const Detalle = ({ jugador, onBack }) => {
  const [showMultimedia, setShowMultimedia] = useState(false); // Estado para controlar si se muestra Multimedia

  // Función para cambiar a la vista Multimedia
  const handleGoToMultimedia = () => {
    setShowMultimedia(true);
  };

  // Si showMultimedia es true, mostramos el componente Multimedia
  if (showMultimedia) {
    return <Multimedia onBack={() => setShowMultimedia(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Jugador</Text>
      <Text>Nombre: {jugador.nombre}</Text>
      <Text>Apellido: {jugador.apellido}</Text>
      <Text>Posición: {jugador.posicion}</Text>
      <Text>Edad: {jugador.edad}</Text>
      <Text>
        {'\n'}
      </Text>
      <Button title="Volver a la lista" onPress={onBack} />
      <Text>
        {'\n'}
      </Text>
      <Button title="Ir a Multimedia" onPress={handleGoToMultimedia} /> {/* Botón para ir a Multimedia */}
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

export default Detalle;

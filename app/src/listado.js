import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { database, ref, onValue } from '../src/firebase.js'; // Aquí importamos ref y onValue

export default function Listado() {
  const [jugadores, setJugadores] = useState([]);
  console.log("llego l 9");

  useEffect(() => {
    console.log("llegolinea 15 pasa useEffect inicializa database");

    // Ahora usamos ref(database, 'ruta') correctamente
    const jugadoresRef = ref(database, '/jugadores');
    console.log("inicializa linea 16 ref firebase");

    // Escuchar los cambios en la base de datos
    onValue(jugadoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jugadoresArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,  // Corregido aquí
        }));
        console.log(jugadoresArray);
        setJugadores(jugadoresArray);
      } else {
        setJugadores([]);
      }
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => jugadoresRef.off('value');
  }, []);

  // Renderizar cada jugador
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>Nombre: {item.nombre}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Text>Posición: {item.posicion}</Text>
      <Text>Edad: {item.edad}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Jugadores</Text>
      <FlatList
        data={jugadores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});

import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { getApp, initializeApp } from '@react-native-firebase/app';
import React, { useEffect, useState } from 'react';
import firebaseConfig from './firebaseConfig';
import database from '@react-native-firebase/database';

export default function Listado() {
    const [jugadores, setJugadores] = useState([]);
  
    useEffect(() => {
      if (Platform.OS === 'web') {
        // Inicializar Firebase si es necesario
        try {
          getApp();
        } catch (e) {
          initializeApp(firebaseConfig);
        }
      }
  
      const db = database();
      const jugadoresRef = db.ref('/jugadores');
  
      // Escuchar los cambios en la base de datos
      jugadoresRef.on('value', snapshot => {
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
        <Text >Apellido: {item.apellido}</Text>
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

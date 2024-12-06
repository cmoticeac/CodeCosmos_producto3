// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';

function HomeScreen({ navigation }) {
  const [players, setPlayers] = useState([]);


  useEffect(() => {
    const reference = database().ref('/jugadores');
    const onValueChange = reference.on('value', snapshot => {
      const data = snapshot.val();
      const playerList = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setPlayers(playerList);
    });
 
 
    // Clean up the listener
    return () => reference.off('value', onValueChange);
  }, []);
 
 
  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Button title="Details" onPress={() => navigation.push('PlayerDetail', { playerId: item.id })} />
            <Text style={styles.name}>
              {item.nombre} {item.apellido}
            </Text>
            <Text>Posición: {item.posicion}</Text>
            <Text>Altura: {item.altura}m</Text>
            <Text>Partidos: {item.partidos}</Text>
          </View>
        )}
      />
    </View>
  );
 


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
 });

 
export default HomeScreen;

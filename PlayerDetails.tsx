import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';

const PlayerDetails = ({ route }) => {
  const [player, setPlayer] = useState(null);
  const { playerId } = route.params;

  useEffect(() => {
    const reference = database().ref('/jugadores/' + playerId);

    // Fetch player data from Firebase
    reference.once('value')
      .then(snapshot => {
        setPlayer(snapshot.val());
      })
      .catch(error => {
        console.error('Error fetching player data:', error);
      });
  }, []);

  if (!player) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading player details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: player.img1 }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.name}>{player.nombre} {player.apellido}</Text>
      <Text style={styles.detail}>Position: {player.posicion}</Text>
      <Text style={styles.detail}>Height: {player.altura}m</Text>
      <Text style={styles.detail}>Age: {player.edad}</Text>
      <Text style={styles.detail}>Matches Played: {player.partidos}</Text>
      <Text style={styles.detail}>Gender: {player.sexo}</Text>
      {player.video && (
        <Text style={styles.detail}>Video: {player.video}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
});

export default PlayerDetails;
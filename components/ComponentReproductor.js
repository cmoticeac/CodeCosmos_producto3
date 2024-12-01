import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ComponentReproductor() {
  const play = () => console.log('Play');
  const pause = () => console.log('Pause');
  const stop = () => console.log('Stop');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproductor Multimedia</Text>
      <View style={styles.controls}>
        <Button title="Play" onPress={play} />
        <Button title="Pause" onPress={pause} />
        <Button title="Stop" onPress={stop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', width: '60%' },
});

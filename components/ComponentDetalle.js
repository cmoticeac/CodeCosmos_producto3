import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';

export default function ComponentDetalle() {
  const { id = 'Sin ID', title = 'Sin título' } = useSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Elemento</Text>
      <Text style={styles.detail}>ID: {id}</Text>
      <Text style={styles.detail}>Título: {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  detail: { fontSize: 18, marginBottom: 10 },
});

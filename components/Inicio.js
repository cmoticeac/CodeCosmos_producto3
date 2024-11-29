import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Datos de ejemplo para la lista
const data = Array.from({ length: 50 }, (_, index) => ({
  id: index.toString(),
  title: `Elemento ${index + 1}`,
}));

export default function Inicio() {
  return (
    <View style={styles.container}>
      {/* Zona del título superior */}
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido a la App!</Text>
      </View>

      {/* Zona del listado infinito */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  listText: {
    fontSize: 16,
  },
});
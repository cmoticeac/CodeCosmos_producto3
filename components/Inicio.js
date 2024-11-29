import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

// Datos iniciales
const initialData = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `Elemento ${index + 1}`,
}));

export default function Inicio() {
  const [data, setData] = useState(initialData); // Datos visibles
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para simular la carga de más datos
  const loadMoreData = () => {
    if (loading) return; // No hacer nada si ya se está cargando

    setLoading(true); // Activar el estado de carga

    // Simular un retraso para obtener más datos
    setTimeout(() => {
      const newData = Array.from({ length: 20 }, (_, index) => ({
        id: (data.length + index).toString(),
        title: `Elemento ${data.length + index + 1}`,
      }));

      // Actualizar los datos con los nuevos elementos
      setData((prevData) => [...prevData, ...newData]);
      setLoading(false); // Desactivar el estado de carga
    }, 1000); // Simulación de un retraso de 1 segundo
  };

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
        onEndReached={loadMoreData} // Cargar más datos cuando se llegue al final
        onEndReachedThreshold={0.1} // Iniciar la carga cuando esté a 10% del final
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#6200ee" /> : null
        } // Mostrar un indicador de carga al final
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

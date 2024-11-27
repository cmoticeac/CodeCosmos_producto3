import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';

// Define el tipo para los elementos del listado
type ListItem = string;

const Inicio: React.FC = () => {
  // Estado para datos del FlatList
  const [data, setData] = useState<ListItem[]>(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  );

  // Función para cargar más datos al final del FlatList
  const loadMoreData = () => {
    setTimeout(() => {
      setData(prevData =>
        prevData.concat(Array.from({ length: 10 }, (_, i) => `Item ${prevData.length + i + 1}`))
      );
    }, 1000); // Simulación de carga
  };

  // Renderizar cada elemento del FlatList
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Zona del título */}
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a CodeCosmos</Text>
      </View>

      {/* Zona del listado infinito */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Text style={styles.loading}>Cargando más datos...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ea',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    padding: 10,
    color: '#888',
  },
});

export default Inicio;
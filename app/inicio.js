import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
 
import { styles } from '../styles';  // Importamos los estilos desde el archivo styles.js
 

  

/**
 * Datos iniciales  se pondrán los datos de jugadores en este initialData
 */
const initialData = Array.from({ length: 50 }, (_, index) => ({
  id: index.toString(),
  title: `Elemento ${index + 1}`,
}));

/**
 * Componente Flatlist 
 * (paso 6) Crear el primer componente Inicio que contendrá las dos zonas del Mockup,
 * una para el título superior y la otra zona un listado infinito mediante un FlatList
 *
 * @returns devuelve el componente Inicio
 */
export default function Inicio() {
  const [data, setData] = useState(initialData); // Datos visibles
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para simular la carga de más datos (repetir los mismos 50 elementos)
  const loadMoreData = () => {
    if (loading) return; // No hacer nada si ya se está cargando

    setLoading(true); // Activar el estado de carga

    // Simular un retraso para obtener más datos
    setTimeout(() => {
      // Repetir los datos actuales
      setData((prevData) => [...prevData, ...initialData]);
      setLoading(false); // Desactivar el estado de carga
    }, 1000); // Simulación de un retraso de 1 segundo
  };

  /**
   * Aquí vuelve al incio conforme a la rubrica
   */
  const onPressGoHome = () => {
    console.log('Navegando a Home');
  };

  /**
   * Al pulsar ... listado ..PROPUESTA
   */
  const onPressGoPlayers = () => {
    console.log('Navegando a Players');
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
        keyExtractor={(item, index) => `${item.id}-${index}`} // Clave única combinando el id y el índice
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
      
      <View style={styles.footer}> 
        <Text>El futuro nav de navegación super sabado</Text>

        {/* Reemplazamos el texto con el icono FontAwesome */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={onPressGoHome}
            title="home"
            color="#841500"
        
            accessibilityLabel="ir a inicio"
           // icon={<FontAwesomeIcon name="house-chimney" size={24} color="#fff" />} // Añadir icono
            style={styles.buttonHome}  // Añadir el estilo adicional para el Home
          />
          <Button
            onPress={onPressGoPlayers}
            title="List Players"
            color="#841500"
             // icon=
            accessibilityLabel="ir a inicio"
          />
        </View>
      </View>
    </View>
  );
}
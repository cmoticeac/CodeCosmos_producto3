import React from 'react';
import { FlatList, View, Text, StyleSheet, Button, Image } from 'react-native';
import { Video } from 'expo-av';
import { database, ref, onValue } from '../src/firebase.js'; // Aquí importamos ref y onValue
import Detalle from './detalle'; // Asegúrate de importar el componente Detalle

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadores: [], // Estado inicial
      selectedJugador: null, // Jugador seleccionado para mostrar detalles
    };
  }

  componentDidMount() {
    console.log("llegolinea 15 pasa componentDidMount inicializa database");

    // Inicializamos la referencia a la base de datos
    const jugadoresRef = ref(database, '/jugadores');
    console.log("inicializa linea 16 ref firebase");

    // Escuchamos los cambios en la base de datos
    this.unsubscribe = onValue(jugadoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        try {
          const jugadoresArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value, // clave ... valor, clave... valor...valor
          }));
          console.log(jugadoresArray);
          this.setState({ jugadores: jugadoresArray });
        } catch (error) {
          console.log(error.id);
        }
      } else {
        this.setState({ jugadores: [] });
      }
    });
  }

  componentWillUnmount() {
    // Libera base de datos
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handlePress = (item) => {
    console.log("Botón detalles jugador apretado para:", item.nombre);
    // Guardamos el jugador seleccionado en el estado
    this.setState({ selectedJugador: item });
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.img1 }} // Suponiendo que `item.img1` contiene la URL de la imagen
        style={styles.image} // Estilo para la imagen
      />
      <Text style={styles.name}>Nombre: {item.nombre}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Text>Posición: {item.posicion}</Text>
      <Text>
        {'\n'}
      </Text>
      <Button
        title="Ver Detalles Jugador"
        onPress={() => this.handlePress(item)} // Al presionar el botón se selecciona el jugador
      />
    </View>
  );

  render() {
    const { selectedJugador, jugadores } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Jugadores</Text>

        {selectedJugador ? (
          // Si hay un jugador seleccionado, mostramos el componente Detalle
          <Detalle jugador={selectedJugador} onBack={() => this.setState({ selectedJugador: null })} />
        ) : (
          // Si no hay jugador seleccionado, mostramos la lista de jugadores
          <FlatList
            data={jugadores}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1} // Ajustamos el umbral para cuando se dispara el evento
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B9E5E8',
  },
  title: {
    fontSize: 24,
    color: '#DFF2EB',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#7AB2D3',
  },
  item: {
    padding: 15,
    borderBottomWidth: 10,
    borderBottomColor: '#B9E5E8',
    backgroundColor: '#DFF2EB',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: 200,    // Ancho de la imagen
    height: 200,   // Alto de la imagen
    alignContent: 'center',
    textAlign: 'center',
    resizeMode: 'cover',  // Ajusta la imagen a un formato adecuado
    marginTop: 10,  // Espacio entre el texto y la imagen
    marginBottom: 10,
  },
  video: {
    width: '100%',    // Establece el tamaño del video
    height: 200,      // Altura del video
    marginTop: 10,    // Espacio entre la imagen y el video
  },
});

export default Listado;

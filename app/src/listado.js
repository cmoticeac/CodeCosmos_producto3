import React from 'react';
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';
import { database, ref, onValue } from '../src/firebase.js'; // Aquí importamos ref y onValue

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadores: [], // Estado inicial
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

  handlePress = () => {
    console.log("boton detalles jugador apretado");
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>Nombre: {item.nombre}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Text>Posición: {item.posicion}</Text>
      <Text>Edad: {item.edad}</Text>
      <Text>Imagen: {item.img1}</Text>
      <Text>Video: {item.video}</Text>
      <Button
      title="Ver Detalles Jugador"
      onPress={this.handlePress}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Jugadores</Text>
        <FlatList
          data={this.state.jugadores}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.1} // Ajustamos el umbral para cuando se dispara el evento
        />
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
});

export default Listado;

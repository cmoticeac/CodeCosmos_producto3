import React from 'react';
import { FlatList, View, Text, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';
import { database, ref, onValue } from '../src/firebase'; // Aquí importamos ref y onValue
import Detalle from './detalle'; // Asegúrate de importar el componente Detalle

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadores: [], // Estado para almacenar los jugadores
      selectedJugador: null, // Jugador seleccionado para mostrar detalles
      loading: false, // Indicador de carga
      page: 1, // Página actual (sirve para saber cuántas veces agregar los 10 jugadores)
      allJugadores: [], // Almacenaremos todos los jugadores en un solo arreglo para evitar duplicados
    };
  }

  componentDidMount() {
    this.loadJugadores(); // Cargar los jugadores cuando el componente se monta
  }

  // Cargar los jugadores de la base de datos
  loadJugadores = () => {
    const jugadoresRef = ref(database, '/jugadores');

    this.setState({ loading: true });

    onValue(jugadoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jugadoresArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        // Guardamos los primeros 10 jugadores
        const primeros10Jugadores = jugadoresArray.slice(0, 10);

        this.setState({
          jugadores: primeros10Jugadores, // Establecemos los primeros 10 jugadores
          allJugadores: primeros10Jugadores, // Almacenamos todos los jugadores
          loading: false,
        });
      } else {
        this.setState({ jugadores: [], loading: false });
      }
    });
  };

  // Función que se ejecuta cuando el usuario llega al final de la lista
  handleEndReached = () => {
    const { loading, jugadores, allJugadores, page } = this.state;

    // Si estamos cargando o ya no hay más jugadores para agregar, no hacemos nada
    if (loading) return;

    this.setState(
      (prevState) => ({
        page: prevState.page + 1, // Aumentamos la página
        loading: true, // Activamos el indicador de carga
      }),
      () => {
        // Crear una nueva lista de jugadores duplicados con un ID único
        const jugadoresRepetidos = jugadores.map((jugador, index) => ({
          ...jugador,
          id: `${jugador.id}_duplicado_${allJugadores.length + index}`, // Asignamos un nuevo ID único basado en el índice total
        }));

        this.setState((prevState) => ({
          jugadores: [...prevState.jugadores, ...jugadoresRepetidos], // Añadimos los mismos jugadores al final
          allJugadores: [...prevState.allJugadores, ...jugadoresRepetidos], // Actualizamos la lista de todos los jugadores
          loading: false, // Desactivamos el indicador de carga
        }));
      }
    );
  };

  handlePress = (item) => {
    this.setState({ selectedJugador: item });
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.img1 }} // Suponiendo que `item.img1` contiene la URL de la imagen
        style={styles.image}
      />
      <Text style={styles.name}>Nombre: {item.nombre}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Text>Posición: {item.posicion}</Text>
      <Button title="Ver Detalles Jugador" onPress={() => this.handlePress(item)} />
    </View>
  );

  render() {
    const { selectedJugador, jugadores, loading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Jugadores</Text>

        {selectedJugador ? (
          <Detalle jugador={selectedJugador} onBack={() => this.setState({ selectedJugador: null })} />
        ) : (
          <FlatList
            data={jugadores}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id} // Aquí usamos la clave única
            onEndReached={this.handleEndReached} // Cargar más jugadores al llegar al final
            onEndReachedThreshold={0.1} // Activar cuando el usuario está al 10% del final
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // Mostrar cargando
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
    width: 200, // Ancho de la imagen
    height: 200, // Alto de la imagen
    alignContent: 'center',
    textAlign: 'center',
    resizeMode: 'cover', // Ajusta la imagen a un formato adecuado
    marginTop: 10, // Espacio entre el texto y la imagen
    marginBottom: 10,
  },
});

export default Listado;

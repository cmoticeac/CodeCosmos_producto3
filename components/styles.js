import { Button, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
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
  footer: {
    padding: 20,
    backgroundColor: '#EBEB6B',  
    width: '100%',  // Asegura que el pie de página ocupe todo el ancho
    alignItems: 'center', // Centra los botones dentro de la sección de pie de página
    marginTop: 20,         // Margen superior para separar el pie de página del contenido principal
  },
  
  buttonContainer: {
    flexDirection: 'row',        // Alineación en fila
    justifyContent: 'center',    // Centra los botones en el contenedor
    marginTop: 10,               // Añadimos un margen superior
    width: '100%',               // Asegura que los botones ocupen todo el espacio disponible
    flexWrap: 'wrap',            // Permite que los botones se ajusten si no hay suficiente espacio
  },
  button: {
    backgroundColor: '#A5D6A7',  // Color de fondo más claro para los botones
    paddingVertical: 12,         // Espaciado arriba y abajo
    paddingHorizontal: 20,       // Espaciado a los lados
    borderRadius: 15,            // Bordes más redondeados
    margin: 12,                  // Aumentamos la separación entre los botones
    flex: 1,                     // Hace que los botones ocupen todo el espacio disponible
    maxWidth: 200,               // El ancho máximo de los botones
  },
  buttonHome: {
    marginBottom: 20,            // Aumenta la separación inferior (más espacio debajo del botón)
    marginRight: 40,             // Agrega más espacio a la derecha para separar del botón siguiente
  },
  buttonText: {
    color: '#fff',               // Color del texto
    fontSize: 16,                // Tamaño de la fuente
    textAlign: 'center',         // Centra el texto dentro del botón
  },
});
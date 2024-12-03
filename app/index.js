import React from 'react';
import { AppRegistry } from 'react-native';
import { styles } from "../styles"
import Listado from './listado';
import ComponentDetalle from './detalle';
import ComponentReproductor from './reproductor';
import InicioApp from './inicio';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { codecomos3 as MyApp } from '../app.json';

const Stack = createStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="inicio">
        <Stack.Screen name="inicio" component={InicioApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(MyApp, () => App);
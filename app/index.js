import React from 'react';
import { AppRegistry } from 'react-native';
import { View, Text } from 'react-native';
import { name as codecomos3 } from '../app.json';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, color: 'green' }}>¡Funciona!</Text>
    </View>
  );
}

AppRegistry.registerComponent(codecomos3, () => App);

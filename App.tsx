// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import HomeScreen from './Home';
import PlayerDetails from './PlayerDetails';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CodeCosmos' }} />
        <Stack.Screen name="PlayerDetail" component={PlayerDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

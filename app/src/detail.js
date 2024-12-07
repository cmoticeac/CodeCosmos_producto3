/**
 * para del detalle del jugador
 */

import React, {useState} from 'react';
import {View,Text, StyleSheet} from 'react-native';
 

/**
 * datos de prueba es para entorno de pruebas no de produccion 
 */
const Detail = () => {
  const titleText='Detalle de jugadores (home)    jugador 1    jugador 2    jugador 3   jugador 4';
 console.log("ln 9");
  const db= database;
  console.log("ln 11 carga db");

  return (
    <View>
          <Text style={styles.titleText}> {titleText} </Text>
    </View>
  );
};
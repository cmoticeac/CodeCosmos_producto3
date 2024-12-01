import { useRouter } from 'expo-router';
import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../styles';


export default function Inicio() {
  const router = useRouter();

  return (
    <View>
      <Button title="Ir a Detalle" onPress={() => router.push('/detalle')} />
      <Button title="Ir a Reproductor" onPress={() => router.push('/reproductor')} />
    </View>
  );
}

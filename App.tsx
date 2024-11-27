import React from 'react';
import { SafeAreaView } from 'react-native';
import Inicio from '../CodeCosmosProducto03Mobile/android/app/src/components/Inicio'; // Ajusta la ruta según tu estructura

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Inicio />
    </SafeAreaView>
  );
};

export default App;

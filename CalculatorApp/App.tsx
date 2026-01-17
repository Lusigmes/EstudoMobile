import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalculadoraView from './src/views/CalcuradoraView';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <CalculadoraView />
    </SafeAreaProvider>
  );
};

export default App;
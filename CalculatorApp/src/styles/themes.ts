import { StyleSheet } from 'react-native';

export const cores = {
  background: '#000',
  display: '#1c1c1c',
  number: '#333',
  operation: '#0b3964',
  special: '#491bf1',
  text: '#fff',
  textSpecial: '#000',
  numberHover: '#444',
  operationHover: '#b2ccf3',
  specialHover: '#bfbfbf',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.background,
    justifyContent: 'flex-end', 
  },
  areaSegura: {
    flex: 1,
    justifyContent: 'flex-end', 
  },
  teclado: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flex: 1, 
    justifyContent: 'flex-end', 
  },
});
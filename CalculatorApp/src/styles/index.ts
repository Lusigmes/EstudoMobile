import { StyleSheet } from "react-native";

export const stylesDisplay = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 150,
  },
  expressao: {
    color: '#888',
    fontSize: 20,
    marginBottom: 10,
  },
  valor: {
    color: 'white',
    fontSize: 48,
    fontWeight: '300',
  },
});

export const stylesButtonRow = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});
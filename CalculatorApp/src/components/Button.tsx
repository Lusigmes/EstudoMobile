import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { ButtonProps } from "../types";
import { coresAtuais } from "../styles/cores";

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const Button: React.FC<ButtonProps> = ({
  titulo,
  onPress,
  ehDouble = false,
  ehOperacao = false,
  ehEspecial = false,
}) => {
  const [pressionado, setPressionado] = useState(false);

  const buttonStyles: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [styles.texto];

  if (ehOperacao) {
    buttonStyles.push({
      backgroundColor: pressionado 
        ? coresAtuais.operacaoHover 
        : coresAtuais.operacao
    });
    textStyles.push(styles.textoOperacao);
  } else if (ehEspecial) {
    buttonStyles.push({
      backgroundColor: pressionado 
        ? coresAtuais.especialHover 
        : coresAtuais.especial
    });
    textStyles.push(styles.textoEspecial);
  } else {
    buttonStyles.push({
      backgroundColor: pressionado 
        ? coresAtuais.numeroHover 
        : coresAtuais.numero
    });
  }

  if (ehDouble) {
    buttonStyles.push(styles.btnDouble);
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      onPressIn={() => setPressionado(true)}
      onPressOut={() => setPressionado(false)}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: buttonWidth - 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: buttonWidth / 2,
    margin: 5,
    borderWidth: 1,
    borderColor: coresAtuais.borda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  btnDouble: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  texto: {
    color: coresAtuais.texto,
    fontSize: 32,
    fontWeight: '500',
  },
  textoOperacao: {
    color: coresAtuais.textoEscuro,
    fontWeight: '600',
  },
  textoEspecial: {
    color: coresAtuais.textoEscuro,
    fontWeight: '500',
  },
});

export default Button;
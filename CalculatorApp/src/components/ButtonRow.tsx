import React from 'react';
import { View } from 'react-native';
import { ButtonRowProps } from '../types';
import { stylesButtonRow } from '../styles';

const ButtonRow: React.FC<ButtonRowProps> = ({ children }) => {
  return <View style={stylesButtonRow.row}>{children}</View>;
};

export default ButtonRow;
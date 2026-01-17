import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Display from '../components/Display';
import Button from '../components/Button';
import ButtonRow from '../components/ButtonRow';
import { Calculadora } from '../utils/calculadora';
import type { EstadoCalculadora, TeclaConfig } from '../types'; 
import { styles } from '../styles/themes';

const CalculadoraView: React.FC = () => {
  const [calcular] = useState(() => new Calculadora());
  const [estado, setEstado] = useState<EstadoCalculadora>(
    () => {
      return {
        valorAtual: '0',
        valorAnterior: '',
        operacao: null,
        esperandoNovoValor: false
    };
    }
  );
  
  useEffect(() => {
    const estadoInicial = calcular.getEstado();
    setEstado(estadoInicial);
  }, []);

  const handleButtonPress = (value: string) => {
    const novoEstado = calcular.handleBtnPress(value);
    
    if (novoEstado.valorAtual === 'NaN') {
      const estadoComErro = {
        ...novoEstado,
        valorAtual: 'Erro'
      };
      setEstado(estadoComErro);
      
      setTimeout(() => {
        setEstado(calcular.handleBtnPress('C'));
      }, 2000);
    } else {
      setEstado(novoEstado);
    }
  };

  const getExpressao = () => {
    if (!estado.operacao || !estado.valorAnterior) return '';
    return `${estado.valorAnterior} ${estado.operacao}`;
  };

  const botoes: TeclaConfig[][] = [
    [
      { titulo: 'C', ehEspecial: true },
      { titulo: '⌫', ehEspecial: true },
      { titulo: '÷', ehOperacao: true },
      { titulo: '×', ehOperacao: true },
    ],
    [
      { titulo: '7' },
      { titulo: '8' },
      { titulo: '9' },
      { titulo: '-', ehOperacao: true },
    ],
    [
      { titulo: '4' },
      { titulo: '5' },
      { titulo: '6' },
      { titulo: '+', ehOperacao: true },
    ],
    [
      { titulo: '1' },
      { titulo: '2' },
      { titulo: '3' },
      { titulo: '=', ehOperacao: true },
    ],
    
    [
      { titulo: '0', ehDouble: true }, 
      { titulo: '00', ehDouble: true  },
      { titulo: '.' },
    ],
  ];

  return (
    <SafeAreaView style={styles.areaSegura} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.container}>
        <Display
          valor={estado.valorAtual}
          expressao={getExpressao()}
        />
        
        <View style={styles.teclado}>
          {botoes.map((linha, rowIndex) => (
            <ButtonRow key={rowIndex}>
              {linha.map((botao, buttonIndex) => (
                <Button
                  key={`${rowIndex}-${buttonIndex}`}
                  titulo={botao.titulo}
                  onPress={() => handleButtonPress(botao.titulo)}
                  ehDouble={botao.ehDouble}
                  ehOperacao={botao.ehOperacao}
                  ehEspecial={botao.ehEspecial}
                />
              ))}
            </ButtonRow>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalculadoraView;
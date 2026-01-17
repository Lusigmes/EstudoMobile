import React from "react";

export type Operacao = '+' | '-' |'÷' |'×' | null;

export interface EstadoCalculadora{
    valorAtual: string;
    valorAnterior: string;
    operacao: Operacao;
    esperandoNovoValor: boolean;
} 

export interface DisplayProps{
    valor: string;
    expressao?: string;
}

export interface ButtonProps {
  titulo: string;
  onPress: () => void;
  ehDouble?: boolean;
  ehOperacao?: boolean;
  ehEspecial?: boolean;
}
export interface ButtonRowProps {
  children: React.ReactNode;
}

export interface TeclaConfig {
  titulo: string;
  ehDouble?: boolean;
  ehOperacao?: boolean;
  ehEspecial?: boolean;
}
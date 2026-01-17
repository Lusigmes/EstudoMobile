import { EstadoCalculadora, Operacao } from "../types";

const estadoInicial: EstadoCalculadora = {
    valorAtual: '0',
    valorAnterior: '',
    operacao: null,
    esperandoNovoValor: false
}

export class Calculadora {
    private estado: EstadoCalculadora = { ...estadoInicial };

    public handleBtnPress(btnValor: string): EstadoCalculadora {
        if (btnValor === '00') {
            return this.handleZeroZero();
        }
        
        if (btnValor === 'C') {
            return this.clear();
        };
        
        if (this.ehNumero(btnValor)) {
            return this.handleNumero(btnValor);
        };
        
        if (btnValor === '.') {
            return this.handleDecimal();
        };
        
        if (btnValor === '⌫') {
            return this.handleBackspace();
        };
        
        if (btnValor === '=') {
            return this.calcular();
        };
        
        if (this.ehOperacao(btnValor)) {
            return this.handleOperacao(btnValor as Operacao);
        };
        
        return this.estado;
    };

    private ehNumero(value: string): boolean {
        return /^[0-9]$/.test(value);
    };

    private ehOperacao(value: string): boolean {
        return ['+', '-', '×', '÷'].includes(value);
    };

    private handleZeroZero(): EstadoCalculadora {
        const { valorAtual, esperandoNovoValor } = this.estado;
        if (esperandoNovoValor) {
            this.estado = {
                ...this.estado,
                valorAtual: '00',
                esperandoNovoValor: false,
            };
        } else if (valorAtual === '0') {
            this.estado = {
                ...this.estado,
                valorAtual: '00',
            };
        } else if (valorAtual === '-0') {
            this.estado = {
                ...this.estado,
                valorAtual: '-00',
            };
        } else {
            this.estado = {
                ...this.estado,
                valorAtual: valorAtual + '00',
            };
        }
        return { ...this.estado };
    }

    private clear(): EstadoCalculadora {
        this.estado = { ...estadoInicial };
        return { ...this.estado };
    };

    private handleNumero(num: string): EstadoCalculadora {
        const { valorAtual, esperandoNovoValor } = this.estado;
                        
        if (esperandoNovoValor) {
            this.estado = {
                ...this.estado,
                valorAtual: num,
                esperandoNovoValor: false,
            };
        } else {
            if (valorAtual === '0') {
                this.estado = {
                    ...this.estado,
                    valorAtual: num,
                };
            } else if (valorAtual === '-0') {
                this.estado = {
                    ...this.estado,
                    valorAtual: '-' + num,
                };
            } else {
                this.estado = {
                    ...this.estado,
                    valorAtual: valorAtual + num,
                };
            }
        }

        return { ...this.estado }
    };

    private handleDecimal(): EstadoCalculadora {
        const { valorAtual, esperandoNovoValor } = this.estado;
                
        if (esperandoNovoValor) {
            this.estado = {
                ...this.estado,
                valorAtual: '0.',
                esperandoNovoValor: false,
            };
        } else if (!valorAtual.includes('.')) { 
            this.estado = {
                ...this.estado,
                valorAtual: valorAtual + '.',
            };
        }

        return { ...this.estado }
    };

    private handleOperacao(operacao: Operacao): EstadoCalculadora {
        const { valorAtual, valorAnterior, operacao: opAtual } = this.estado;

        if (valorAnterior && opAtual && !this.estado.esperandoNovoValor) {
            const resultado = this.realizarCalculo();
            this.estado = {
                valorAtual: resultado.toString(),
                valorAnterior: resultado.toString(),
                operacao,
                esperandoNovoValor: true,
            };
        } else {
            this.estado = {
                ...this.estado,
                valorAnterior: valorAtual,
                operacao,
                esperandoNovoValor: true,
            };
        }

        return { ...this.estado };
    };

    private calcular(): EstadoCalculadora {
        const { valorAtual, valorAnterior, operacao } = this.estado;

        if (!operacao || !valorAnterior) {
            return this.estado;
        }

        const result = this.realizarCalculo();
        
        this.estado = {
            valorAtual: result.toString(),
            valorAnterior: '',
            operacao: null,
            esperandoNovoValor: true,
        };

        return { ...this.estado };
    };

    private realizarCalculo(): number {
        const { valorAtual, valorAnterior, operacao } = this.estado;
        const anterior = parseFloat(valorAnterior);
        const atual = parseFloat(valorAtual);

        switch (operacao) {
            case '+':
                return anterior + atual;
            case '-':
                return anterior - atual;
            case '×':
                return anterior * atual;
            case '÷':
                if (atual === 0) {
                    return NaN; 
                }
                return anterior / atual;
            default:
                return atual;
        }
    };

    private handleBackspace(): EstadoCalculadora {
        const { valorAtual, esperandoNovoValor } = this.estado;

        if (esperandoNovoValor || valorAtual.length <= 1) {
            this.estado = {
                ...this.estado,
                valorAtual: '0',
            };
        } else {
            this.estado = {
                ...this.estado,
                valorAtual: valorAtual.slice(0, -1),
            };
        }

        return { ...this.estado };
    };

    public getEstado(): EstadoCalculadora {
        return { ...this.estado };
    };
}
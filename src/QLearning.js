import { EventEmitter } from "events";
EventEmitter.EventEmitter.defaultMaxListeners = 0;

class QLearning extends EventEmitter {
    constructor(props) {
        super(props)

        //Estado de execução
        this.isExecuting = true;
        //Posição inicial 
        this.posicaoinicial = 1;
        //Taxa de aleatoriedade
        this.porcentagem = 30;
        //Taxa de propagação 
        this.propagacao = 0.5;
        //Número de escolhas aleatórias
        this.totalAletorio = 0;
        //Número total de escolhas
        this.total = 0;
        //Pontuação do episodio
        this.pontuacaoAtual = 0;
        //Todos os episódios calculados
        this.episodios = [];
        //Vetor pontuação máxima
        this.pontuacao = [];
        //Matriz para pintar na tela
        this.print = [];
        //Linha atual da matriz q
        this.linhaAtual = 1;
        //índice atual da matriz q
        this.indiceAtual = 0;
        //Melhores pontuações
        this.best = [];
        //Pontação atual do melhor movimento
        this.bestScore = 0;
        //Linha best
        this.bestLine = 1;

        //Matriz Q
        //TODO
        //Inicializar a matriz corretamente
        //A matriz deve ter 50 linhas e 4 colunas
        //Cada linha representa um estado
        //Cada coluna corresponde a uma ação
        //A posição linha x coluna representa estado/ação
        // Cima[0] Baixo[1] Direita[2] Esquerda[3]
        //     this.matrizq = [[-1, null, -100, null],      //1
        //     [-1, null, -1, null],        //2
        //     [-1, -1, -1, null],               //3
        //     [-1, -1, -100, null],             //4
        //     [null, -1, -1, null],        //5
        //     [null, -100, -1, -1],             //6
        //     [-1, -1, -100, -1],                    //7
        //     [-100, -1, -1, -1],                    //8
        //     [-1, -100, -1, -1],                    //9
        //     [-1, null, -100, null],      //10
        //     [-1, null, -100, -100],           //11
        //     [-1, -100, -100, -1],                  //12
        //     [-100, -1, -1, -1],                    //13
        //     [-1, -1, -1, -100],                    //14
        //     [null, -100, -1, -1],             //15
        //     [null, -1, -1, -1],               //16
        //     [-1, -1, -100, -100],                  //17
        //     [-1, -100, -1, -1],                    //18
        //     [-1, -100, -1, -1],                    //19
        //     [-100, null, -100, -100],         //20
        //     [-1, null, -100, -100],           //21
        //     [-1, -100, -1, -100],                  //22
        //     [-100, -1, -1, -1],                    //23
        //     [-1, -1, -100, -1],                    //24
        //     [null, -100, -1, -1],             //25
        //     [null, -100, -1, -1],             //26
        //     [-1, -1, -1, -100],                    //27
        //     [-100, -1, -1, -1],                    //28
        //     [-1, -100, -1, -1],                    //29
        //     [-1, null, -100, -100],           //30
        //     [-1, null, -100, -100],           //31
        //     [-1, -100, -100, -1],                  //32
        //     [-1, -1, -1, -1],                      //33
        //     [-1, -1, -100, -100],                  //34
        //     [null, -1, -1, -1],               //35
        //     [null, -100, -1, -1],             //36
        //     [-1, -1, -1, -1],                      //37
        //     [-100, -100, -1, -1],                  //38
        //     [-1, -100, -1, -1],                    //39
        //     [-100, null, -100, -100],         //40
        //     [-1, null, 100, -100],            //41
        //     [-1, -100, -1, -100],                  //42
        //     [-1, -1, -1, -1],                      //43
        //     [-1, -1, -1, -100],                    //44
        //     [null, -1, -1, -1],               //45
        //     [null, -1, null, -1],        //46
        //     [-1, -1, null, -1],               //47
        //     [-1, -1, null, -1],               //48
        //     [-1, 100, null, -1],              //49
        //     [null, null, null, null]]      //50
        this.matrizq = [
            [null, -10, null, null],
            [null, -100, -10, -10],
            [null, -10, null, null],
            [-10, -10, -100, null],
            [null, -10, -10, -10],
            [-10, 100, null, -100],
            [-10, null, -10, null],
            [-100, null, 100, -10],
            [null, null, null, null]
        ]

        //Número de colunas
        this.ncols = this.matrizq[0].length - 1;
    };

    //Verifica se os elementos da linha são iguais
    //Ignorando o null
    isEquals() {
        return this.matrizq[this.linhaAtual].every((value, index, array) => {
            if (value === null || index === 0) {
                return true;
            } else {
                return value === array[index - 1];
            }
        });
    };

    isEqualsBest(arr) {
        return arr.every((value, index, array) => {
            if (value === null || index === 0) {
                return true;
            } else {
                return value === array[index - 1];
            }
        });
    };

    //Retorna se chegou na posição final
    isFinal(linha) {
        return this.matrizq[linha].every((element) => { return element === null })
    };

    //Começa a calcular os episódios
    start() {
        this.clear();
        this.isExecuting = true;
        this.qLearning();
    };

    //Termina de calcular os episódeos
    finish() {
        this.isExecuting = false;
    };

    //Calcula a taxa atual de aleatoriedade
    calculaTaxaAleatorio() {
        return this.totalAletorio * 100 / this.total;
    };

    //Escolhe a acao aletória
    escolheAletorio() {
        var isnull = true;
        var index = 0;
        while (isnull) {
            index = Math.floor(Math.random() * 3);
            if (this.matrizq[this.linhaAtual][index] !== null) {
                isnull = false;
            };
        };
        return index;
    };

    //Escolhe acao com maior recompença
    escolheMaior(array) {
        return array.reduce(function (a, b) {
            return Math.max(a, b);
        });
    };

    //A cada ação escolhida troca o valor da matriz para 1
    enablePrint(linha, coluna) {
        this.print[linha][coluna] = 1;
    };

    //Limpa a matriz de print
    clearEnablePrint() {
        for (var i = 0; i < this.matrizq[0].length - 1; i++) {
            this.print.push([0, 0, 0, 0])

        };
    };

    //Adicionar episodio calculado
    addEpisde(episode, pontuacao) {
        this.episodios.push(episode);
        this.pontuacao.push(pontuacao);
    };

    //Calcular maior entre os movimentos possíveis
    maiorValorQ(arr) {
        return Math.max.apply(null, arr);
    };

    //Calcular o novo valor de q
    calculaQ(proxlinha) {
        let valorAtual = this.matrizq[this.linhaAtual][this.indiceAtual];
        if (this.isFinal(proxlinha)) {
            return valorAtual
        } else {
            let arr = this.notNull(proxlinha);
            let maior = this.maiorValorQ(arr);
            return valorAtual + this.propagacao * maior;
        }
    };

    //Retorna as movimentações possíveis excluindo o null , o inicio e a posição anterior
    notNull(linha) {
        return this.matrizq[linha].map((element) => {
            if (element !== null && element !== 1 && this.matrizq[this.linhaAtual].indexOf(element) !== this.indiceAtual) {
                return element
            } else {
                return -1000
            }
        })
    }

    notNullBest(linha,ind) {
        return this.matrizq[linha].map((element) => {
            if (element !== null && element !== 1 && this.matrizq[this.bestLine].indexOf(element) !== ind) {
                return element
            } else {
                return -1000
            }
        })
    }

    //Verifca se o valor está repetido
    repetido(array, valor) {
        let rep = []
        for (let index = 0; index < 4; index++) {
            array.forEach((element, id) => {
                if (id !== index && element === array[index]) {
                    if (rep.indexOf(array[index]) < 0) {
                        rep.push(array[index]);
                    }
                }
            });

        }

        if (rep.indexOf(valor) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    //Realizar a movimentação
    movimentar() {
        // Cima[0] Baixo[1] Direita[2] Esquerda[3]
        this.pontuacaoAtual = this.pontuacaoAtual + 1;
        switch (this.indiceAtual) {
            case 0:
                return this.linhaAtual - this.ncols
            case 1:
                return this.linhaAtual + this.ncols
            case 2:
                return this.linhaAtual + 1
            case 3:
                return this.linhaAtual - 1
            default:
                break;
        }
    };


    movimentarBest(ind) {
        // Cima[0] Baixo[1] Direita[2] Esquerda[3]
        this.bestScore = this.bestScore + 1;
        switch (ind) {
            case 0:
                return this.bestLine - this.ncols
            case 1:
                return this.bestLine + this.ncols
            case 2:
                return this.bestLine + 1
            case 3:
                return this.bestLine - 1
            default:
                break;
        }
    };

    //Limpar para a próxima iteração
    clear() {
        this.clearEnablePrint();
        this.linhaAtual = this.posicaoinicial;
        this.pontuacaoAtual = 0;

    };

    //Verifica se a porcentagem de aleatório está baixa
    isLess() {
        if (this.total === 0) {
            return false
        } else {
            return this.calculaTaxaAleatorio() < this.porcentagem
        }

    }

    //Retorna o index equivalente a movimentação
    setIndex() {
        let index = 0;
        let notNull = this.notNull(this.linhaAtual);
        let maior = this.escolheMaior(notNull);
        if (this.isEquals() || this.isLess()) {
            index = this.escolheAletorio();
            this.totalAletorio = this.totalAletorio + 1;
        } else if (this.repetido(notNull, maior)) {
            index = this.matrizq[this.linhaAtual].indexOf(maior);
            this.totalAletorio = this.totalAletorio + 1;
        } else {
            index = this.matrizq[this.linhaAtual].indexOf(maior);
        };

        this.total = this.total + 1;
        return index;
    };

    setBestIndex(ind) {
        let index = 0;
        let notNull = this.notNullBest(this.bestLine,ind);
        let maior = this.escolheMaior(notNull);
        if (this.repetido(notNull, maior)) {
            index = this.matrizq[this.bestLine].indexOf(maior);
        } else {
            index = this.matrizq[this.bestLine].indexOf(maior);
        };
        return index;
    }

    //Seta a coluna/linha a ser printada
    printMoviment() {
        let linhaprint = Math.floor(this.linhaAtual / this.ncols);
        let colunaprint = this.linhaAtual - (linhaprint * this.ncols);
        this.print[linhaprint][colunaprint] = 1;
    };

    //Q-Learning
    qLearning() {
        //Vai executar enquanto a flag estiver true
        while (this.isExecuting) {
            //vai executar enquanto não chegar no fim
            while (!this.isFinal(this.linhaAtual)) {
                //Seta a direção do próximo movimento
                this.indiceAtual = this.setIndex();
                //Seta a linha equivalente ao próximo movimento
                let proxlinha = this.movimentar();
                //Calcula o valor q 
                this.matrizq[this.linhaAtual][this.indiceAtual] = this.calculaQ(proxlinha);
                //Troca a linha 
                this.linhaAtual = proxlinha;
                //Seta a coluna/linha a ser printada
                this.printMoviment();
            };

            this.addEpisde(this.print, this.pontuacaoAtual);
            this.emit("add_episode", this.print);
            this.finish();

            //this.verificarMaximo();
            setTimeout(() => {
                this.start();
            }, 2000);

        }


    }

    verificarMaximo() {

        let ind = 0;
        this.bestLine = 1;

        while (!this.isFinal(this.bestLine)) {
            //Seta a direção do próximo movimento
            ind = this.setBestIndex(ind);
            //Seta a linha equivalente ao próximo movimento
            let proxlinha = this.movimentarBest(ind);
            //Troca a linha 
            this.bestLine = proxlinha;
        };

        if (this.best.length > 5) {
            this.best.pop();
        };

        this.best.push(this.bestScore);


        if (this.isEqualsBest(this.best)) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }

    }

    



}



var qLearning = new QLearning();
export default qLearning
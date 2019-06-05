import { EventEmitter } from "events";
EventEmitter.EventEmitter.defaultMaxListeners = 0;

class QLearning extends EventEmitter {
    constructor(props) {
        super(props)

        //Estado de execução
        this.isExecuting = true;
        //Posição inicial 
        this.posicaoinicial = 1
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

        //Matriz Q
        //TODO
        //Inicializar a matriz corretamente
        //A matriz deve ter 50 linhas e 4 colunas
        //Cada linha representa um estado
        //Cada coluna corresponde a uma ação
        //A posição linha x coluna representa estado/ação
        // Cima[0] Baixo[1] Direita[2] Esquerda[3]
        this.matrizq = [[-1, null, -100, null],      //1
        [-1, null, -1, null],        //2
        [-1, -1, -1, null],               //3
        [-1, -1, -100, null],             //4
        [null, -1, -1, null],        //5
        [null, -100, -1, -1],             //6
        [-1, -1, -100, -1],                    //7
        [-100, -1, -1, -1],                    //8
        [-1, -100, -1, -1],                    //9
        [-1, null, -100, null],      //10
        [-1, null, -100, -100],           //11
        [-1, -100, -100, -1],                  //12
        [-100, -1, -1, -1],                    //13
        [-1, -1, -1, -100],                    //14
        [null, -100, -1, -1],             //15
        [null, -1, -1, -1],               //16
        [-1, -1, -100, -100],                  //17
        [-1, -100, -1, -1],                    //18
        [-1, -100, -1, -1],                    //19
        [-100, null, -100, -100],         //20
        [-1, null, -100, -100],           //21
        [-1, -100, -1, -100],                  //22
        [-100, -1, -1, -1],                    //23
        [-1, -1, -100, -1],                    //24
        [null, -100, -1, -1],             //25
        [null, -100, -1, -1],             //26
        [-1, -1, -1, -100],                    //27
        [-100, -1, -1, -1],                    //28
        [-1, -100, -1, -1],                    //29
        [-1, null, -100, -100],           //30
        [-1, null, -100, -100],           //31
        [-1, -100, -100, -1],                  //32
        [-1, -1, -1, -1],                      //33
        [-1, -1, -100, -100],                  //34
        [null, -1, -1, -1],               //35
        [null, -100, -1, -1],             //36
        [-1, -1, -1, -1],                      //37
        [-100, -100, -1, -1],                  //38
        [-1, -100, -1, -1],                    //39
        [-100, null, -100, -100],         //40
        [-1, null, 100, -100],            //41
        [-1, -100, -1, -100],                  //42
        [-1, -1, -1, -1],                      //43
        [-1, -1, -1, -100],                    //44
        [null, -1, -1, -1],               //45
        [null, -1, null, -1],        //46
        [-1, -1, null, -1],               //47
        [-1, -1, null, -1],               //48
        [-1, 100, null, -1],              //49
        [null, null, null, null]]      //50
    };

    //Verifica se os elementos da linha são iguais
    //Ignorando o null
    isEquals(element, index, array) {
        if (element === null || index === 0) {
            return true;
        } else {
            return element === array[index - 1];
        }
    };

    //Retorna se chegou na posição final
    isFinal(elemento) {
        return elemento === null;
    };

    //Começa a calcular os episódios
    start() {
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
    escolheAletorio(linha) {
        var isnull = true;
        var index = 0;
        while (isnull) {
            index = Math.floor(Math.random() * 4);
            if (typeof linha[index] !== null) {
                isnull = false;
            };
        };
        return index;
    };

    //Escolhe acao com maior recompença
    escolheMaior(linha) {
        return linha.indexOf(Math.max(linha));
    };

    //A cada ação escolhida troca o valor da matriz para 1
    enablePrint(linha, coluna) {
        this.print[linha][coluna] = 1;
    };

    //Limpa a matriz de print
    clearEnablePrint() {
        for (var i = 0; i < this.matrizq.length; i++) {
            for (var j = 0; j < this.matrizq.length; j++) {
                this.print[i][j] = 0;
            };
        };
    };

    //Adicionar episodio calculado
    addEpisde(episode, pontuacao) {
        this.episodios.push(episode);
        this.pontuacao.push(pontuacao);
    };

    //Calcular maior entre os movimentos possíveis
    maiorValorQ(linha) {
        return Math.max.apply(null, this.matrizq[linha]);
    };
    //Calcular o novo valor de q
    calculaQ(linha, coluna) {
        return this.matrizq[linha][coluna] + this.propagacao * this.maiorValorQ(linha);
    };

    //Q-Learning
    qLearning() {
        var linha = this.posicaoinicial - 1;

        while (this.isExecuting) {
            while (!qLearning[linha].every((element) => { this.isFinal(element) })) {
                var index = 0;
                let isEquals = this.matrizq[linha].every((value, index, array) => {
                    return isEquals(value, index, array);
                });
                if (isEquals || this.calculaTaxaAleatorio() < this.porcentagem) {
                    index = this.escolheAletorio();
                    this.total = this.total++;
                    this.totalAletorio = this.totalAletorio++;
                } else {
                    index = this.escolheMaior();
                    this.total = this.total++;
                };
                this.pontuacaoAtual++;
                this.print[linha][index] = 1;
                this.matrizq[linha][index] = this.calculaQ(linha, index);
            };
            this.episodios = this.addEpisde(this.print, this.pontuacaoAtual);
            this.emit("add_episode", this.print);
            
            setTimeout(function () {
                this.clearEnablePrint();
                this.pontuacaoAtual = 0;
            }, 1000);

        }
    }



}

var qLearning = new QLearning();
export default qLearning

class QLearning extends EventEmitter {
    constructor(props) {
        super(props)

        //Estado de execução
        this.isExecuting = false;
        //Posição inicial 
        this.posicaoinicial = 1
        //Taxa de aleatoriedade
        this.porcentagem = 0.3;
        //Taxa de propagação 
        this.propagacao = 0.5;
        //Número de escolhas aleatórias
        this.totalAletorio = 0;
        //Número total de escolhas
        this.total = 0;
        //Todos os episódios calculados
        this.episodios = [];
        //Vetor pontuação máxima
        this.pontuacao=[];
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
        this.matrizq = [[-1,undefined,-100,undefined],
                        [-1,undefined,-1,undefined]]
    };

    //Começa a calcular os episódeos
    start(){
        this.isExecuting = true;
    };

    //Termina de calcular os episódeos
    finish(){
        this.isExecuting = false;
    };

    //Calcula a taxa atual de aleatoriedade
    calculaTaxaAleatorio(){
        return  this.totalAletorio * 100 / total; 
    };

    //Escolhe a acao aletória
    escolheAletorio(linha){
        var isUndefined = true;
        var index = 0;
        while(isUndefined){
            index = Math.floor(Math.random() * 4);
            if(typeof linha[index] !== undefined){
                isUndefined = false;
            };
        };
        return index;
    };

    //Escolhe acao com maior recompença
    escolheMaior(linha){
        return linha.indexOf(Math.max(linha));
    };

    //A cada ação escolhida troca o valor da matriz para 1
    enablePrint(linha,coluna){
        this.print[linha][coluna] = 1;
    };

    //Limpa a matriz de print
    clearEnablePrint(){
        for(var i=0;i<this.matrizq.length;i++){
            for(var j=0;j<this.matrizq.length;j++){
                this.print[i][j] = 0;
            };
        };
    };

    //Adicionar episodio calculado
    addEpisde(episode,pontuacao){
        this.episodios.push(episode);
        this.pontuacao.push(pontuacao);    
    };




}

var qLearning = new QLearning();
export default qLearning
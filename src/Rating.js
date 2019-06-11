import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import qlearning from './QLearning';

//Material UI
import Grid from "@material-ui/core/Grid";

const styles = {

}

class Rating extends Component {   //componente do React
    constructor(props) {
        super(props)

        this.state = {
            iteracoes: 0,
            maximo:0,
            aleatorio:0,
            maior:0
        }
        this.props = props;
      
    }

    componentWillMount(){
        qlearning.on("add_episode", () => {
            this.setState({iteracoes:qlearning.episodios.length});
            this.setState({maximo:Math.min.apply(null, qlearning.pontuacao)});
            this.setState({aleatorio: qlearning.calculaTaxaAleatorio().toFixed(2)});
            this.setState({maior:100-qlearning.calculaTaxaAleatorio().toFixed(2)});
        });
    };

    //atualiza variavel ao digitar
    render() {
        const { classes } = this.props
        return (
            <Grid container>
                <Grid item xs={3}>
                   Iterações: {this.state.iteracoes} 
                </Grid>
                <Grid item xs={3}>
                   Pontuação Mínima: {this.state.maximo}
                </Grid>
                <Grid item xs={3}>
                   Máxima: {this.state.maior} %
                </Grid>
                <Grid item xs={3}>
                   Aleatório: {this.state.aleatorio} %
                </Grid>
            </Grid>


        )
    }
}
export default withStyles(styles)(Rating);
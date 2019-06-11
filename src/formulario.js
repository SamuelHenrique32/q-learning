import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import qLearning from "./QLearning";
import Button from "@material-ui/core/Button";


const styles = {

}

class Formulario extends Component {   //componente do React
    constructor(props) {
        super(props)

        this.state = {
            taxa: qLearning.propagacao,
            aleatoriadade: qLearning.porcentagem,
            otima: qLearning.otima,
            isBest: false,
            isPossible: false
        };


        this.props = props;
        //adicionar this ao contexto atual, volta p contexto depois do evento
        this.changeTaxa = this.changeTaxa.bind(this);
        this.changeAleatoriedade = this.changeAleatoriedade.bind(this);
        this.changeOtima = this.changeOtima.bind(this);




    }

    onClickExecuting() {
        if (qLearning.isExecuting) {
            qLearning.finish()
        } else {
            qLearning.start();
        }
    }

    onClickSave() {
        qLearning.init();
        qLearning.propagacao = this.state.taxa;
        qLearning.porcentagem = this.state.aleatoriadade;
        qLearning.otima = this.state.otima;
        this.setState({ isBest: false });
    }
    //atualiza variavel ao digitar
    changeTaxa = event => {
        //evento de alteracao qualquer, le e atualiza taxa do state
        this.setState({ taxa: event.target.value })
    }

    changeAleatoriedade = event => {
        //evento de alteracao qualquer, le e atualiza taxa do state
        this.setState({ aleatoriadade: event.target.value })
    }

    changeOtima = event => {
        //evento de alteracao qualquer, le e atualiza taxa do state
        this.setState({ otima: event.target.value })
    }

    componentWillMount() {
        qLearning.on("otima", (n) => {
            this.setState({ isBest: true })
            qLearning.finish();
        })

        qLearning.on("possivel", (n) => {
            this.setState({ isPossible: true })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        label="Taxa de Propagação"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.taxa}
                        onChange={this.changeTaxa}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Porcentagem Aletória"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.aleatoriadade}
                        onChange={this.changeAleatoriedade}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Quantidade ótima"
                        className={classes.textField}
                        margin="normal"
                        value={this.state.otima}
                        onChange={this.changeOtima}
                        disabled
                    />
                </Grid>


                <Grid item xs={12} >
                    {this.state.isBest ? (<Grid>
                        <Typography variant="p">"Você atingiu a solução ótima !!!"</Typography>
                        <Typography variant="p">
                            Iteração: {qLearning.pontuacao.indexOf(qLearning.confirmBest[0])}
                        </Typography> </Grid>) :
                        this.state.isPossible ? (
                            <Grid>
                                <Typography variant="p">
                                    Possível solução encontrada
                                </Typography>

                            </Grid>) : ""}
                </Grid>
            </Grid>

        )
    }
}


export default withStyles(styles)(Formulario);
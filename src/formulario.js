import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Material UI
import Grid from "@material-ui/core/Grid";
import qLearning from "./QLearning";

const styles = {

}

class Formulario extends Component {   //componente do React
    constructor(props) {
        super(props)

        this.state = {
            taxa: 0,

        }
        this.props = props;
        //adicionar this ao contexto atual, volta p contexto depois do evento
        this.changeTaxa = this.changeTaxa.bind(this);

        

    }

    

    //atualiza variavel ao digitar
    changeTaxa = event => {
        //evento de alteracao qualquer, le e atualiza taxa do state
        this.setState({ taxa: event.target.value })
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
                    />
                </Grid>
                <Grid item xs={12}>
                    Melhor pontuação : {}
                </Grid>
            </Grid>


        )
    }
}
export default withStyles(styles)(Formulario);
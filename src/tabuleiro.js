//tabuleiro recebe matriz com 0's e 1's e renderiza toda vez que recebe
//nova matriz

import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import qLearning from "./QLearning";
import Rating from "./Rating";

//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//css
const styles = {
    grid: {
        width: "100%",
        height: "100%",
        marginLeft: 100,
        marginTop: 50
    },
    Colorido: {
        minHeight: "10vh",
        backgroundColor: "red",
        borderStyle: "solid"
    },

}

class Tabuleiro extends Component {   //componente do React
    constructor(props) {
        super(props)

        this.state = {
            tabuleiro: [[1, 0, 1], [0, 1, 0], [1, 0, 1]]
        }
        this.props = props;
    }
    componentWillMount() {
        //Pega a mensagem vinda do qlearning quando um episodio é adicionado
        //Atualiza o state para renderizar o tabuleiro
        qLearning.on("add_episode", (printtable) => {
            this.setState({ tabuleiro: [] }, () => {
                this.setState({ tabuleiro: printtable });
            })
        });
        qLearning.start();
    }
    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.grid} justify="center" >
                <Grid item xs={12}>
                    <Typography variant="h4" >
                        Q-Learning
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" >
                        Maria Carolina e Samuel
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Rating />
                </Grid>
                <Grid item xs={12}>
                    {this.state.tabuleiro.map((v) => {
                        let val = v;
                        return (
                            <Grid container>
                                {val.map((v2) => {
                                    let value = v2;
                                    return (<Grid item xs={1} className={value === 1 ? classes.Colorido : ""}></Grid>)
                                })}
                            </Grid>);
                    })}
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {qLearning.pontuacao.map((v) => { return(<Grid item xs={1}>{v}</Grid>) })}
                    </Grid>

                </Grid>
            </Grid>
        )
    }
}
//exportar com css(withStyles)
export default withStyles(styles)(Tabuleiro);
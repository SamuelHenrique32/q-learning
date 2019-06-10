import React, { Component } from "react";
import Tabuleiro from './tabuleiro'
import Formulario from './formulario'

//Material UI
import Grid from "@material-ui/core/Grid";


class View extends Component {   //componente do React

   
    render() {
        return (
            <Grid container>
                {/* tabela */}
                <Grid item xs={9}>
                    <Tabuleiro></Tabuleiro>
                </Grid>
                {/* formulario */}
                <Grid item xs={3}>
                    <Formulario></Formulario>
                </Grid>
            </Grid>
        )
    }
}
export default (View);
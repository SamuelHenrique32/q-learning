//tabuleiro recebe matriz com 0's e 1's e renderiza toda vez que recebe
//nova matriz

import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Formulario from './formulario';

//Material UI
import Grid from "@material-ui/core/Grid";

//css
const styles = {
    grid:{
        width:"100%",
        height:"100%"
    },
    Colorido:{
        minHeight:"10vh",
        backgroundColor:"red"
    }
}

class Tabuleiro extends Component {   //componente do React
    constructor(props){
        super(props)

        this.state = {
            tabuleiro:[[1,0,1],[0,1,0],[1,0,1]]
        }
        this.props = props;
    }
    render(){
      const {classes} = this.props
      return(
        <Grid container className={classes.grid}>
        <Grid item xs={12}>  
        {this.state.tabuleiro.map((v)=>{
            let val = v;
            return (<Grid container>
                {val.map((v2)=>{
                    let value = v2;
                    console.log(value);
                    return(<Grid item xs={1} className={ value === 1 ? classes.Colorido : ""}></Grid>)
                })}
            </Grid>);
        })}
        </Grid>
    </Grid>
    )}  
}
//exportar com css(withStyles)
export default withStyles(styles)(Tabuleiro);
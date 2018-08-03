import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const API_URL = 'http://pokeapi.salestock.net/api/v2/pokemon/'

const styles = {
  main: { textAlign: 'center' },
  grid: { direction: 'row', justifyContent: 'center', textAlign: 'center', alignItems: 'center' },
  title: { margin: 30, fontFamily: 'Arial', fontWeight: 800, color: 'rgba(0, 124, 155, 0.664)' }
}


class Principal extends Component {
  constructor() {
    super()
    this.state = {}

    this.random = Math.floor(Math.random() * 100)
  }

  componentDidMount() {
    let url = API_URL + this.random
    if (url) {
      //console.log('Hace el llamado')
      fetch(url).then(d => d.json()).then(resp => this.setState({
        data: resp
      }))
    }
  }


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <div style={styles.main} id="hola" >

        <Grid container style={styles.grid} >

          <Grid item md={12} >
            <Typography variant="display3" style={styles.title} >Pokemon al azar</Typography>
          </Grid>

          {
            this.state.data ? <React.Fragment> <Grid item md={3} >
              <img src={this.state.data.sprites.front_default} height="300px" alt={this.state.data.name} />
            </Grid>


              <Grid item md={3} >
                <Typography gutterBottom variant="headline" component="h2">
                  {this.capitalize(this.state.data.name)}
                </Typography>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.data.weight} kg
                        </Typography>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.data.height * 10} cm
                        </Typography>
              </Grid>


            </React.Fragment> : <CircularProgress style={{ margin: 50, color: '#007C9B' }} size={60} />

          }

        </Grid>



      </div>
    );
  }
}

export default Principal;

import React, { Component } from 'react';
import { CircularProgress, Typography } from '@material-ui/core'
import CardPoke from '../utils/card'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom'



const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const styles = {
  main: { justifyContent: 'center', padding: 30, paddingTop: 0 },
  detalles: { textAlign: 'center', justifyContent: 'center', margin: 30 },
  volverBtn: { margin: 30, width: '50px', backgroundColor: '#007C9B', color: '#E6F4F1' },
  title: { margin: 30, fontFamily: 'Arial', fontWeight: 800, color: 'rgba(0, 124, 155, 0.664)' }
}


class Home extends Component {
  constructor() {
    super()
    this.state = {}

    this.offset = 1
    this.count = 1
    this.urlList = []
    this.page = 1

    this.clickedButton = this.clickedButton.bind(this)
    this.volver = this.volver.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentWillUnmount = () => (console.log('Unmounted'), this.mounted = false)

  componentDidMount() {
    this.mounted = true
    !this.state.data ? this.getData(API_URL) : null
  }

  getData(url) {
    
    fetch(url).then(d => d.json()).then(resp => resp.previous !== null ? this.setState({
      data: resp.results,
      next: resp.next,
      prev: resp.previous
    }
    ) : this.setState({
      data: resp.results,
      next: resp.next,
    }
    ))
  }


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  clickedButton(event) {
    
    this.setState({ poke: ' ' });
    fetch(event.target.id).then(d => d.json()).then(resp => this.setState({ poke: resp }))
  }

  volver() {
    this.setState({
      poke: null
    })
  }

  nextPage() {
    
    this.getData(this.state.next)
    this.offset += 20
    this.urlList = []
    this.page++
    this.setState({
      data: null
    })
    this.count = 1
  }

  previousPage() {
    
    this.getData(this.state.prev)
    this.offset -= 20
    this.urlList = []
    this.offset === 1 ? this.setState({ prev: null }) : null
    this.page--
    this.setState({
      data: null
    })
    this.count = 1
  }


  render() {
    return (
      <div style={styles.main} >

        <Grid container style={styles.main} >

          {
            !this.state.poke ? <div style={{ width: '100%', textAlign: 'center' }} >
              <img src={Logo} styles={{ width: '50%', display: 'block', height: '30%' }} alt="" />
            </div> : null
          }

          {
            this.state.poke ? (this.state.poke.sprites ?  
            
            <Grid item style={styles.detalles} >

                  <Typography variant="display4" style={styles.title} > {this.capitalize(this.state.poke.name)} </Typography>
                  <img src={this.state.poke.sprites.front_default} alt={this.state.poke.name} height="300px" />
                  <Typography variant="display2" >Peso: {this.state.poke.weight} kg </Typography>
                  <Typography variant="display2" >Altura: {this.state.poke.height * 10} cm </Typography>
                  <Typography variant="display2" >Velocidad: {this.state.poke.stats[0].base_stat} </Typography>
                  <Typography variant="display2" >Experiencia: {this.state.poke.base_experience} xp </Typography>
                  <Typography variant="display2" >Habilidad: {this.state.poke.abilities[0].ability.name} </Typography>
                  <Button variant="contained" size="large" onClick={this.volver} style={styles.volverBtn} >
                      <Link to='/personajes' style={{ textDecoration: 'none', color: '#E6F4F1' }} >Volver</Link>
                  </Button>

            </Grid> : <CircularProgress style={{ margin: 50, color: '#007C9B' }} size={60} />)

              :

              this.state.data && this.count ?

                this.state.data.map(data => {
  
                  this.count = null

                  return (<Grid item md={3} key={data.url} >
                    <CardPoke name={this.capitalize(data.name)} url={data.url} clickedButton={this.clickedButton} img={data.img} hash={data.name} />
                  </Grid>)
                }
                )

                : this.state.data ? this.state.data.map(data => {
                  return (<Grid item md={3} key={data.url} >
                    <CardPoke name={this.capitalize(data.name)} url={data.url} clickedButton={this.clickedButton} img={data.img} hash={data.name} />
                  </Grid>)
                })

                  : <CircularProgress style={{ margin: 50, color: '#007C9B' }} size={60} />
          }

          {
            this.state.data && !this.state.poke && this.state.prev ?
              <Link to={'/personajes/' + (this.page - 1)} style={{ textDecoration: 'none', color: '#007C9B' }} ><Button variant="contained" size="large" style={{ margin: 45, backgroundColor: '#E6F4F1', color: '#007C9B' }} onClick={this.previousPage}  >Anterior </Button></Link>
              : null
          }

          {
            this.state.data && !this.state.poke ?
              <Link to={'/personajes/' + (this.page + 1)} style={{ textDecoration: 'none', color: '#E6F4F1' }} ><Button variant="contained" size="large" style={{ margin: 45, backgroundColor: '#007C9B', color: '#E6F4F1' }} onClick={this.nextPage}  >Siguiente</Button></Link>
              : null
          }

        </Grid>

      </div>
    );
  }
}

export default Home;

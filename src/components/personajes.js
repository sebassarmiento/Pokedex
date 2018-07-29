import React, { Component } from 'react';
import { CircularProgress, Typography } from '@material-ui/core'
import CardPoke from '../utils/card'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Logo from '../img/pokelogo.png';



const API_URL = 'http://pokeapi.salestock.net/api/v2/pokemon/'

let offset = 1


const styles = {
  main: { justifyContent: 'center', padding: 30 },
  detalles: { textAlign: 'center', justifyContent: 'center', margin: 30 },
  volverBtn: { margin: 30, width: '50px' }
}

let urlList = []

let count = 1

class Home extends Component {
  constructor() {
    super()
    this.state = {}

    this.clickedButton = this.clickedButton.bind(this)
    this.volver = this.volver.bind(this)
    this.getMoreData = this.getMoreData.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }


  componentDidMount() {
    this.getData(API_URL)
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

  getMoreData(url) {
    let run = true
    const pokeList = this.state.data
    for(let i = 0; i < urlList.length; i++){
      if(url === urlList[i]){
        run = false
        console.log(url, urlList[i])
      }
    }
    if(run){
      fetch(url).then(d => d.json()).then(resp => {
        if (!pokeList[(resp.id - offset)].img) {
          console.log(this.state.data)
          urlList.push(url)
          pokeList[(resp.id - offset)] && resp.sprites.front_default ? pokeList[(resp.id - offset)].img = resp.sprites.front_default : pokeList[(resp.id - offset)].img = Logo
          console.log(pokeList, pokeList[(resp.order - offset)], (resp.order - offset))
          this.setState({
            data: pokeList
          })
        } else {
          console.log(resp, urlList);
        } 
       } )
    } else {
      console.log('No entra')
    }
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
    console.log(this.state.next)
    this.getData(this.state.next)
    count = 1
    offset += 20
    urlList = []
  }

  previousPage() {
    console.log(this.state.prev)
    this.getData(this.state.prev)
    count = 1
    offset -= 20
    urlList = []
    offset === 1 ? this.state.prev = null : null
  }

  loadImage() {
    console.log('llego imagen')
  }

  render() {
    return (
      <div style={styles.main} >

        <Grid container style={styles.main} >

          {
            this.state.poke ? (this.state.poke.sprites ? <Grid item style={styles.detalles} >

              <Typography variant="display4" color="primary" > {this.capitalize(this.state.poke.name)} </Typography>
              <img src={this.state.poke.sprites.front_default} alt={this.state.poke.name} height="300px" />
              <Typography variant="display2" >Peso: {this.state.poke.weight} kg </Typography>
              <Typography variant="display2" >Altura: {this.state.poke.height * 10} cm </Typography>
              <Typography variant="display2" >Velocidad: {this.state.poke.stats[0].base_stat} </Typography>
              <Typography variant="display2" >Experiencia: {this.state.poke.base_experience} xp </Typography>
              <Typography variant="display2" >Habilidad: {this.state.poke.abilities[0].ability.name} </Typography>
              <Button variant="contained" color="primary" size="large" onClick={this.volver} style={styles.volverBtn} >Volver</Button>
            </Grid> : <CircularProgress style={{ margin: 50 }} size={60} />)

              :

              this.state.data && count ?

                this.state.data.map(data => {
                  console.log('Mapea')
                  count = null
                  !data.img ? this.getMoreData(data.url) : null

                  return (<Grid item md={3} key={data.url} >
                    <CardPoke name={this.capitalize(data.name)} url={data.url} clickedButton={this.clickedButton} img={data.img} />
                  </Grid>)
                }
                )

                : this.state.data ? this.state.data.map(data => {
                  return (<Grid item md={3} key={data.url} >
                    <CardPoke name={this.capitalize(data.name)} url={data.url} clickedButton={this.clickedButton} img={data.img} />
                  </Grid>)
                } ) 




                : <CircularProgress style={{ margin: 50 }} size={60} />
          }

          {
            this.state.data && !this.state.poke && this.state.prev ? <Button variant="contained" color="default" size="large" style={{ margin: 45 }} onClick={this.previousPage}  >
              Anterior
                            </Button> : null
          }

          {
            this.state.data && !this.state.poke ? <Button variant="contained" color="primary" size="large" style={{ margin: 45 }} onClick={this.nextPage}  >
              Siguiente
                              </Button> : null
          }

        </Grid>

      </div>
    );
  }
}

export default Home;

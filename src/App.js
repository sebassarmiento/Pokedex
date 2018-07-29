import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Principal from './components/principal'
import Personajes from './components/personajes'
import Contacto from './components/contact'
import Navigation from './utils/navigation'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div id="chau" >
      <Navigation />
        <Switch>
          <Route path="/" exact component={Principal} />
          <Route path="/personajes" component={Personajes} />
          <Route path="/contact" component={Contacto} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

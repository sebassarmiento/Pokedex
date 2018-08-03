import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import logo from '../img/pokelogo.png'

const styles = {
    navLink: {textDecoration: 'none', justifyContent: 'center'},
    navButton: {marginLeft: 20, padding: 10, fontSize: 18, color: '#E6F4F1' },
    main: {backgroundColor: '#007C9B'}
}

class Home extends Component {
    render() {
        return (
            <div >
                <AppBar position="static" style={styles.main} >
                    <Toolbar>
                    <span style={{marginRight: 12 }} ><img src={logo} height="30px" alt="Pokemon Logo" /> </span>
                        <Typography variant="title" color="inherit">
                            
                            Pokedex
                        </Typography>
                        <NavLink to='/' style={styles.navLink} >
                            <div style={styles.navButton} >Principal</div>
                        </NavLink>
                        <NavLink to='/personajes' style={styles.navLink}>
                            <div style={styles.navButton} >Personajes</div>
                        </NavLink>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Home;

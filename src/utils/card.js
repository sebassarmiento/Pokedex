import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';




const styles = {
    card: { textAlign: 'center', height: 300 },
    main: { margin: 20 },
    btn: { textAlign: 'center', padding: 10, fontSize: 16, borderRadius: 20, backgroundColor: '#8bc34a', color: '#424242', cursor: 'pointer' },
    img: {height: 200},
    loading: {marginBottom: 135}
}

class CardPoke extends Component {
    render() {
        return (
                <Card  style={ styles.main }  >
                    
                    <CardContent style={styles.card} >
                        
                        {
                            this.props.img ? <img src={this.props.img} alt=""  height="200px" /> : <CircularProgress  style={styles.loading} />
                        }

                        <Typography gutterBottom variant="display1" component="h2">
                            {this.props.name}
                        </Typography>

                        <button onClick={this.props.clickedButton} id={this.props.url} style={styles.btn} >
                            Ver mas...
                        </button> 

                    </CardContent>
                </Card>

        );
    }
}

export default CardPoke;

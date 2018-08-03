import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';



const styles = {
    card: { textAlign: 'center', height: 300 },
    main: { margin: 20, backgroundColor: 'rgba(255, 255, 255, 0.589)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' },
    btn: { textAlign: 'center', padding: 8, paddingLeft: 20, paddingRight: 20, marginTop: 8, fontSize: 14, fontWeight: 600, borderRadius: 10, backgroundColor: '#F49431', color: '#E6F4F1', cursor: 'pointer' },
    img: { height: 200 },
    loading: { marginBottom: 100, marginTop: 50, color: '#007C9B' }
}

class CardPoke extends Component {
    render() {
        return (
            <Card style={styles.main}  >

                <CardContent style={styles.card} >

                    {
                        this.props.img ? <img src={this.props.img} alt="" height="200px" /> : <CircularProgress style={styles.loading} />
                    }

                    <Typography gutterBottom variant="display1" component="h2">
                        {this.props.name}
                    </Typography>


                    <Link to={'/personajes/' + this.props.hash} style={{ textDecoration: 'none', color: '#E6F4F1' }} url={this.props.url} onClick={this.props.clickedButton} ><button id={this.props.url} style={styles.btn} >VER MAS</button></Link>


                </CardContent>
            </Card>

        );
    }
}

export default CardPoke;

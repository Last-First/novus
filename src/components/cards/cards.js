import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box
} from '@material-ui/core';
import { connect } from 'react-redux';
import Add from './add/add';
import Open from './open/open';
import moment from 'moment';
import 'aos/dist/aos.css'
import AOS from 'aos';
import classes from './cards.module.css'
import ActionCard from './cardactions/cardactions';
import CardStatus from './cardstatus/cardstatus';

const Cards = (props) => {
    AOS.init();
    let cards = null
    if (props.games) {
        cards = props.games.map((card) => (
            <Grid key={card.uuid} xs={12} sm={6} md={4} item data-aos="fade-up">
                <Card className={classes.card}>
                    <Open link={card.url}/>
                    <ActionCard card={card} uuid={card.uuid} page={props.page} genre={props.genre} />
                    <CardContent className={classes.cardContent}>
                        <Box>
                            <Typography className={classes.gameName}>{card.game_name} </Typography>
                            <Typography className={classes.Typography}>by {card.publisher}</Typography>
                        </Box>
                        <Box className={classes.gameDetails}>
                            <Typography className={classes.Typography}>{card.version}</Typography>
                            <Typography className={classes.Typography}>{moment(card.release_date).format('MMMM Do YYYY')}</Typography>
                            <Typography className={classes.Typography}>{card.genre}</Typography>
                        </Box>
                    </CardContent>
                    <CardStatus card={card} uuid={card.uuid} status={card.status} />
                </Card>
            </Grid>
        ))
    }
    return (
        <React.Fragment>
            <Add />
            {cards}
            <div data-aos="fade-up" />
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        games: state.games,
        genre: state.genre
    };
}

export default connect(mapStateToProps, null)(Cards);
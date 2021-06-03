import React from 'react'
import { CssBaseline, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        height: '87vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?wwe,football,cricket,hockey)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

}));
const Home = () => {
    const classes = useStyles();
    return (
        <div>
        
            <Grid container component="main" className={classes.root} >
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} className={classes.image} />
            </Grid>
        </div>
    )
}

export default Home

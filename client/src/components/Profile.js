import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from "react-redux";
import UpdatePassword from './UpdatePassword';
import UpdateDetails from './UpdateDetails';
const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard() {
    const { auth } = useSelector((state) => ({ ...state }));
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {auth.user.firstName[0]}
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                        <UpdatePassword />
                        <UpdateDetails />

                    </IconButton>
                }
                title={auth.user.firstName + " " + auth.user.lastName}
                subheader={`Joined ${moment(auth.user.createdAt).fromNow()}`}
            />

            <CardMedia
                className={classes.media}
                image={auth.user.picUrl}
                title="Paella dish"
            />
            <CardContent>
                <h1>Email: {auth.user.email}</h1>
                {auth.user.DOB && (
                    <>
                        <h1>DOB: {auth.user.DOB}</h1>
                    </>
                )}

                {auth.user.gender && (
                    <h1>Gender: {auth.user.gender}</h1>
                )}

            </CardContent>


        </Card>

    );
}

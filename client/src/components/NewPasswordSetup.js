import React, { useState } from 'react';
import { useParams } from 'react-router-dom'


import { toast } from "react-toastify";
import { changePassword, login } from "../actions/auth";
import { useDispatch } from "react-redux";

import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '85vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?cricket,basketball)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ForgotPasswordSetup({ history }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [details, setDetails] = useState({
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const { token } = useParams();
    console.log(token);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const password = details.password;
        const confirmPassword = details.password;
        if (password !== confirmPassword) {
            toast.error("Password do not Match.");
        }
        else {
            try {
                const res = await changePassword(password, token);
                console.log("Response", res);
                toast.success(res.data);
                history.push('/login');

            } catch (error) {
                console.log("Error:", error);
                toast.error(error.response.data);
                if (error && error.response && error.response.status === 400) {
                    toast.error(error.response.data);
                }
                else {
                    toast.error(error);
                }
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root} >
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                   </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            error={details.password === ""}
                            helperText={details.password === "" ? 'Empty!' : ' '}
                            onChange={handleChange}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            error={details.confirmPassword === "" || details.password != details.confirmPassword}
                            helperText={details.confirmPassword === "" ? 'Empty!' : details.confirmPassword != details.password ? "Password don't match" : " "}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword1(!showPassword1)}
                                        >
                                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!details.password || !details.confirmPassword || details.password!=details.confirmPassword}
                        >
                            Submit
            </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


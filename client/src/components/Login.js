import React, { useState } from 'react';
import { Link } from 'react-router-dom'


import { toast } from "react-toastify";
import { login } from "../actions/auth";
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
import ForgotPassword from './ForgotPassword';
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

export default function Login({ history }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({ email: details.email, password: details.password });
      if (res.data) {
        console.log("Save User res in REDUX and also in Local Storage ===> ");
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        toast.success("Login Success");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400)
        toast.error(err.response.data);
    }
  };
  const validEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return (true);
    }
    return (false)
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
            Sign In
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={details.email === "" || !validEmail(details.email)}
              helperText={details.email === "" ? 'Empty!' : !validEmail(details.email) ? 'Invalid Email' : ' '}
              onChange={handleChange}
            />
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              error={details.email === ""}
              disabled={!details.email || !details.password || !validEmail(details.email)}

            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                <ForgotPassword />
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


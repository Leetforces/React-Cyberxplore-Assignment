import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField,  InputAdornment, IconButton } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal() {

    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const [details, setDetails] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",

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


        } catch (err) {
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Link variant="body2" onClick={handleOpen}>
                Update Password
            </Link>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1 style={{ textAlign: "center" }}>Update Password</h1>
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
                            name="newPassword"
                            label="New Password"
                            type={showPassword1 ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={details.newPassword === "" }
                            helperText={details.newPassword === "" ? 'Empty!'  : " "}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            type={showPassword2 ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={details.confirmNewPassword === "" || details.newPassword !== details.confirmNewPassword}
                            helperText={details.confirmNewPassword === "" ? 'Empty!' : details.confirmNewPassword !== details.newPassword ? "Password don't match" : " "}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword2(!showPassword2)}
                                        >
                                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
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
                            onClick={handleSubmit}
                            disabled={!details.password || !details.newPassword || !details.confirmNewPassword || details.newPassword!==details.confirmNewPassword}
                        >
                            Submit
                            </Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
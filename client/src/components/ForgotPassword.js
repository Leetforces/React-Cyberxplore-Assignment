import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';
import { resetPassword ,validEmail} from '../actions/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


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
    const [email, setEmail] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpen(false);
        console.log("Email", email);

        try {

            const res = await resetPassword(email);

            console.log("Response", res);
            toast.success(res.data.data);
            // history.push('/login');

        } catch (error) {
            console.log("Error:", error);
            if (error && error.response && error.response.status === 400) {
                toast.error(error.response.data);

            }
            else {
                toast.error(error);
            }
        }

    }

    return (
        <div>
            <Link variant="body2" onClick={handleOpen}>
                Forgot password?
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
                        <h1 style={{ textAlign: "center" }}>Reset Password</h1>
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
                            error={email === "" || !validEmail(email)}
                            helperText={email === "" ? 'Empty!' : !validEmail(email) ? 'Invalid Email' : ' '}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={!email || !validEmail(email)}
                        >
                            Submit
                            </Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
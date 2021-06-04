import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';




import { updatePassword2 } from '../actions/auth'
import { useSelector } from 'react-redux';
import UpdateDetailsForms from './UpdateDetailsForm';


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

export default function UpdateDetails() {
    const { auth } = useSelector((state) => ({ ...state }));
    const classes = useStyles();
    const [open, setOpen] = useState(false);



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
    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpen(false);

        try {
            const password = details.password;
            const newPassword = details.newPassword;
            const token = auth.token;
            const res = await updatePassword2(token, password, newPassword);

            console.log("Response", res);
            if (res && res.data)
                toast.success(res.data);

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


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen} color="primary" variant="outlined">Update Details</Button>
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
                        <h1 style={{ textAlign: "center" }}>Update Details</h1>
                        <UpdateDetailsForms
                            open={open}
                            setOpen={setOpen}

                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
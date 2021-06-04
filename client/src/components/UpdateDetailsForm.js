import React, { useState, useEffect } from 'react';
import { TextField, Grid,  Select, InputLabel } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


import { toast } from "react-toastify";
import { uploadImage, updateallDetails, updateUserInLocalStorage } from '../actions/auth'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        // height: '45vh',
        minHeight: ' 65vh',
        minWidth: '70vw'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random?football)',
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

var tempUrl="";
export default function UpdateDetailsForms({ open, setOpen }) {
    const classes = useStyles();
    const { auth } = useSelector((state) => ({ ...state }));
    const [image, setImage] = useState("");
    const[imgUrl,setImgUrl]= useState("");
    const dispatch = useDispatch();

    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        DOB: "",
        gender: "",
        picUrl: "",

    })

    useEffect(() => {
        const user = auth.user;
        if (user) {
            handleChange1("firstName", user.firstName);
            handleChange1("lastName", user.lastName);
            handleChange1("email", user.email);
            handleChange1("picUrl", user.picUrl);

            if (user.DOB)
                handleChange1("DOB", user.DOB);
            if (user.gender)
                handleChange1("gender", user.gender);
            if (user.picUrl)
                handleChange1("picUrl", user.picUrl);
            }
            tempUrl="";

    }, [])

    const handleChange1 = (name, value) => {
        setDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })

        console.log(value, name);
    }
    const uploadImg = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "jadavpur-university");
        try {
            const res = await uploadImage(data);
            console.log("Image upload response====>", res);
            console.log("Image url========>", res.data.url);
            
            const value=res.data.url;
            tempUrl=value;
            await setImgUrl(value);


        } catch (err) {
            console.log("Error: ", err);
            toast.error("Error while uploading picture", err.response.data);
        }

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            if (image) {
                await uploadImg();
            }
            const firstName = details.firstName;
            const lastName = details.lastName;
            const email = details.email;
            const DOB = details.DOB;
            
            const gender = details.gender;
            const token = auth.token;
            let picUrl = details.picUrl;

            if(tempUrl) {
                picUrl=tempUrl;
            }
           
            console.log(firstName, lastName, email, DOB, gender, picUrl);

            const res = await updateallDetails(
                token, firstName, lastName, email, DOB, gender, picUrl
            );

            console.log("Registered User ===> ", res);
            toast.success("Data Update Successfully");
            if (res.data) {
                updateUserInLocalStorage(res.data.user);
                const data= {
                    token:auth.token,
                    user: res.data.user,
                }
                console.log("final Data====>",data);

                dispatch({
                    type: "UPDATE",
                    payload: data,
                  });
            }
            setOpen(false);
            } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400) toast.error(err.response.data);
            else {
                console.log("Error in Update the details");
                toast.error("Error in Update the details")
            }
            setOpen(false);
        }
    };
    const validEmail = (email) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (true);
        }
        return (false)
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={3} md={5} className={classes.image} />
            <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>


                    <form className={classes.form} noValidate onSubmit={handleSubmit}>

                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload Image
                            <input type="file"
                                // hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Button>
                        <br />
                        <br />
                        <Grid container spacing={2} justify="space-around">
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={details.firstName}
                                    onChange={handleChange}
                                    error={details.firstName === ""}
                                    helperText={details.firstName === "" ? 'Empty!' : ' '}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={details.lastName}
                                    onChange={handleChange}
                                    error={details.lastName === ""}
                                    helperText={details.lastName === "" ? 'Empty!' : ' '}
                                />
                            </Grid>
                        </Grid>
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
                            value={details.email}
                            onChange={handleChange}
                            error={details.email === "" || !validEmail(details.email)}
                            helperText={details.email === "" ? 'Empty!' : !validEmail(details.email) ? 'Invalid Email' : ' '}
                        />

                        <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
                        <Select
                            native
                            name='gender'
                            value={details.gender}
                            onChange={handleChange}
                            label="gender"
                            inputProps={{
                                name: 'gender',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Others"}>Others</option>
                        </Select>
                        <br />
                        <br />
                        <TextField
                            id="date"
                            label="Date Of Birth"
                            name="DOB"
                            type="date"
                            onChange={handleChange}
                            defaultValue={details.DOB}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!details.email || !details.firstName || !details.lastName || !validEmail(details.email)}
                        >
                            Submit
                      </Button>


                    </form>

                </div>
            </Grid>
        </Grid>
    );
}


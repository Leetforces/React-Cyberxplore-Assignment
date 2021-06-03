import React, { useState, useEffect } from 'react'
import { AppBar, Button, CssBaseline, IconButton, List, ListItem, ListItemText, makeStyles, Menu, MenuItem, SwipeableDrawer, Tab, Tabs, Toolbar, useMediaQuery, useScrollTrigger, useTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/logo.svg'
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,  //default false
        threshold: 0,  //default to 100
        // target: props.window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar, //  minHeight:56,
        marginBottom: "1.5rem",    //add extra bottom margin to see all content (because size of logo increases)
        [theme.breakpoints.down("md")]: {
            minHeight: 35,
            // marginBottom:"0rem",
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: 35,
        }

    },
    logo: {
        marginLeft: "1rem",
        height: "5rem",
        [theme.breakpoints.down("md")]: {
            height: "4rem",
        },
        [theme.breakpoints.down('xs')]: {
            height: "3rem",
        }


    },
    tabContainer: {
        marginLeft: 'auto',
        '& .MuiTab-wrapper': {
            ...theme.typography.tab,
            minWidth: '10px',
            marginRight: "25px",
            fontSize: "1rem"
        }


    },
    button: {
        borderRadius: "50px",
        marginLeft: "10px",
        marginRight: "10px",
        fontSize: "1rem",
        textTransform: "none",
        height: "45px",
        color: "white",
    },
    logoButton: {
        padding: "0px",
        "&:hover": {
            backgroundColor: "transparent",
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,

    },
    listItemParent: {
        "& .MuiListItemText-root": {
            ...theme.typography.tab,
            color: "white",
            opacity: '0.7',
            "&:hover": {
                opacity: 1,
            }
        }
    },
    drawerItemButton: {
        backgroundColor: theme.palette.common.orange,

    },
}))


export default function TopNav() {

    //auth to check user is login or not
    const { auth } = useSelector((state) => ({ ...state }));

    const theme = useTheme(); //theme 
    const matches = useMediaQuery(theme.breakpoints.down(600)); // breakpoint to show tab or drawer
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const classes = useStyles();  //our own styles defined above





    const [value, setValue] = useState(0);  //to show the active tab or list
    const [value2, setValue2] = useState(0);  //to show the active tab or list
    const [openDrawer, setOpenDrawer] = useState(0);  // open the drawer on clicking the menu

    //use in logout
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        

        setValue(1);// active link become /login  (for not login user)
        setValue2(0); //active link become /   for login user
        window.localStorage.removeItem("auth");
        history.push("/login");
    };


    //set the active tab
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    }

    // to show initially which tab is active  0-> first tab 1->second tab and so on
    useEffect(() => {
        const path = window.location.pathname;

        switch (path) {
            case "/": setValue(0); setValue2(0); break;
            case "/login": setValue(1); break;
            case "/register": setValue(2); break;
            case "/profile": setValue2(1); break;
            default: break;
        }
    }, []);



    const tabs = (
        <>

            {/* user is login */}
            {auth &&
                (<>
                    <Tabs
                        value={value2}
                        onChange={handleChange2}
                        className={classes.tabContainer}
                        indicatorColor="primary" //same as nav color
                    >
                        <Tab label="Home" component={Link} to="/"> </Tab>
                        <Tab label="Profile" component={Link} to="/profile"> </Tab>
                    </Tabs>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </>)}


            {/* user is not login */}
            { auth === null && (<>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.tabContainer}
                    indicatorColor="primary" //same as nav color
                >
                    <Tab label="Home" component={Link} to="/"> </Tab>
                    <Tab label="SignIn" component={Link} to="/login"> </Tab>
                    <Tab label="SignUp" component={Link} to="/register"> </Tab>
                </Tabs>



            </>)}

        </>
    )


    const drawer = (
        <>
            {/* user is login */}
            {auth &&
                (<>
                    <SwipeableDrawer
                        disableBackdropTransition={!iOS}
                        disableDiscovery={iOS}
                        open={openDrawer}
                        onOpen={() => setOpenDrawer(true)}
                        onClose={() => setOpenDrawer(false)}
                        classes={{ paper: classes.drawer }}
                    >
                        <List disablePadding className={classes.listItemParent}>
                            <ListItem selected={value === 0} onClick={() => { setOpenDrawer(false); setValue(0) }} divider button component={Link} to="/">
                                <ListItemText disableTypography>Home</ListItemText>
                            </ListItem>

                            <ListItem selected={value === 1} onClick={() => { setOpenDrawer(false); setValue(1) }} divider button component={Link} to="/profile">
                                <ListItemText disableTypography>Profile</ListItemText>
                            </ListItem>

                            <ListItem selected={value === 2} className={classes.drawerItemButton} onClick={() => { setOpenDrawer(false); setValue(2); logout() }} divider button component={Link} >
                                <ListItemText disableTypography>Logout</ListItemText>
                            </ListItem>

                        </List>
                    </SwipeableDrawer>

                </>)}


            {/* user is not login */}
            { auth === null && (<>

                <SwipeableDrawer
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                    open={openDrawer}
                    onOpen={() => setOpenDrawer(true)}
                    onClose={() => setOpenDrawer(false)}
                    classes={{ paper: classes.drawer }}
                >
                    <List disablePadding className={classes.listItemParent}>
                        <ListItem selected={value === 0} onClick={() => { setOpenDrawer(false); setValue(0) }} divider button component={Link} to="/">
                            <ListItemText disableTypography>Home</ListItemText>
                        </ListItem>
                        <ListItem selected={value === 1} onClick={() => { setOpenDrawer(false); setValue(1) }} divider button component={Link} to="/login">
                            <ListItemText disableTypography>Login</ListItemText>
                        </ListItem>

                        <ListItem selected={value === 2} onClick={() => { setOpenDrawer(false); setValue(2) }} divider button component={Link} to="/register">
                            <ListItemText disableTypography>Register</ListItemText>
                        </ListItem>

                    </List>
                </SwipeableDrawer>


            </>)}

            {/* Menu Icon */}
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </>
    )





    return (
        <>
            <CssBaseline />
            <ElevationScroll>
                <AppBar >
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoButton} onClick={() => { setValue(0); setValue2(0) }} disableRipple>
                            <img src={logo} alt="Logo" className={classes.logo} /> anish
                        </Button>

                        {matches ? drawer : tabs}

                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            {/* give a minHeight so that content come outside the App Bar */}
            {matches && (<>
                <br />
            </>)}
            <div className={classes.toolbarMargin}></div>
        </>
    )
}






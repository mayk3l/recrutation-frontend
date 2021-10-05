import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import history from "../../routing/history";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function Navbar() {
    const classes = useStyles();
    const handleClick = () => {
        const token = localStorage.getItem('token')
        if (token) history.push('/')
        else history.push('/register')
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/');
    }

    const handleLogin = () => {
        const firstTimeLogged = localStorage.getItem("firstTimeLogged");
        if (!firstTimeLogged) history.push('/')
        else history.push('/sms')
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Healfy
                    </Typography>
                    <Button variant="contained" className="btn btn-success" onClick={() => history.push("/Login")}>Log In</Button>
                    <Button variant="contained" className="btn btn-success" onClick={() => handleClick()}>Sign Up</Button>
                    <Button variant="contained" className="btn btn-success" onClick={() => handleLogout()}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: "#93CB56",
        color: "#355A20"
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
        backgroundColor: "#355A20",
        color: "white",
        '&:hover': {
            backgroundColor: "#47792A",
            color: '#FFF'
        }
    },
}));



function BottomNavbar(props) {

    const classes = useStyles();

    const goToAddBench = () => {
        props.history.push(`/bench/new`);
    }

    return (
        <div>
            <AppBar position="fixed" color="primary" className={classes.appBar} title={"Create a new bench"}>
                <Toolbar>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => { goToAddBench() }}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(BottomNavbar);
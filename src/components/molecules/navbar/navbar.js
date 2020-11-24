import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MapIcon from '@material-ui/icons/Map';
import { withRouter } from "react-router-dom";
import clsx from 'clsx';
import Logo from './../../../logo.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: "5px",
    marginBottom: "50px",
    background: "#93CB56",
    color: "#355A20"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = props => {
  const classes = useStyles();

  const goToLogin = () => {
    props.history.push(`/login/`);
  };

  const goToHomePage = () => {
    props.history.push(`/`);
  };

  const goToMaps = () => {
    props.history.push(`/maps`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.root)}>
        <Toolbar>
          <Button onClick={() => { goToHomePage() }} >
            <img src={Logo} alt="" width={'100px'} />
          </Button>


          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => { goToMaps() }}
            color="inherit"
          >
            <PlaceIcon />
          </IconButton>
          {/* <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            //   onClick={console.log(1)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton> */}

          {/* <Button color="inherit"  >Login</Button> */}

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            //   onClick={console.log(1)}
            color="inherit"
            onClick={() => { goToLogin() }}
            edge="end"
          >
            <ExitToAppIcon />
          </IconButton>

        </Toolbar>

      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);

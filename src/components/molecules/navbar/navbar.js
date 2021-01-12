import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar } from '@material-ui/core';
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
import PersonIcon from '@material-ui/icons/Person';
import SessionHandlerContext from '../../other/context/SessionHandlerContext';


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
  avatar: {
    backgroundColor: "#355A20"
  }
}));

const Navbar = props => {

  const { user, logout } = useContext(SessionHandlerContext);

  const classes = useStyles();

  const goToLogin = () => {
    props.history.push(`/login`);
  };

  const goToHomePage = () => {
    props.history.push(`/`);
  };

  const goToMaps = () => {
    props.history.push(`/maps`);
  };

  const goToAccount = () => {
    props.history.push(`/account`)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.root)}>
        <Toolbar>
          <Button
            onClick={goToHomePage}
            title={"Go to home page"}
          >
            <img src={Logo} alt={"Brand bench app"} width={'100px'} />
          </Button>
          <IconButton
            onClick={goToMaps}
            title={"Go to map overview"}
          >
            <PlaceIcon />
          </IconButton>
          {user == null ?
            <IconButton
              color="inherit"
              onClick={goToLogin}
              edge="end"
              title={"Get signed in"}
            >
              <PersonIcon />
            </IconButton>
            :
            <div>
              <IconButton
                onClick={goToAccount}
                title={"My account - " + user.firstName + " " + user.lastName}
              >
                <Avatar className={classes.avatar}>
                  {user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase()}
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => logout()}
                title={"Get logged out"}
              >
                <ExitToAppIcon/>
              </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);

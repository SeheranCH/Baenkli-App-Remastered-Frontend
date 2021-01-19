import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../molecules/navbar/Navbar"
import { makeStyles, Grid } from '@material-ui/core';
import LoginForm from '../../organisms/loginForm/LoginForm'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10%",
  },
}));

const LoginPage = () => {

  const classes = useStyles();

  return (
    <Fragment>
      <Navbar />
      <Grid
        container
        className={classes.root}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <LoginForm />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Fragment>
  );
};

export default LoginPage;
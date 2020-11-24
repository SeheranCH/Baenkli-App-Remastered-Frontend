import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/navbar"
import PostCard from "../../molecules/card/card"
import Grid from '@material-ui/core/Grid';
import Login from '../../organisms/loginForm/loginForm'

const LoginPage = () => {

  return (
    <Fragment>
      <Navbar />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
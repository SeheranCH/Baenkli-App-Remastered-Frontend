import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/Navbar"
import PostCard from "../../molecules/card/Card"
import Grid from '@material-ui/core/Grid';
import LoginForm from '../../organisms/loginForm/LoginForm'

const LoginPage = () => {

  return (
    <Fragment>
      <Navbar />
      <LoginForm />
    </Fragment>
  );
};

export default LoginPage;
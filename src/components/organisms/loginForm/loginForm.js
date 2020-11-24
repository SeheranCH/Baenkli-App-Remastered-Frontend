import React, { useState } from "react";
import { Container, Grid, Link, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

/**
 * This is the login page
 */

const Login = props => {

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop:"10%",
    },
    paper: {
      flexGrow: 1,
      paddingTop: "50px",
      paddingBottom: "50px",
      // margin: "15px",

      background: "#e6f3d8",
      color: "black"
    },
    heading: {
      color: "#47792A",
      textAlign: "center"
    },
    subButton: {
      backgroundColor: "#355A20",
      color: "white",
      '&:hover': {
        backgroundColor: "#47792A",
        color: '#FFF'
      }

    },
    resButton: {

    }
  }));

  const classes = useStyles();

  const [loginFailed, setLoginFailed] = useState("");


  return (

    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("validationEmail")
                .required("validationEmailRequired"),
              password: Yup.string().required(
                "validationPasswordRequired"
              )
            })}
            onSubmit={(values, actions) => {
            }}
          >
            {({ handleSubmit, isValid, isSubmitting }) => {
              return (
                <Form
                  name="login"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  {" "}
                  <center>
                    Login
                        </center>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label={"Email"}
                      name="email"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label={"Password"}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      buttontype="default"
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={!isValid || isSubmitting}
                      className={classes.subButton}
                    >Login </Button>
                  </Grid>

                </Form>
              );
            }}
          </Formik>

        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
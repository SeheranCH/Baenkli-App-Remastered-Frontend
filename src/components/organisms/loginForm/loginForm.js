import React, { useState, useEffect, useContext } from "react";
import { Container, Paper, Switch, TextField, Button, makeStyles, withStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../../other/validation/LoginValidationSchema";
import SessionHandlerContext from "../../other/context/SessionHandlerContext";
import { Link } from "react-router-dom";
import OwnButton from "../../atoms/ownButton/OwnButton";

/**
 * This is the login page
 */

// TO DO: fix height between form elements in case of showing error messages

const LoginForm = props => {

  const GreenSwitch = withStyles({
    switchBase: {
      color: "#F3FAF0",
      '&$checked': {
        color: "#355A20",
      },
      '&$checked + $track': {
        backgroundColor: "#355A20",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const useStyles = makeStyles((theme) => ({
    paper: {
      flexGrow: 1,
      paddingTop: "50px",
      paddingBottom: "50px",
      background: "#e6f3d8",
      color: "black",
    },
    heading: {
      color: "#47792A",
      textAlign: "center"
    },
    submitButton: {
      backgroundColor: "#355A20",
      color: "white",
      '&:hover': {
        backgroundColor: "#47792A",
        color: '#FFF'
      }

    },
    resButton: {

    },
    formElement: {
      margin: "20px",
      textAlign: "center"
    },
    title: {
      textAlign: "center"
    },
    switch: {

    },
    footer: {
      textAlign: "center"
    },
    link: {
      textDecoration: "none"
    }
  }));

  const classes = useStyles();

  const { login } = useContext(SessionHandlerContext);

  const [showPassword, setShowPassword] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const [textPassword, setTextPassword] = useState("Show password")

  const changePasswordType = () => {
    setTypePassword(showPassword ? "text" : "password");
    setTextPassword(showPassword ? "Hide password" : "Show password")
  };

  useEffect(() => {
    changePasswordType();
    // eslint-disable-next-line
  }, [showPassword])

  return (
      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          enableReinitialize
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ handleSubmit, handleChange, errors, touched, isSubmitting }) => {
            return (
              <Form
                name="login"
                method="post"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <p className={classes.title}>
                  <b>
                    Login
                  </b>
                </p>
                <div className={classes.formElement}>
                  <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    label={"Email"}
                    disabled={isSubmitting}
                    error={errors.email && touched.email}
                    helperText={touched.email ? errors.email : null}
                  />
                </div>

                <div className={classes.formElement}>
                  <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    label={"Password"}
                    type={typePassword}
                    disabled={isSubmitting}
                    error={errors.password && touched.password}
                    helperText={touched.password ? errors.password : null}
                  />
                </div>
                <div className={classes.formElement}>
                  <GreenSwitch
                    className={classes.switch}
                    checked={showPassword}
                    onChange={() => {
                      setShowPassword(!showPassword);
                    }}
                    color="primary"
                  />
                  {textPassword}
                </div>
                <div className={classes.formElement}>
                  <OwnButton
                    typeOfButton={'submit'}
                    disabled={isSubmitting}
                    text={"Login"}
                  />
                </div>
                <div className={classes.footer}>
                  <p> Have you no account yet?</p>
                  <Link className={classes.link} to="/signup">Sign up now</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Paper>
  );
};

export default LoginForm;
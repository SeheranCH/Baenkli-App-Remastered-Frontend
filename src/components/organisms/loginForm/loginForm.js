import React, { useState, useEffect, useContext } from "react";
import { Container, Paper, Switch, TextField, Button, makeStyles, withStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../../other/validation/LoginValidationSchema";
import SessionHandlerContext from "../../other/context/SessionHandlerContext";

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
    root: {
      marginTop: "10%",
    },
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
    subButton: {
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

    <Container className={classes.root}>
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
                  <Button
                    buttontype="default"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    className={classes.subButton}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default LoginForm;
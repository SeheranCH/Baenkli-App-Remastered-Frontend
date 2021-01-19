import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles, TextField, Typography, Button, Switch, Paper, Container } from "@material-ui/core";
import { Formik } from "formik";
import { CreateUserValidationSchema } from "../../other/validation/CreateUserValidationSchema";
import { UpdateUserValidationSchema } from "../../other/validation/UpdateUserValidationSchema";
import UserService from "../../../service/UserService";
import SessionHandlerContext from "../../other/context/SessionHandlerContext";
import {useHistory } from "react-router-dom";
import OwnButton from "../../atoms/ownButton/OwnButton";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     margin: "5%"
    // },
    paper: {
        flexGrow: 1,
        paddingTop: "50px",
        paddingBottom: "50px",
        background: "#e6f3d8",
        color: "black",
    },
    title: {
        textAlign: "center"
    },
    inputs: {
        textAlign: "center",
        margin: "20px",
    },
    input: {
        marginLeft: "20px",
    },
    button: {
        backgroundColor: "#87C4F4"
    },
    helperText: {
        margin: "10px"
    },
    link: {
        textDecoration: "none"
    },
    switch: {
        margin: "10px"
    },
    footer: {
        textAlign: "center",
        margin: "20px"
    },
    submitButton: {
        backgroundColor: "#355A20",
        color: "white",
        '&:hover': {
          backgroundColor: "#47792A",
          color: '#FFF'
        }
  
      },
}));

const UserForm = ({ initialObject, modeRegister, goToLogin }) => {

    const { setActiveUser } = useContext(SessionHandlerContext);

    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [textShowPassword, setTextShowPassword] = useState("Show password")
    const classes = useStyles();

    const changePasswordType = () => {
        setTypePassword(showPassword ? "text" : "password");
        setTextShowPassword(!showPassword ? "Show password" : "Hide password")
    }

    useEffect(() => {
        changePasswordType();
        // eslint-disable-next-line
    }, [showPassword])

    return (

            <Paper className={classes.paper}>
                <Formik
                    initialValues={initialObject}
                    enableReinitialize
                    validationSchema={modeRegister ? CreateUserValidationSchema : UpdateUserValidationSchema}
                    onSubmit={(values) => {
                        var dto = { ...initialObject, ...values };
                        if (values.password === null || values.password === "") {
                            delete dto.password;
                        }
                        delete dto.emailRepeat;
                        delete dto.passwordRepeat;
                        if (modeRegister) {
                            UserService.create(dto)
                                .then(() => {
                                    history.push('/login')
                                })
                                .catch(err => {
                                    console.error('Error in UserForm: ', err);
                                })
                        } else {
                            UserService.update(dto.id, dto)
                                .then((res) => {
                                    setActiveUser(res.data);
                                })
                                .catch(err => {
                                    console.error('Error in UserForm: ', err);
                                })
                        }
                    }}
                >
                    {({ handleSubmit, errors, touched, handleChange, initialValues, isSubmitting, values, dirty }) => {
                        return (
                            <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                                <p className={classes.title}>
                                    <b>
                                        {modeRegister ?
                                        "Register"
                                        : "Update"}
                                    </b>
                                </p>
                                <div className={classes.inputs}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email *"
                                        variant="outlined"
                                        type="text"
                                        error={errors.email && touched.email}
                                        helperText={touched.email ? errors.email : null}
                                        className={classes.input}
                                        defaultValue={initialValues.email}
                                    />
                                    {modeRegister || initialValues.email !== values.email ?
                                        <TextField
                                            id="emailRepeat"
                                            name="emailRepeat"
                                            label="Confirm email *"
                                            variant="outlined"
                                            type="text"
                                            error={errors.emailRepeat && touched.emailRepeat}
                                            helperText={touched.emailRepeat ? errors.emailRepeat : null}
                                            className={classes.input}
                                            defaultValue={initialValues.emailRepeat}
                                        />
                                        : null}
                                </div>
                                <div className={classes.inputs}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label={modeRegister ? "Password *" : "New password"}
                                        variant="outlined"
                                        type={typePassword}
                                        error={errors.password && touched.password}
                                        helperText={touched.password ? errors.password : null}
                                        className={classes.input}
                                        defaultValue={initialValues.password}
                                    />
                                    {modeRegister || initialValues.password !== values.password ?
                                        <TextField
                                            id="passwordRepeat"
                                            name="passwordRepeat"
                                            label={modeRegister ? "Confirm password *" : "Confirm new password*"}
                                            variant="outlined"
                                            type={typePassword}
                                            error={errors.passwordRepeat && touched.passwordRepeat}
                                            helperText={touched.passwordRepeat ? errors.passwordRepeat : null}
                                            className={classes.input}
                                        />
                                        : null}
                                </div>
                                <div className={classes.inputs}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Username *"
                                        variant="outlined"
                                        type="text"
                                        error={errors.username && touched.username}
                                        helperText={touched.username ? errors.username : null}
                                        className={classes.input}
                                        defaultValue={initialValues.username != null ? initialValues.username : null}
                                        style={{ width: "400px" }}
                                    />
                                </div>
                                <div className={classes.inputs}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First name *"
                                        variant="outlined"
                                        type="text"
                                        error={errors.firstName && touched.firstName}
                                        helperText={touched.firstName ? errors.firstName : null}
                                        className={classes.input}
                                        defaultValue={initialValues.firstName != null ? initialValues.firstName : null}
                                    />
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last name *"
                                        variant="outlined"
                                        type="text"
                                        error={errors.lastName && touched.lastName}
                                        helperText={touched.lastName ? errors.lastName : null}
                                        className={classes.input}
                                        defaultValue={initialValues.lastName != null ? initialValues.lastName : null}
                                    />
                                </div>

                                <div className={classes.footer}>
                                    <Typography />
                                    <Switch
                                        className={classes.switch}
                                        checked={showPassword}
                                        onChange={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        color="primary"
                                    />
                                    {textShowPassword}
                                    <Typography />
                                    <OwnButton
                                        typeOfButton={'submit'}
                                        disabled={!modeRegister && !dirty}
                                        text={modeRegister ? "Sign up" : "Update"}
                                    />
                                    <Typography className={classes.helperText}>
                                        {modeRegister &&
                                            <div className={classes.footer}>
                                                <p> Have you created an account yet?</p>
                                                <Link className={classes.link} to="/login">Sign in now</Link>
                                            </div>
                                        }
                                    </Typography>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </Paper>
    );
};
export default UserForm;
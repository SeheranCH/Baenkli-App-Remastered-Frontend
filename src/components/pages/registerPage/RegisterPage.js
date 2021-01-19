import React, { Fragment } from "react";
import Navbar from "../../molecules/navbar/Navbar";
import UserForm from "../../organisms/userForm/UserForm";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "10%",
    },
}));

const object = {
    email: '',
    emailRepeat: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: ''
}

const RegisterPage = () => {

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
                    <UserForm
                        initialObject={object}
                        modeRegister
                    />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

        </Fragment>
    );
};

export default RegisterPage;
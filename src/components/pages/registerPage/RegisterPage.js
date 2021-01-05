import React, { Fragment } from "react";
import Navbar from "../../molecules/navbar/Navbar";
import UserForm from "../../organisms/userForm/UserForm";

const object = {
    email: '',
    emailRepeat: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: ''
}

const RegisterPage = () => {
    return (
        <Fragment>
            <Navbar/>
            <UserForm
                initialObject={object}
                modeRegister
            />
        </Fragment>
    );
};

export default RegisterPage;
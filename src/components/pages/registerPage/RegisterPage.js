import React, { Fragment } from "react";
import Navbar from "../../molecules/navbar/Navbar";
import UserForm from "../../organisms/userForm/UserForm";

const object = {
    email: '',
    emailRepeat: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    addressId: '',
    zipPlace: {
        zip: '',
        city: ''
    }
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
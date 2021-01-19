import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Email format not correct")
        .required("Email required")
    ,
    password: Yup.string()
        .trim()
        .required("Password required")
});
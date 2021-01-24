import * as Yup from "yup";

const regexOnlyLetters = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?&])[a-zA-Z\d@$!%#?&]+$/;
const validationOnlyLetters = "Must have only letters";
const validationPassword = "At least 1 upper-case letter, 1 lower-case letter, 1 digit and 1 special character --> @$!%#?&"
const validationMaxNames = "Max. 50 characters";
const validationsMinPassword = "Min. 8 characters";

export const CreateUserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .max(50, validationMaxNames)
        .required("Username required")
    ,
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email required")
        .max(50, validationMaxNames)
    ,
    emailRepeat: Yup.string()
        .trim()
        .email("Invalid email")
        .max(50, validationMaxNames)
        .oneOf([Yup.ref('email')], "Emails don't match")
        .nullable(true)
    ,
    password: Yup.string()
        .trim()
        .required('Password required')
        .matches(regexPassword, validationPassword)
        .min(8, validationsMinPassword)
    ,
    passwordRepeat: Yup.string()
        .trim()
        .min(8, validationsMinPassword)
        .oneOf([Yup.ref('password')], "Passwords don't match")
        .nullable(true)
    ,
    firstName: Yup.string()
        .trim()
        .required('First name required')
        .matches(regexOnlyLetters, validationOnlyLetters)
        .max(50, validationMaxNames)
    ,
    lastName: Yup.string()
        .trim()
        .required('Last name required')
        .matches(regexOnlyLetters, validationOnlyLetters)
        .max(50, validationMaxNames)
        .notOneOf([Yup.ref('firstName')], "Names may not match")
    
});
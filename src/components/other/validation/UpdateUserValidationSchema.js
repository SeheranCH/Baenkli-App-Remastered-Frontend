import * as Yup from "yup";

const regexOnlyLetters = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ]+$/;
const validationOnlyLetters = "Must have only letters";
const validationMaxNames = "Max. 50 characters";

export const UpdateUserValidationSchema = Yup.object().shape({
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
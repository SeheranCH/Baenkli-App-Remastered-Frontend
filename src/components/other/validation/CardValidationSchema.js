import * as Yup from "yup";

const regexName = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ,+-]+$/;
const validationName = "Please enter only letters";
const validationMax = "Max. 250 characters"
const validationMinNumber = "Minimum: 0";
const validationMinLatitude = "Minimum of latitude: -90";
const validationMaxLatitude = "Maximum of latitude: +90";
const validationMinLongitude = "Minimum of longitude: -180";
const validationMaxLongitude = "Maximum of longitude: +180";

export const CardValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .matches(regexName, validationName)
        .required("Title required")
        .max(250, validationMax),
    description: Yup.string()
        .trim()
        .max(250, validationMax)
        .nullable(true),
    latitude: Yup.number()
        .min(-90, validationMinLatitude)
        .max(90, validationMaxLatitude)
        .nullable(true),
    longitude: Yup.number()
        .min(-180, validationMinLongitude)
        .max(180, validationMaxLongitude)
        .nullable(true),
    amountBenches: Yup.number()
        .required("Amount of benches required")
        .min(0, validationMinNumber)
        .integer("Integer required"),
    amountFirePlaces: Yup.number()
        .required("Amount of fire places required")
        .min(0, validationMinNumber)
        .integer("Integer required"),
    amountTrashCans: Yup.number()
        .required("Amount of trash cans required")
        .min(0, validationMinNumber)
        .integer("Integer required"),
    distanceToNextShop: Yup.number()
        .min(0, validationMinNumber)
        .nullable(true)
        .integer("Integer required"),
    directions: Yup.string()
        .max(250, validationMax)
        .nullable(true)
});
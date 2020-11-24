import React  from "react";
import * as Yup from "yup";

const regexName = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ,+-]+$/;

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .matches(regexName, "Please enter only names")
    .required("Title required"),
  description: Yup.string()
    .trim()
    .max(250, "Max. 250 characters")
});
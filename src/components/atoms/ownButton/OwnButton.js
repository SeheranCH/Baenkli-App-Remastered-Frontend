import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submitButton: {
        backgroundColor: "#355A20",
        border: "none",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#47792A",
        },
        '&:disabled': {
            color: "#355A20",
            backgroundColor: "#FFFFFF",
        }
    },
    cancelButton: {
        backgroundColor: "#E62E00",
        border: "none",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#FF5C33",
        },
        '&:disabled': {
            color: "#E62E00",
            backgroundColor: "#FFFFFF"
        }
    },
    resetButton: {
        backgroundColor: "#E2E2D0",
        border: "none",
        color: "#000000",
        '&:hover': {
            backgroundColor: "#EBEBE0"
        },
        '&:disabled': {
            color: "E2E2D0",
            backgroundColor: "#FFFFFF"
        }  
    }
}));

const OwnButton = ({ typeOfButton, text, disabled, onClickFunc }) => {

    const classes = useStyles();

    return (
        <div>
            {typeOfButton === 'submit' ?
                <Button disabled={disabled} type={"submit"} className={classes.submitButton} variant={"outlined"}>{text}</Button>
                : null}
            {typeOfButton === 'cancel' ?
                <Button disabled={disabled} onClick={onClickFunc} className={classes.cancelButton} variant={"outlined"}>{text}</Button>
                : null}
            {typeOfButton === 'reset' ?
                <Button disabled={disabled} type={"reset"} className={classes.resetButton} variant={"outlined"}>{text}</Button>
                : null}
        </div>
    );
};

export default OwnButton;

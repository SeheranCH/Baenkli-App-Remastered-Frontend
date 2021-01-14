import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import OwnButton from "../../atoms/ownButton/OwnButton";
import CardForm from "../../organisms/cardForm/CardForm";
import UserForm from "../../organisms/userForm/UserForm";


const OwnDialog = ({ isOpen, handler, action, mode, titleDialog, bench, user }) => {

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handler}
                aria-labelledby="form-dialog-title"
                style={null}
            >
                <DialogTitle id="form-dialog-title">
                    {titleDialog}
                </DialogTitle>
                <DialogContent>
                    {mode === 'editBench' ?
                        <CardForm
                            updateFunc={action}
                            bench={bench}
                            modeDialog
                        />
                        : null}
                    {mode === 'editUser' ?
                        <UserForm
                            initialObject={user}
                            updateFunc={action}
                            modeDialog
                        />
                        : null}
                </DialogContent>
                <DialogActions>
                    <OwnButton
                        onClickFunc={handler}
                        typeOfButton={'cancel'}
                    />
                    {mode === 'delete' ?
                        <OwnButton
                            onClickFunc={action}
                            typeOfButton={'confirm'}
                        />
                        : null}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OwnDialog;

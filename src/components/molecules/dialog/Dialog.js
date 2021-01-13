import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import OwnButton from "../../atoms/ownButton/OwnButton";
import CardForm from "../../organisms/cardForm/CardForm";


const OwnDialog = ({ isOpen, handler, action, mode, titleDialog, bench }) => {

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
                    {mode === 'edit' ?
                        <CardForm
                            updateFunc={action}
                            bench={bench}
                            modeDialog
                        />
                        : null}
                    {mode === 'createArticle' ?
                        {/* <ArticleForm
                            article={article}
                            mode={'create'}
                            handleDialog={handler}
                        /> */}
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

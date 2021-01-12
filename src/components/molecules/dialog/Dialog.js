import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import OwnButton from "../../atoms/ownButton/OwnButton";
// import InputNumber from "../../atoms/InputNumber/InputNumber";
// import ArticleForm from "../../organisms/ArticleForm/ArticleForm";
// // import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
// import OrderService from "../../../service/OrderService";


const DialogComp = ({ isOpen, handler, article, mode, titleDialog }) => {


    // const { personalShoppingCart } = useContext(SessionHandlerContext);

    const [amount, setAmount] = useState(1);

    const addArticleToShoppingCart = (a, s) => {
        // const dto = {article: a, quantity: amount, order: s};
        // OrderService.createOrderDetail(dto)
        //     .then(() => {
        //     })
        //     .catch(err => {
        //         console.error('Error in DialogComp');
        //     })
        //     .finally(() => {
        //         handler();
        //     })

    }

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {mode === 'inputNumber' ?
                        "To shopping cart"
                        : null}
                    {mode === 'removeArticle' || mode === 'editArticle' || mode === 'createArticle' ?
                        titleDialog
                        : null}
                </DialogTitle>
                <DialogContent>
                    {mode === 'editArticle' ?
                    // HERE: BenchForm
                        {/* <ArticleForm
                            article={article}
                            mode={'edit'}
                            handleDialog={handler}
                        /> */}
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
                    {mode !== 'editArticle' && mode !== 'createArticle' ?
                        <OwnButton
                            onClickFunc={handler}
                            typeOfButton={'cancel'}
                        />
                        : null}
                    {mode !== 'editArticle' && mode !== 'createArticle' ?
                        <OwnButton
                            onClickFunc={() => addArticleToShoppingCart(article, null)}
                            typeOfButton={'submit'}
                        />
                        : null}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComp;

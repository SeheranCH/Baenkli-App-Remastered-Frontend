import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Paper, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ShopIcon from '@material-ui/icons/Shop';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "../../molecules/dialog/Dialog";
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import ArticleService from '../../../service/ArticleService';
// import SessionHandlerContext from '../../other/Context/SessionHandlerContext';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    title: {
    },
    paper: {
        margin: "20px",
        paddingTop: "20px",
        width: "100%"
    },
    removeButton: {
        color: "red",
    },
    button: {
        color: "#C6E2FA",
    },
}));

const initialArticle = {
    articleName: "",
    articleDescription: "",
    brand: "",
    available: true,
    price: null,
    salePrice: null
};

const PersonalBenchManagment = ({ articles }) => {

    // const { getAllArticles } = useContext(SessionHandlerContext);

    const [openRemove, setOpenRemove] = useState(false);
    const [articleToRemove, setArticleToRemove] = useState({});

    const [openEdit, setOpenEdit] = useState(false);
    const [articleToEdit, setArticleToEdit] = useState({});

    const [openCreate, setOpenCreate] = useState(false);

    const history = useHistory();

    const classes = useStyles();

    const dialogHandlerRemove = () => {
        setOpenRemove(!openRemove);
    }

    const dialogHandlerEdit = () => {
        setOpenEdit(!openEdit);
    }

    const dialogHandlerCreate = () => {
        setOpenCreate(!openCreate);
    }

    const checkFormat = (nAsString) => {
        var n = parseFloat(nAsString);
        if (n % 1 === 0) {
            return n + ".-"
        } else if (n * 10 % 1 === 0) {
            return n + "0";
        } else {
            return nAsString;
        }
    }

    const goToArticle = (id) => {
        history.push(`/articles/${id}`);
    }

    const getOtherInformation = (a) => {
        var stringMoreInformation = " | Article id: " + a.id + " | Brand: " + a.brand + " | ";
        if (a.available) {
            stringMoreInformation += "Now available";
        } else {
            stringMoreInformation += "Currently not available";
        }
        return stringMoreInformation;
    }

    const removeArticle = () => {
        // ArticleService.delete(articleToRemove.id)
        //     .then(() => {
        //     })
        //     .catch(err => {
        //         console.error('Error in PersonalBenchManagment: ', err);
        //     })
        //     .finally(() => {
        //         dialogHandlerRemove();
        //         // getAllArticles();
        //     })
    }

    return (
        <Grid container>
            <Paper className={classes.paper}>
                <Typography align={"center"} variant="h6" className={classes.title}>
                    <i>My articles</i>
                    <Typography align={"right"}>
                            <IconButton
                                onClick={() => {
                                    dialogHandlerCreate();
                                }}
                                title={"Add new article"}
                                className={classes.button}
                            >
                                <AddCircleIcon />
                            </IconButton>
                    </Typography>
                </Typography>
                <div className={classes.demo}>
                    <List>
                        {articles.map((a) =>
                            <ListItem key={a.id} onClick={() => goToArticle(a.id)} title={"Go to article " + a.articleName}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ShopIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={a.articleName}
                                    secondary={a.salePrice !== 0 ? "Current sale price: Fr. " + checkFormat(a.salePrice) + getOtherInformation(a) : "Current price: Fr. " + checkFormat(a.price) + getOtherInformation(a)}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        title={"Edit article " + a.articleName}
                                        onClick={() => {
                                            setArticleToEdit(a);
                                            dialogHandlerEdit();
                                        }}
                                        edge="end"
                                        aria-label="edit"
                                        className={classes.button}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        title={"Remove article " + a.articleName}
                                        onClick={() => {
                                            setArticleToRemove(a);
                                            dialogHandlerRemove();
                                        }}
                                        edge="end"
                                        aria-label="delete"
                                        className={classes.removeButton}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Paper>
            <Dialog
                isOpen={openRemove}
                handler={dialogHandlerRemove}
                mode={'removeArticle'}
                titleDialog={"Remove article " + articleToRemove.articleName + "?"}
                confirmAction={() => removeArticle()}
            />
            <Dialog
                isOpen={openEdit}
                handler={dialogHandlerEdit}
                mode={'editArticle'}
                titleDialog={"Edit your article  " + articleToEdit.articleName}
                article={articleToEdit}
            />
            <Dialog
                isOpen={openCreate}
                handler={dialogHandlerCreate}
                mode={'createArticle'}
                titleDialog={"Create an article"}
                article={initialArticle}
            />
        </Grid>

    );
}
export default PersonalBenchManagment;
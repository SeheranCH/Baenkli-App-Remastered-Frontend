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
import OwnDialog from "../../molecules/dialog/Dialog";
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BenchService from '../../../service/BenchService';
import Title from "../../atoms/title/Title";
import WeekendIcon from '@material-ui/icons/Weekend';


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    title: {
    },
    // paper: {
    //     margin: "20px",
    //     paddingTop: "20px",
    //     width: "100%"
    // },
    paper: {
        flexGrow: 1,
        paddingTop: "50px",
        paddingBottom: "50px",
        background: "#e6f3d8",
        color: "black",
    },
    deleteButton: {
        color: "red",
    },
    editButton: {
        color: "#355A20",
    },
}));


const PersonalBenchManagment = ({ benches, benchHandler }) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [benchToDelete, setBenchToDelete] = useState({});

    const [openEdit, setOpenEdit] = useState(false);
    const [benchToEdit, setBenchToEdit] = useState({});

    const history = useHistory();

    const classes = useStyles();

    const dialogHandlerDelete = () => {
        setOpenDelete(!openDelete);
    }

    const dialogHandlerEdit = () => {
        setOpenEdit(!openEdit);
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

    const goToBench = (id) => {
        history.push(`/bench/${id}`);
    }

    const getInformation = (b) => {
        var info = "Bench id: " + b.id;
        if (b.longitude !== null && b.latitude !== null) {
            info += " | Coordinates: " + b.longitude + " / " + b.latitude;
        }
        if (b.address !== null) {
            info += " | Location: " + b.address.street + ", " + b.address.zip + " " + b.address.place;
        }
        return info;
    }

    const deleteBench = () => {
        BenchService.delete(benchToDelete.id)
            .then(() => {
                benchHandler(benches.filter(b => b.id !== benchToDelete.id))
            })
            .catch(err => {
                console.error('Error in PersonalBenchManagment: ', err);
            })
            .finally(() => {
                dialogHandlerDelete();
            })
    }

    const changeBench = (dto) => {
        BenchService.update(dto.id, dto)
            .then(res => {
                let benchArray = benches.filter(b => b.id !== benchToEdit.id);
                benchArray.push(res.data);
                benchHandler(benchArray);
            })
            .catch(err => {
                console.error('Error in PersonalBenchManagment: ', err)
            })
            .finally(() => {
                dialogHandlerEdit();
            })
    }

    return (
        <Paper className={classes.paper}>
            <div className={classes.demo}>
                <List>
                    {benches.map((b) =>
                        <ListItem key={b.id} onClick={() => goToBench(b.id)} title={"Go to bench " + b.title}>
                            <ListItemAvatar>
                                <Avatar>
                                    <WeekendIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={b.title}
                                secondary={getInformation(b)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    title={"Edit bench " + b.title}
                                    onClick={() => {
                                        setBenchToEdit(b);
                                        dialogHandlerEdit();
                                    }}
                                    edge="end"
                                    aria-label="edit"
                                    className={classes.editButton}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    title={"Delete bench " + b.title}
                                    onClick={() => {
                                        setBenchToDelete(b);
                                        dialogHandlerDelete();
                                    }}
                                    edge="end"
                                    aria-label="delete"
                                    className={classes.deleteButton}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>,
                    )}
                </List>
            </div>
            <OwnDialog
                isOpen={openDelete}
                handler={dialogHandlerDelete}
                mode={'delete'}
                titleDialog={"Delete bench '" + benchToDelete.title + "'?"}
                action={() => deleteBench()}
            />
            <OwnDialog
                isOpen={openEdit}
                handler={dialogHandlerEdit}
                mode={'edit'}
                titleDialog={"Edit bench '"+ benchToEdit.title + "'"}
                action={changeBench}
                bench={benchToEdit}
            />
        </Paper>

    );
}
export default PersonalBenchManagment;
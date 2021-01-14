import React, { useState, useEffect, useCallback } from 'react';
import { Paper, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, IconButton } from '@material-ui/core/';
import SearchField from '../../molecules/searchField/SearchField'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OwnDialog from '../../molecules/dialog/Dialog';
import UserService from '../../../service/UserService';


/*
    Style
*/
const useStyles = makeStyles((theme) => ({
    table: {
    },
    cell: {
        color: "#355A20",
        margin: "20px",
        width: "100px"
    },
    searchField: {
        marginTop: "10px",
        marginBottom: "20px"
    },
    styleIcon: {
        color: "#355A20"
    },
}));

const OwnTable = ({ data, headCells, userHandler }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    const [openDelete, setOpenDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});

    const [openEdit, setOpenEdit] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({});

    const classes = useStyles();

    const dialogHandlerDelete = () => {
        setOpenDelete(!openDelete);
    }

    const dialogHandlerEdit = () => {
        setOpenEdit(!openEdit);
    }

    const deleteUser = () => {
        UserService.delete(itemToDelete.id)
            .then(() => {
                let newArray = data.filter(u => u.id !== itemToDelete.id);
                userHandler(newArray);
            })
            .catch(err => {
                console.error("Error in OwnTable: ", err);
            })
            .finally(() => {
                dialogHandlerDelete();
            });
    };

    const changeUser = (dto) => {
        UserService.update(dto.id, dto)
            .then(res => {
                let newUser = res.data;
                delete newUser.password;
                let userArray = data.filter(b => b.id !== itemToEdit.id);
                userArray.push(newUser);
                userHandler(userArray);
            })
            .catch(err => {
                console.error('Error in OwnTable: ', err)
            })
            .finally(() => {
                dialogHandlerEdit();
            })
    }


    /*
        Filter
    */
    const filter = useCallback((value, filterValue) => {
        let valueString = "";

        Object.values(value).forEach((value) => {
            valueString += value;
        });

        const filterString = filterValue.replace(" ", "");


        return valueString
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const filteredRows = data.filter((value) =>
            filter(value, searchText)
        );
        setFilteredRows(filteredRows);
        // eslint-disable-next-line
    }, [searchText, data, filter]);

    return (
        <TableContainer component={Paper}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={9}>
                    <SearchField
                        searchText={searchText}
                        setSearchText={setSearchText}
                        style={classes.searchField}
                        styleIcon={classes.styleIcon}
                    />
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        align={"inherit"}
                                        className={classes.cell}
                                        padding={"checkbox"}
                                        size={"medium"}
                                        sortDirection={"desc"}
                                        variant={"head"}
                                    >
                                        <b>{headCell.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => {
                                return (
                                    <TableRow>
                                        {Object.values(row).map((value) => {
                                            if (value.length >= 30) {
                                                return (
                                                    <TableCell className={classes.headCell} title={value}>{value.substring(0, 12) + "..."}</TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell className={classes.headCell}>{value}</TableCell>
                                                )
                                            }

                                        })}
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => {
                                                setItemToEdit(row);
                                                dialogHandlerEdit();
                                            }}
                                            edge={"end"}
                                            title={"Edit user " + row.username}
                                        >
                                            <EditIcon style={{ color: "#355A20" }} />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setItemToDelete(row);
                                                dialogHandlerDelete();
                                            }}
                                            edge={"end"}
                                            title={"Delete user " + row.username}
                                        >
                                            <DeleteIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <OwnDialog
                isOpen={openDelete}
                handler={dialogHandlerDelete}
                mode={'delete'}
                titleDialog={"Delete user '" + itemToDelete.username + "'?"}
                action={deleteUser}
            />
            <OwnDialog
                isOpen={openEdit}
                handler={dialogHandlerEdit}
                mode={'editUser'}
                titleDialog={"Edit user '" + itemToEdit.username + "'"}
                action={changeUser}
                user={itemToEdit}
            />
        </TableContainer>

    );
};
export default OwnTable;
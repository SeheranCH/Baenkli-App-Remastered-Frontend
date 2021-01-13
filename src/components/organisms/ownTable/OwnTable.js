import React, { useState, useEffect, useCallback } from 'react';
import { Paper, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core/';
import SearchField from '../../molecules/searchField/SearchField'

/*
    Style
*/
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        margin: "20px"
    },
    searchField: {
        marginLeft: "20px",
        marginTop: "10px",
    },
    styleIcon: {
        color: "#87C4F4"
    }
}));

const OwnTable = ({ data, headCells }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);
    const classes = useStyles();

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
        <div>
            <SearchField
                searchText={searchText}
                setSearchText={setSearchText}
                style={classes.searchField}
                styleIcon={classes.styleIcon}
            />
            <TableContainer component={Paper}>
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
                        {filteredRows.map((row) => (
                            <TableRow>
                                {Object.values(row).map((value) => {
                                    return (
                                        <TableCell>{value}</TableCell>
                                    )
                                })} 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};
export default OwnTable;
import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from "@material-ui/icons/Clear";


const SearchField = ({ searchText, setSearchText, style, styleIcon}) => {

    const handleSearchField = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <TextField
            onChange={(event) => handleSearchField(event)}
            value={searchText}
            variant={"standard"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon className={styleIcon}/>
                    </InputAdornment>
                ),
                endAdornment: (
                    <IconButton
                        onClick={() => {
                            setSearchText("");
                        }}
                        style={{ padding: 5 }}
                        title={"Clear search value"}
                    >
                        <ClearIcon
                            style={{ width: 20, height: 20 }}
                            className={styleIcon}
                        />
                    </IconButton>
                ),
            }}
            className={style}
        />
    );
};
export default SearchField;
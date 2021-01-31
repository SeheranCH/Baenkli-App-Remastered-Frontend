import React, { useContext, useState } from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SessionHandlerContext from '../../other/context/SessionHandlerContext';
import CommentService from "../../../service/CommentService";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
        width: '100%',
        maxWidth: '36ch',
    },
}));

const CommentField = ({ username, firstName, lastName, bench, postComment }) => {

    const classes = useStyles();
    const [value, setValue] = useState(null);
    const { user } = useContext(SessionHandlerContext);

    const commentDTO = {
        commentText: value,
        bench: bench,
        user: user
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
        >
            <Grid item>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.title}
                >
                    <Grid item >
                        <Avatar className={classes.avatar}>
                            {firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>{username}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-textarea"
                        label="Comment"
                        placeholder="Write a comment"
                        multiline
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                    />
                </form>
            </Grid>

            <Grid item>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<SendIcon />}
                    onClick={() => {
                        postComment(commentDTO);
                        setValue("");
                    }}
                >
                    Send
                    </Button>
            </Grid>
        </Grid>
    );
}

export default withRouter(CommentField);
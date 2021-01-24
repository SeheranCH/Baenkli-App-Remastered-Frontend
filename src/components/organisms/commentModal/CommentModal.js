import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CommentField from "../../molecules/commentField/CommentField";
import Rating from "../../atoms/rating/Rating";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,

    },
    inline: {
        display: 'inline',
    },
    paper: {
        maxWidth: 345,
        margin: "50px",
    },
    title: {
        margin: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2),
    },
}));

const CommentModal = ({ comments, usernameCurrentUser, firstNameCurrentUser, lastNameCurrentUser, setValueRating, postRating, setReadOnlyRating, valueRating, readOnlyRating, bench, postComment }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item className={classes.title}>
                    <Typography variant="body2" color="textSecondary" component="h6">
                        Rate this bench
                        </Typography>
                    <Rating
                        name="rating-feedback"
                        precicion={0.5}
                        value={valueRating}
                        readOnly={readOnlyRating}
                        onChange={(event, value) => {
                            setValueRating(value);
                            postRating({ rating: value });
                            setReadOnlyRating(true);
                        }}
                    />
                </Grid>
                <Grid item>
                    <CommentField
                        username={usernameCurrentUser}
                        firstName={firstNameCurrentUser}
                        lastName={lastNameCurrentUser}
                        bench={bench}
                        postComment={postComment}
                    />
                </Grid>
                <Grid item>

                    <Typography className={classes.title} variant="h5" gutterBottom>Comments</Typography>
                </Grid>

                <List className={classes.list} dense>
                    {comments.map((obj, i) => (
                        <Grid item>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        {obj.user.firstName.substring(0, 1).toUpperCase() + obj.user.lastName.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={obj.user.username}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                            </Typography>
                                            {obj.commentText}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider className={classes.divider} variant="inset" component="li" />
                        </Grid>
                    ))}


                </List>
            </Grid>
        </Paper>
    )

}
export default CommentModal;
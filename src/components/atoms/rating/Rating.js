import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function StarRating(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="legend">{props.legend}</Typography>
      <Rating readOnly={props.readOnly} name="half-rating" defaultValue={0} precision={0.5} value={props.value} onChange={props.onChange}/>
    </div>
  );
}

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import SpaIcon from '@material-ui/icons/Spa';
import { makeStyles } from '@material-ui/core/styles';

const StyledRating = withStyles({
  iconFilled: {
    color: '#93CB56',
  },
  iconHover: {
    color: '#c0e19d',
  },
})(Rating);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function CustomizedRatings(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>      
        <StyledRating
          name="customized-color"
          defaultValue={0}
          precision={0.5}
          readOnly={props.readOnly}
          value={props.value} 
          onChange={props.onChange}
          icon={<SpaIcon fontSize="inherit" />}
        />
    </div>
  );
}

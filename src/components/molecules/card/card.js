import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardDivider from '../divider/Divider'
import { withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "50px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostCard = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const redirectPage = (id) => {
    props.history.push(`/bench/${id}`);
  };
  

  function getDate() {
    var d = new Date();
    var n = d.toString();
    return n;
  }  

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} />
        }
        action={
          <IconButton aria-label="settings" onClick={() => redirectPage(props.id)}>
            <VisibilityIcon />
          </IconButton>
        }
        title={props.title}
        subheader={getDate()}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.editButton ?
          <IconButton aria-label="edit" onClick={props.editFunction}>
            <EditIcon color="primary" />
          </IconButton>
          : null}
        {props.deleteButton == true ?
          <IconButton aria-label="delete" onClick={props.deleteFunction}>
            <DeleteIcon color="error" />
          </IconButton>
          : null}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardDivider
            amountBenches={props.amountBenches}
            amountFirePlaces={props.amountFirePlaces}
            amountTrashCans={props.amountTrashCans}
            distanceToNextShop={props.distanceToNextShop}
            directions={props.directions}
            readOnly={props.readOnly}
            valueQuietness={props.valueQuietness}
            valueRating={props.valueRating}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withRouter(PostCard);
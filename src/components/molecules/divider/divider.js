import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import WeekendIcon from '@material-ui/icons/Weekend';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DirectionsIcon from '@material-ui/icons/Directions';
import StarRating from '../../atoms/rating/rating';
import SpaIcon from '@material-ui/icons/Spa';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CardDivider(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WeekendIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Amount of benches" primary={props.amountBenches} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FireplaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Amount of fire places" primary={props.amountFirePlaces} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DeleteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Amount of trash cans" primary={props.amountTrashCans} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StorefrontIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Distance in meters to next shop" primary={props.distanceToNextShop} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DirectionsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Directions" primary={props.directions} />
      </ListItem>
      <Divider variant="inset" component="li" />

      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SpaIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="Quiet" />
        <StarRating value={props.valueQuietness} readOnly={props.readOnly} />
      </ListItem>
      <Divider variant="inset" component="li" />

      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ThumbUpIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary="General rating" />
        <StarRating value={props.valueRating} readOnly={props.readOnly} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

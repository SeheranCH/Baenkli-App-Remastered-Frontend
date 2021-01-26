import React, { useContext, useState, useEffect } from 'react';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SessionHandlerContext from '../../other/context/SessionHandlerContext';
import UserService from '../../../service/UserService';


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




const PostCard = ({ bench, benchId, image, avatarTitle,
  editButton, editFunction, deleteButton, deleteFunction, ...props }) => {

  const { user, setActiveUser } = useContext(SessionHandlerContext);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(user.favoriteBenches !== undefined ? user.favoriteBenches.some(b => b.id === bench.id || b.id === benchId) : false);

  const handleFavorite = (item) => {
    if (!isFavorite) {
      let currentFavorites = [];
      if (user.favoriteBenches !== undefined) {
         currentFavorites = user.favoriteBenches;
      }
      currentFavorites.push(item);
      let userDto = { ...user, favoriteBenches: currentFavorites }
      addFavorite(item.id, userDto);
    } else {
      let oldFavorites = user.favoriteBenches.filter(b => b.id !== item.id)
      let userDto = { ...user, favoriteBenches: oldFavorites }
      removeFavorite(item.id, userDto);
    }
    setIsFavorite(!isFavorite);
  }

  function addFavorite(benchId, dto) {
    UserService.addBenchToFavorites(user.id, benchId, dto)
      .then(res => {
        setActiveUser(res.data);
      })
      .catch(err => {
        console.error('Error in PostCard.js ', err);
      })
  }

  function removeFavorite(benchId, dto) {
    UserService.removeBenchFromFavorites(user.id, benchId, dto)
      .then(res => {
        setActiveUser(res.data);
      })
      .catch(err => {
        console.error('Error in PostCard.js ', err);
      })
  }

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

  function calRating(ratingArray) {
    if (ratingArray === undefined) {
      return 0;
    } else {
      var total = 0;
      var length = 0;
      length = ratingArray.length;
      ratingArray.map(r => total += r.rating);

      let result = total / length;

      return Math.round(result * 2) / 2;
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {avatarTitle}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => redirectPage(bench.id)}>
            <VisibilityIcon />
          </IconButton>
        }
        title={bench.title}
        subheader={getDate()}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={bench.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {bench.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
          onClick={() => {
            handleFavorite(bench);
            // handleFavorite(bench);
          }
          }>
          {isFavorite ?
            <FavoriteIcon />
            :
            <FavoriteBorderIcon />
          }
        </IconButton>
        {editButton ?
          <IconButton aria-label="edit" onClick={editFunction}>
            <EditIcon color="primary" />
          </IconButton>
          : null}
        {deleteButton ?
          <IconButton aria-label="delete" onClick={deleteFunction}>
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
            amountBenches={bench.amountBenches}
            amountFirePlaces={bench.amountFirePlaces}
            amountTrashCans={bench.amountTrashCans}
            distanceToNextShop={bench.distanceToNextShop}
            directions={bench.directions}
            readOnly={true}
            averageQuiet={bench.averageQuiet}
            averageRating={calRating(bench.ratings)}
          //averageRating={props.averageRating}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default withRouter(PostCard);
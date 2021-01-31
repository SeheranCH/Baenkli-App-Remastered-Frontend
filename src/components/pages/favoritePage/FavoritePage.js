import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import SessionHandlerContext from '../../other/context/SessionHandlerContext';
import BenchService from "../../../service/BenchService";
import Navbar from "../../molecules/navbar/Navbar"
import BottomNavbar from "../../molecules/bottomNavbar/BottomNavbar"
import PostCard from "../../molecules/postCard/PostCard"
import Grid from '@material-ui/core/Grid';

const FavoritePage = () => {

  const { user } = useContext(SessionHandlerContext);

  const [benches, setBenches] = useState([]);

  function getAllBenches() {
    BenchService.getAllFavorites(user.id)
      .then(res => {
        const data = res.data;
        setBenches(data);
      })
      .catch(err => {
        console.error('Error in HomePage.js ', err);
      })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getAllBenches();
    // eslint-disable-next-line
  }, []);

  function randomImg(width, height, key) {
    var source = 'https://source.unsplash.com/random/' + width + 'x' + height + '/?bench,park' + key;
    return source;
  }

  return (
    <Fragment>
      <Navbar />
      <Grid container >
        {benches.map((obj, i) => (
          <Grid item xs={4} key={i}>
            <PostCard
              readOnly={true}
              bench={obj}
              image={randomImg(500, 500, obj.id)}
              avatarTitle={obj.user !== null ? obj.user.username.substring(0, 2).toUpperCase() : null}
              benchHandler={setBenches}
              modeFavorites
            />
          </Grid>
        ))}
      </Grid>
      <BottomNavbar />
    </Fragment>
  );
};

export default FavoritePage;
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/Navbar"
import BottomNavbar from "../../molecules/bottomNavbar/BottomNavbar"
import PostCard from "../../molecules/card/Card"
import Grid from '@material-ui/core/Grid';
import BenchService from "../../../service/BenchService";

const FavoritePage = () => {

  const [benches, setBenches] = useState([]);

  function getAllBenches() {
    BenchService.getAll()
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

  function calcAverage(array, isRating) {
    var total = 0;
    var length = 0;
    length = array.length;
    if (isRating) {
      array.map(r => total += r.rating);
    } else {
      array.map(q => total += q.quiet) ;
    }

    let result = total / length;

    return Math.round(result * 2) / 2;
  }

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
              id={obj.id}
              image={randomImg(500, 500, obj.id)}
              title={obj.title}
              description={obj.description}
              averageQuiet={obj.quietness}
              averageRating={calcAverage(obj.ratings, true)}
              amountBenches={obj.amountBenches}
              amountFirePlaces={obj.amountFirePlaces}
              amountTrashCans={obj.amountTrashCans}
              distanceToNextShop={obj.distanceToNextShop}
              directions={obj.directions}
              readOnly={true}
            />
          </Grid>
        ))}
      </Grid>
      <BottomNavbar />
    </Fragment>
  );
};

export default FavoritePage;
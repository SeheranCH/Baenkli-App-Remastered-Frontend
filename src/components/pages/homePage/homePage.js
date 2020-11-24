import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/navbar"
import BottomNavbar from "../../molecules/bottomNavbar/bottomNavbar"
import PostCard from "../../molecules/card/card"
import Grid from '@material-ui/core/Grid';


const HomePage = () => {

  const [benches, setBenches] = useState([]);

  function getBenches() {
    axios.get('http://localhost:8080/benches')
      .then(res => {
        const data = res.data;
        setBenches(data);
      })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getBenches();
    // eslint-disable-next-line
  }, []);

  function calRating(ratingArray) {
    var total = 0;
    var length = 0;
    length = ratingArray.length;
    ratingArray.map(r => total += r.rating);

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
              valueQuietness={obj.quiet}
              valueRating={calRating(obj.ratings)}
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

export default HomePage;
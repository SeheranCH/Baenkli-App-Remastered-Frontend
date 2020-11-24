import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/navbar"
import PostCard from "../../molecules/card/card"
import Grid from '@material-ui/core/Grid';
import Maps from './../../organisms/googleMaps/googleMaps'

const MapsPage = () => {



    return (
        <Fragment>
            <Navbar />
            <Grid container spacing={3} justify="center"
                alignItems="center">
                <Grid item xs={4}  >
                <h1 >Maps</h1>
                <Maps />
                </Grid>

            </Grid>
        </Fragment>
    );
};

export default MapsPage;
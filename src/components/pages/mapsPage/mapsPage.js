import React, { Fragment } from "react";
import Navbar from "../../molecules/navbar/Navbar"
import Grid from '@material-ui/core/Grid';
import Maps from '../../organisms/googleMaps/GoogleMaps'

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
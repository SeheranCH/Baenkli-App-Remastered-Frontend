import React, { Fragment } from "react";
import Navbar from "../../molecules/navbar/Navbar";
import CardForm from "../../organisms/cardForm/CardForm";
import Grid from "@material-ui/core/Grid"

const initialObject = {
    title: "",
    description: "",
    latitude: null,
    longitude: null,
    amountBenches: null,
    amountFirePlaces: null,
    amountTrashCans: null,
    distanceToNextShop: null,
    directions: "",
    hasMeadow: false,
    locationOnWater: false
}

const NewBenchPage = () => {

    return (
        <Fragment>
            <Navbar />
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={4}>
                    <CardForm modeCreate bench={initialObject}/>
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default NewBenchPage;
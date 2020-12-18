import React, { Fragment, useState } from "react";
import axios from "axios";
import Navbar from "../../molecules/navbar/Navbar"
import Grid from '@material-ui/core/Grid';
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CardForm = ({ bench, setBench }) => {

    const GreenSwitch = withStyles({
        switchBase: {
            color: "#F3FAF0",
            '&$checked': {
                color: "#75BF4A",
            },
            '&$checked + $track': {
                backgroundColor: "#75BF4A",
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const useStyles = makeStyles((theme) => ({
        root: {
            background: "#e6f3d8",
            color: "black"
        },
        heading: {
            color: "#47792A",
            textAlign: "center",
            margin: '2vh'
        },
        subButton: {
            backgroundColor: "#355A20",
            color: "white",
            '&:hover': {
                backgroundColor: "#47792A",
                color: '#FFF'
            }

        },
    }));

    const classes = useStyles();

    const [hasMeadow, setHasMeadow] = useState(bench === undefined ? false : bench.hasMeadow);
    const [locationOnWater, setLocationOnWater] = useState(bench === undefined ? false : bench.locationOnWater);
    const [submitting, setSubmitting] = useState(false);

    const handleChangeMeadow = () => {
        setHasMeadow(!hasMeadow);
    }

    const handleChangeLocationOnwater = () => {
        setLocationOnWater(!locationOnWater);
    }

    const regexName = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ,+-]+$/;
    const validationName = "Please enter only letters";
    const validationMax = "Max. 250 characters"
    const validationMinNumber = "Minimum: 0";
    const validationMinLatitude = "Minimum of latitude: -90";
    const validationMaxLatitude = "Maximum of latitude: +90";
    const validationMinLongitude = "Minimum of longitude: -180";
    const validationMaxLongitude = "Maximum of longitude: +180";

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .trim()
            .matches(regexName, validationName)
            .required("Title required")
            .max(250, validationMax),
        description: Yup.string()
            .trim()
            .max(250, validationMax),
        latitude: Yup.number()
            .min(-90, validationMinLatitude)
            .max(90, validationMaxLatitude),
        longitude: Yup.number()
            .min(-180, validationMinLongitude)
            .max(180, validationMaxLongitude),
        amountBenches: Yup.number()
            .required("Amount of benches required")
            .min(0, validationMinNumber),
        amountFirePlaces: Yup.number()
            .required("Amount of fire places required")
            .min(0, validationMinNumber),
        amountTrashCans: Yup.number()
            .required("Amount of trash cans required")
            .min(0, validationMinNumber),
        distanceToNextShop: Yup.number()
            .min(0, validationMinNumber),
    });

    return (
        <div>
            <Navbar />
            <Paper className={classes.root} >
                <Formik
                    initialValues={bench}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setSubmitting(true);
                        const dto = { ...bench, ...values };
                        console.log('DTO ', dto)
                        if (bench.id !== 'new') {
                            axios.put(`http://localhost:8080/benches/${bench.id}`, dto)
                                .then(response => {
                                    setBench(response.data);
                                    window.location.assign(`/`);
                                })
                                .catch(error => {
                                    console.error('Error in Put', error);
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                })
                        } else {
                            axios.post(`http://localhost:8080/benches`, dto)
                                .then(response => {
                                    setBench(response.data);
                                    window.location.assign(`/`);
                                })
                                .catch(error => {
                                    console.error('Error in Post', error);
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                })
                        }
                    }}
                >
                    {({ handleSubmit, errors, touched, handleChange, initialValues}) => {
                        return (
                            <Fragment>
                                <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                                    <Typography variant="h5" className={classes.heading}>
                                        {bench.id === 'new' ? "Create publication" : "Change " + bench.title}
                                    </Typography>
                                    <Grid
                                        container
                                        spacing={4}
                                        justify="space-around"
                                        alignItems="center"
                                    >
                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="title"
                                                label="Title"
                                                required
                                                error={errors.title && touched.title}
                                                helperText={touched.title ? errors.title : null}
                                                defaultValue={initialValues.title}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="description"
                                                label="Description"
                                                multiline
                                                error={errors.description && touched.description}
                                                helperText={touched.description ? errors.description : null}
                                                defaultValue={initialValues.description}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="latitude"
                                                label="Latitude"
                                                error={errors.latitude && touched.latitude}
                                                helperText={touched.latitude ? errors.latitude : null}
                                                defaultValue={initialValues.latitude}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="longitude"
                                                label="Longitude"
                                                error={errors.longitude && touched.longitude}
                                                helperText={touched.longitude ? errors.longitude : null}
                                                defaultValue={initialValues.longitude}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-number"
                                                name="amountBenches"
                                                label="Amount benches"
                                                required
                                                error={errors.amountBenches && touched.amountBenches}
                                                helperText={touched.amountBenches ? errors.amountBenches : null}
                                                defaultValue={initialValues.amountBenches}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-number"
                                                name="amountFirePlaces"
                                                label="Amount fire places"
                                                required
                                                error={errors.amountFirePlaces && touched.amountFirePlaces}
                                                helperText={touched.amountFirePlaces ? errors.amountFirePlaces : null}
                                                defaultValue={initialValues.amountFirePlaces}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-number"
                                                name="amountTrashCans"
                                                label="Amount trash cans"
                                                required
                                                error={errors.amountTrashCans && touched.amountTrashCans}
                                                helperText={touched.amountTrashCans ? errors.amountTrashCans : null}
                                                defaultValue={initialValues.amountTrashCans}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="distanceToNextShop"
                                                label="Distance to next shop"
                                                error={errors.distanceToNextShop && touched.distanceToNextShop}
                                                helperText={touched.distanceToNextShop ? errors.distanceToNextShop : null}
                                                defaultValue={initialValues.distanceToNextShop}
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <TextField
                                                id="standard-basic"
                                                name="directions"
                                                label="Directions"
                                                multiline
                                                error={errors.directions && touched.directions}
                                                helperText={touched.directions ? errors.directions : null}
                                                defaultValue={initialValues.directions}
                                                className={classes.switch}
                                            />
                                        </Grid>

                                        <Grid item md={5}/>

                                        <Grid item md={5}>
                                            <FormControlLabel
                                                control={<GreenSwitch
                                                    checked={hasMeadow}
                                                    onChange={handleChangeMeadow}
                                                    color="primary"
                                                    name="hasMeadow"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />}
                                                label="Meadows"
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <FormControlLabel
                                                control={<GreenSwitch
                                                    checked={locationOnWater}
                                                    onChange={handleChangeLocationOnwater}
                                                    color="primary"
                                                    name="locationOnWater"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />}
                                                label="Location on water"
                                            />
                                        </Grid>

                                        <Grid item md={5}>
                                            <Button variant="contained" disabled={submitting} type="submit" className={classes.subButton}>
                                                Submit
                                            </Button>
                                        </Grid>
                                        <Grid item md={5}>
                                            <Button variant="contained" type="reset" className={classes.resButton} onClick={() => {
                                                setHasMeadow(false);
                                                setLocationOnWater(false);
                                            }}>
                                                Reset
                                       </Button>
                                        </Grid>

                                    </Grid>
                                </form>
                            </Fragment>
                        )
                    }}
                </Formik>
            </Paper>
        </div>
    )
}

export default CardForm;
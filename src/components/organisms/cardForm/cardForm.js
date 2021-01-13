import React, { Fragment, useState } from "react";
import Navbar from "../../molecules/navbar/Navbar"
import Grid from '@material-ui/core/Grid';
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom'
import BenchService from "../../../service/BenchService";
import OwnButton from "../../atoms/ownButton/OwnButton";
import { CardValidationSchema } from "../../other/validation/CardValidationSchema";


const CardForm = ({ bench, setBench, modeCreate, updateFunc, modeDialog }) => {

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
        rootNormal: {
            background: "#e6f3d8",
            color: "black",
            marginTop: "150px",
        },
        rootDialog: {
            background: "#e6f3d8",
            color: "black"
        },
        heading: {
            color: "#47792A",
            textAlign: "center",
            margin: '2vh'
        },
    }));

    const classes = useStyles();

    const history = useHistory();

    const [hasMeadow, setHasMeadow] = useState(bench.hasMeadow);
    const [locationOnWater, setLocationOnWater] = useState(bench.locationOnWater);

    const handleChangeMeadow = () => {
        setHasMeadow(!hasMeadow);
    }

    const handleChangeLocationOnwater = () => {
        setLocationOnWater(!locationOnWater);
    }

    return (
        <Paper className={modeDialog ? classes.rootDialog : classes.rootNormal} >
            <Formik
                initialValues={bench}
                enableReinitialize
                validationSchema={CardValidationSchema}
                onSubmit={(values) => {
                    const dto = { ...bench, ...values };
                    console.log('DTO ', dto)
                    if (modeCreate) {
                        BenchService.create(dto)
                            .then(res => {
                                history.push(`/`);
                            })
                            .catch(err => {
                                console.error('Error in CardForm ', err);
                            })
                            .finally(() => {
                            })
                    } else if (modeDialog) {
                        updateFunc(dto);
                    } else {
                        if (bench.id !== null) {
                            BenchService.update(dto.id, dto)
                                .then(res => {
                                    history.push(`/`);
                                })
                                .catch(err => {
                                    console.error('Error in CardForm ', err);
                                })
                                .finally(() => {
                                })
                        } else {
                            BenchService.create(dto)
                                .then(res => {
                                    history.push(`/login`)
                                })
                                .catch(err => {
                                    console.error('Error in CardForm ', err);
                                })
                                .finally(() => {
                                })
                        }
                       
                    }
                }
                }
            >
                {({ handleSubmit, errors, touched, handleChange, initialValues, dirty }) => {
                    return (
                        <Fragment>
                            <form method="post" onSubmit={handleSubmit} onChange={handleChange}>  
                                <Typography variant="h5" className={classes.heading}>
                                        {modeCreate ? "Create publication" : "Change " + bench.title}
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
                                            label="Title *"
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
                                            label="Amount benches *"
                                            error={errors.amountBenches && touched.amountBenches}
                                            helperText={touched.amountBenches ? errors.amountBenches : null}
                                            defaultValue={initialValues.amountBenches}
                                        />
                                    </Grid>

                                    <Grid item md={5}>
                                        <TextField
                                            id="standard-number"
                                            name="amountFirePlaces"
                                            label="Amount fire places *"
                                            error={errors.amountFirePlaces && touched.amountFirePlaces}
                                            helperText={touched.amountFirePlaces ? errors.amountFirePlaces : null}
                                            defaultValue={initialValues.amountFirePlaces}
                                        />
                                    </Grid>

                                    <Grid item md={5}>
                                        <TextField
                                            id="standard-number"
                                            name="amountTrashCans"
                                            label="Amount trash cans *"
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

                                    <Grid item md={5} />

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
                                        <OwnButton
                                            typeOfButton={'submit'}
                                            text={modeCreate ? "Create" : "Update"}
                                            disabled={!modeCreate ? !dirty : false}
                                        />
                                    </Grid>
                                    <Grid item md={5}>
                                        <OwnButton
                                            typeOfButton={'reset'}
                                            text={'Reset'}
                                            disabled={!modeCreate ? !dirty : false}
                                        />
                                    </Grid>

                                </Grid>
                            </form>
                        </Fragment>
                    )
                }}
            </Formik>
        </Paper>
    )
}

export default CardForm;
import React, { Fragment, useState, useContext } from "react";
import BottomNavbar from "../../molecules/bottomNavbar/BottomNavbar";
import Navbar from "../../molecules/navbar/Navbar";
import { makeStyles, BottomNavigation, BottomNavigationAction, Paper, Grid } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';
import UserForm from "../../organisms/userForm/UserForm";
import SessionHandlerContext from "../../other/context/SessionHandlerContext";
import PersonalBenchManagment from "../../organisms/personalBenchManagment/PersonalBenchManagment";
import PeopleIcon from '@material-ui/icons/People';
import UserManagment from "../../organisms/userManagment/UserManagment";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "150px",
    },
    paper: {
        border: "3px solid",
        borderColor: "#93CB56",
        padding: "5%",
        marginBottom: "100px"
    }
}));

let fakeArticles = [{
    "id": "1",
    "articleName": "'Ritch for Rich Ones' - Special Editon",
    "articleDescription": null,
    "brand": "rich.com",
    "price": 299.0,
    "salePrice": 149.95,
    "available": true,
}]

const AccountPage = () => {

    const classes = useStyles();

    const { user } = useContext(SessionHandlerContext);

    const [navigation, setNavigation] = useState("personalData");

    const handleChange = (e, newValue) => {
        setNavigation(newValue);
    }
    return (
        <Fragment>
            <Navbar />
            <Grid
                container
                className={classes.root}
            >
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <BottomNavigation
                        value={navigation}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction style={{ color: "#355A20" }} title={"My Personal Data"} label={"My Personal Data"} value="personalData" icon={<FaceIcon />} />
                        <BottomNavigationAction style={{ color: "#355A20" }} title={"My Personal Benches"} label={"My Personal Benches"} value="personalBenches" icon={<StoreIcon />} />
                        <BottomNavigationAction style={{ color: "#355A20" }} title={"User Managment"} label={"User Managment"} value="userManagment" icon={<PeopleIcon />} />

                    </BottomNavigation>
                    <Paper
                        elevation={3}
                        className={classes.paper}
                    >
                        {navigation === 'personalData' ?
                            <UserForm initialObject={{ ...user, password: null }} />
                            : null}
                        {navigation === 'personalBenches' ?
                            <PersonalBenchManagment articles={fakeArticles} />
                            : null}
                        {navigation === 'userManagment' ?
                            <UserManagment />
                            : null}
                    </Paper>
                    <BottomNavbar />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>

        </Fragment>
    );
};
export default AccountPage;
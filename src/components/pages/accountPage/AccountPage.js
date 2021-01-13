import React, { Fragment, useState, useContext, useEffect } from "react";
import BottomNavbar from "../../molecules/bottomNavbar/BottomNavbar";
import Navbar from "../../molecules/navbar/Navbar";
import { makeStyles, BottomNavigation, BottomNavigationAction, Paper, Grid } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';
import UserForm from "../../organisms/userForm/UserForm";
import SessionHandlerContext from "../../other/context/SessionHandlerContext";
import PersonalBenchManagment from "../../organisms/personalBenchManagment/PersonalBenchManagment";
import PeopleIcon from '@material-ui/icons/People';
import BenchService from "../../../service/BenchService";
import OwnTable from "../../organisms/ownTable/OwnTable";

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

/*
    Data
*/
function createData(id, orderStatus, paymentStatus, total, articles) {
    return { id, orderStatus, paymentStatus, total, articles };
}

const rows = [
    createData('1', 'Delivered', 'Paid', '67.-', '-'),
    createData('2', 'Waiting for payment', 'Not paid yet', '193.50', '-'),
    createData('3', 'In processing', 'Bill', '99.-', '-'),
    createData('4', 'Canceled', 'Paid back', '42.90', '-'),
    createData('5', 'Shipped from warehouse', 'Paid', '149.-', '-'),
    createData('6', 'In processing', 'Paid', '87', '-'),
    createData('7', 'Delivered', 'Paid', '15.-', '-'),
    createData('8', 'Delivered', 'Bill', '432.-', '-'),
    createData('9', 'Delivered', 'Paid bill', '89.90', '-'),
    createData('10', 'Delivered', 'Paid', '115.-', '-'),
];

const headCells = [
    { id: 'id', label: 'Order ID' },
    { id: 'orderStatus', label: 'Order status' },
    { id: 'paymentStatus', label: 'Payment status' },
    { id: 'payAmount', label: 'Total' },
    { id: 'articles', label: 'Articles' },
];

let fakeBenches = [
    {
        "id": "4028810e76d189390176d27ed37f0003",
        "title": "Bänkchen am Zugersee",
        "description": "Sehr empfehlenswert",
        "longitude": 8.507143,
        "latitude": 47.149668,
        "amountBenches": 2,
        "amountFirePlaces": 1,
        "amountTrashCans": 1,
        "distanceToNextShop": 500.0,
        "directions": "5 Min Gehweg zur Bushaltestelle «Oberwil b. Zug, Kreuz»",
        "hasMeadow": true,
        "address": null,
        "user": null,
        "ratings": [
            {
                "id": "4028810e76d823be0176d84df0860016",
                "rating": 4.0
            },
            {
                "id": "4028810e76d189390176d2e385c5000a",
                "rating": 3.5
            },
            {
                "id": "4028810e76d823be0176d84e22a90017",
                "rating": 5.0
            },
            {
                "id": "4028810e76d823be0176d82423e70000",
                "rating": 4.0
            }
        ],
        "quiets": [
            {
                "id": "4028810e76d823be0176d84f600c0018",
                "quiet": 2.0
            },
            {
                "id": "4028810e76d189390176d2e39f3b000b",
                "quiet": 3.5
            },
            {
                "id": "4028810e76d823be0176d825181e0001",
                "quiet": 3.0
            }
        ],
        "locationOnWater": true
    },
    {
        "id": "4028810e76e1ea790176e1ee43670000",
        "title": "testEpis",
        "description": null,
        "longitude": null,
        "latitude": null,
        "amountBenches": 2,
        "amountFirePlaces": 2,
        "amountTrashCans": 3,
        "distanceToNextShop": 0.0,
        "directions": null,
        "hasMeadow": false,
        "address": null,
        "user": null,
        "ratings": [],
        "quiets": [],
        "locationOnWater": false
    },
    {
        "id": "4028810e76faf8f50176fafa41a40000",
        "title": "Bänkli bei den Säulis",
        "description": "Nettes Bänkchen mit schöner Aussicht auf die Voralpen",
        "longitude": 8.740771,
        "latitude": 47.431546,
        "amountBenches": 1,
        "amountFirePlaces": 1,
        "amountTrashCans": 1,
        "distanceToNextShop": 3700.0,
        "directions": "Bushaltestelle: Agasul; Auto: 15 Minuten von Effrektion",
        "hasMeadow": false,
        "address": null,
        "user": {
            "id": "4028810e76e1ea790176e23fdae40001",
            "username": "ivo",
            "email": "ivo@ivo.com",
            "password": "$2a$10$R/cPIET9/lkl.sHG.MNZ7OiXI1ihZfmlbFEO/pFNIh1LGAOn2UKpu",
            "firstName": "Ivo",
            "lastName": "Gurtner",
            "accountExpirationDate": "2022-01-08",
            "credentialsExpirationDate": "2022-01-08",
            "locked": false,
            "enabled": true,
            "roles": []
        },
        "ratings": [],
        "quiets": [],
        "locationOnWater": false
    },
    {
        "id": "4028810e76d189390176d1b847080000",
        "title": "asas",
        "description": null,
        "longitude": null,
        "latitude": null,
        "amountBenches": 1,
        "amountFirePlaces": 1,
        "amountTrashCans": 1,
        "distanceToNextShop": 0.0,
        "directions": null,
        "hasMeadow": false,
        "address": {
            "id": "4028810e76fb1b7f0176fb22210c0000",
            "street": "epis",
            "zip": "epis",
            "place": "epois"
        },
        "user": null,
        "ratings": [
            {
                "id": "4028810e76d823be0176d83434c70008",
                "rating": 4.5
            },
            {
                "id": "4028810e76d823be0176d82707350004",
                "rating": 5.0
            },
            {
                "id": "4028810e76d823be0176d84a03ad0015",
                "rating": 2.0
            },
            {
                "id": "4028810e76d189390176d1cf72a50001",
                "rating": 4.0
            },
            {
                "id": "4028810e76d823be0176d83ecbd7000d",
                "rating": 2.0
            },
            {
                "id": "4028810e76e1ea790176e25318be0002",
                "rating": 1.0
            },
            {
                "id": "4028810e76d189390176d2d6d2a50008",
                "rating": 4.5
            },
            {
                "id": "4028810e76d823be0176d826cb700002",
                "rating": 1.0
            },
            {
                "id": "4028810e76d823be0176d849ad590013",
                "rating": 2.0
            },
            {
                "id": "4028810e76d823be0176d841d02c0010",
                "rating": 1.0
            },
            {
                "id": "4028810e76d189390176d2e41561000c",
                "rating": 5.0
            },
            {
                "id": "4028810e76d823be0176d841ef570012",
                "rating": 3.0
            },
            {
                "id": "4028810e76d823be0176d833ed190007",
                "rating": 5.0
            },
            {
                "id": "4028810e76d823be0176d827d8d90005",
                "rating": 1.0
            },
            {
                "id": "4028810e76d823be0176d834746e0009",
                "rating": 5.0
            },
            {
                "id": "4028810e76d823be0176d8356e8e000b",
                "rating": 1.0
            },
            {
                "id": "4028810e76d823be0176d83eebce000f",
                "rating": 3.0
            }
        ],
        "quiets": [
            {
                "id": "4028810e76d823be0176d826d3290003",
                "quiet": 1.0
            },
            {
                "id": "4028810e76d823be0176d8352b3b000a",
                "quiet": 3.0
            },
            {
                "id": "4028810e76d823be0176d841d7fa0011",
                "quiet": 4.0
            },
            {
                "id": "4028810e76d823be0176d83edb8c000e",
                "quiet": 1.5
            },
            {
                "id": "4028810e76d189390176d1cf7c820002",
                "quiet": 4.5
            },
            {
                "id": "4028810e76d189390176d2e4391d000d",
                "quiet": 2.5
            },
            {
                "id": "4028810e76d823be0176d849c8aa0014",
                "quiet": 4.0
            },
            {
                "id": "4028810e76d189390176d2d6decd0009",
                "quiet": 2.5
            }
        ],
        "locationOnWater": false
    }
];

const AccountPage = () => {

    const classes = useStyles();

    const { user } = useContext(SessionHandlerContext);

    const [navigation, setNavigation] = useState("personalData");

    const [ownBenches, setOwnBenches] = useState([]);

    const handleChange = (e, newValue) => {
        setNavigation(newValue);
    }

    const getOwnBenches = (id) => {
        BenchService.getOwnBenches(id)
            .then(res => {
                setOwnBenches(res.data);
            })
    }

    useEffect(() => {
        getOwnBenches(user.id)
    }, [user, setOwnBenches])

    return (
        <Fragment>
            <Navbar />
            <Grid
                container
                className={classes.root}
            >
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
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
                            <PersonalBenchManagment benches={ownBenches} benchHandler={setOwnBenches} />
                            : null}
                        {navigation === 'userManagment' ?
                            <OwnTable
                                data={rows}
                                headCells={headCells}
                            />
                            : null}
                    </Paper>
                    <BottomNavbar />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

        </Fragment>
    );
};
export default AccountPage;
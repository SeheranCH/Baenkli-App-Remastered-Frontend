import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../../molecules/navbar/Navbar";
import PostCard from "../../molecules/card/Card";
import CardForm from "../../organisms/cardForm/CardForm";
import Grid from '@material-ui/core/Grid';
import Rating from "../../atoms/rating/Rating";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    input: {
        marginBottom: "200px"
    },
}));

const CardPage = (props) => {

    const classes = useStyles();

    const postCardId = props.match.params.id;
    const [editing, setEditing] = useState(false);
    const [bench, setBench] = useState([]);
    const [readOnlyRating, setReadOnlyRating] = useState(false);
    const [readOnlyQuiet, setReadOnlyQuiet] = useState(false);

    function randomImg(width, height, key) {
        var source = 'https://source.unsplash.com/random/' + width + 'x' + height + '/?bench,park' + key;
        return source;
    }

    function calRating(ratingArray) {
        if (ratingArray === undefined) {
            return 0;
        } else {
            console.log(bench.ratings)
            var total = 0;
            var length = 0;
            console.log("rating,", ratingArray)
            length = ratingArray.length;
            ratingArray.map(r => total += r.rating);

            let result = total / length;

            return Math.round(result * 2) / 2;
        }

    }

    function getOneBench(id) {
        if (id !== undefined) {
            axios.get(`http://localhost:8080/benches/${id}`)
                .then((res) => {
                    setBench(res.data);
                })
        }
    }

    function deleteBench(id) {
        axios.delete(`http://localhost:8080/benches/${id}`)
            .then(() => {
                props.history.push(`/`);
            })
    }

    function editBench() {
        setEditing(true);
    }

    useEffect(() => {
        // Update the document title using the browser API
        getOneBench(postCardId);
    }, []);

    const [valueRating, setValueRating] = useState({});
    const [valueQuiet, setValueQuiet] = useState({});

    function postRating(dtoObject) {
        axios.post(`http://localhost:8080/ratings`, dtoObject)
            .then(res => {
                putBenchByRating(res.data);
            })
    }

    function postQuiet(dtoObject) {
        axios.post(`http://localhost:8080/quiets`, dtoObject)
            .then(res => {
            })
    }

    function putBenchByRating(dtoRating) {
        axios.put(`http://localhost:8080/benches/${bench.id}/rating/${dtoRating.id}`, bench)
            .then(res => {
                setBench(res.data);
            })
    }

    return (
        <Fragment>
            <Navbar />
            {editing || postCardId === 'new' ?
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <CardForm bench={postCardId === 'new' ? { ...bench, id: 'new' } : bench} setBench={postCardId === 'new' ? () => { } : setBench} />
                    </Grid>
                </Grid>

                :
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item md={4}>
                        <PostCard
                            id={postCardId}
                            image={randomImg(500, 500, postCardId)}
                            deleteButton={true}
                            editButton={true}
                            title={bench.title}
                            averageQuiet={bench.quietness}
                            averageRating={calRating(bench.ratings)}
                            amountBenches={bench.amountBenches}
                            amountFirePlaces={bench.amountFirePlaces}
                            amountTrashCans={bench.amountTrashCans}
                            distanceToNextShop={bench.distanceToNextShop}
                            directions={bench.directions}
                            readOnly={true}
                            deleteFunction={() => deleteBench(postCardId)}
                            editFunction={() => editBench(postCardId)}

                        />
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="body2" color="textSecondary" component="h6">
                            Rate
                            </Typography>
                        <Rating
                            name="rating-feedback"
                            precicion={0.5}
                            value={valueRating}
                            readOnly={readOnlyRating}
                            onChange={(event, value) => {
                                setValueRating(value);
                                postRating({ rating: value });
                                setReadOnlyRating(true);
                                console.log('VALUE RATING ', value)
                            }}
                        />
                    </Grid>
                </Grid>
            }
        </Fragment>
    );
}

export default CardPage;
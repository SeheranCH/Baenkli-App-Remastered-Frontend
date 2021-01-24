import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../../molecules/navbar/Navbar";
import PostCard from "../../molecules/card/Card";
import CommentModal from "../../organisms/commentModal/CommentModal";
import CardForm from "../../organisms/cardForm/CardForm";
import Grid from '@material-ui/core/Grid';
import Rating from "../../atoms/rating/Rating";
import Typography from '@material-ui/core/Typography';
import SessionHandlerContext from '../../other/context/SessionHandlerContext';
import CommentService from "../../../service/CommentService";

const useStyles = makeStyles((theme) => ({
    input: {
        marginBottom: "200px"
    },
}));

const CardPage = (props) => {

    const classes = useStyles();

    const { user } = useContext(SessionHandlerContext);

    const postCardId = props.match.params.id;
    const [editing, setEditing] = useState(false);
    const [bench, setBench] = useState([]);
    const [comments, setComments] = useState([]);
    const [readOnlyRating, setReadOnlyRating] = useState(false);

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

    function getComments(id) {
        CommentService.getByBenchId(id)
            .then((res) => {
                setComments(res.data);
                console.log(comments)
            })
            .catch((err) => {
                console.log(err)
            })
        // .finally(() => {

        // })
    }

    function postComment(dto) {
        CommentService.create(dto)
            .then((res) => {
                console.log(res.data)
                getComments(postCardId);
            })
            .catch((err) => {
                console.log(err)
            })
        // .finally(() => {

        // })
    }

    function editBench() {
        setEditing(true);
    }

    // eslint-disable-next-line
    useEffect(() => {
        // Update the document title using the browser API
        getOneBench(postCardId);
        getComments(postCardId);
    }, []);

    const [valueRating, setValueRating] = useState({});

    function postRating(dtoObject) {
        axios.post(`http://localhost:8080/ratings`, dtoObject)
            .then(res => {
                putBenchByRating(res.data);
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
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="align-star"
                >
                    <Grid item >
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
                            hasMeadow={bench.hasMeadow}
                            locationOnWater={bench.locationOnWater}
                        />
                    </Grid>
                    <Grid item >
                        <CommentModal
                            usernameCurrentUser={user.username}
                            firstNameCurrentUser={user.firstName}
                            lastNameCurrentUser={user.lastName}
                            comments={comments}
                            valueRating={valueRating}
                            readOnlyRating={readOnlyRating}
                            setValueRating={setValueRating}
                            postRating={postRating}
                            setReadOnlyRating={setReadOnlyRating}
                            bench={bench}
                            postComment={postComment}
                        />
                    </Grid>
                </Grid>
            }
        </Fragment>
    );
}

export default CardPage;
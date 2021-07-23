const express = require('express');
const axios = require('axios');
const moviename = require('movies-names');


let router = express.Router();

//command for getting a movie
const getMovie = async () => {
    //generates the random movie's name
    const randomMovie = moviename.random();
    const movie_name = randomMovie.title.split(' ').join('_');

    //calls for the api
    const data = await axios.get(`https://www.omdbapi.com/?t=${movie_name}&apikey=${process.env.OMDB_API_KEY}`);
    const movieInfo = data.data;
    
    if (movieInfo.Response === "False") {
        getMovie();
    } else {
        return movieInfo
    }
}

router.route('/')
.get(async (req, res) => {
    //queries how many times
    let howMany = 1;

    if (req.query.number) {
        howMany = req.query.number;
    }

    //limits the query number
    if (req.query.number > 5) {
        howMany = 5;
    }

    let movieList = [];

    //makes the list empty before adding movies
    movieList=[];

    for (let i = 0;i < howMany; i++) {
        const movieData = await getMovie();
        movieList.push(movieData)
    }

    return res.json(movieList);

});

module.exports = router
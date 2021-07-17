const express = require('express');
const axios = require('axios');
const moviename = require('movies-names');


let router = express.Router();

router.route('/')
.get(async (req, res) => {
    //gets random movie name
    const randomMovie = moviename.random();

    //replace spaces with underscore if there is
    const movie_name = randomMovie.title.split(' ').join('_');

    //fetches the data from omdb
    try {
        const data = await axios.get(`https://www.omdbapi.com/?t=${movie_name}&apikey=${process.env.OMDB_API_KEY}`);
        return res.json(data.data);
    } catch (err) {
        console.log(err)
        return res.json({msg: "Something went wrong"});
    }
});

module.exports = router
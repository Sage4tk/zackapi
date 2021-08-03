const express = require('express');
const axios = require('axios');

let router = express.Router();

router.route('/')
.get(async (req, res) => {
    //handle if no city query
    if(!req.query.city) {
        return res.json({
            msg: "City does not exist",
            success: false
        })
    }
    
    try {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.WEATHER_API}`);
        return res.json(data.data);
    } catch (err) {
        console.log(err)
        return res.json({
            msg: "Something went wrong.",
            success: false
        })
    }

})

module.exports = router;
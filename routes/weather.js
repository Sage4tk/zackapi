const express = require('express');
const axios = require('axios');

let router = express.Router();

router.route('/')
.get(async (req, res) => {
    if (req.query.city || (req.query.lon && req.query.lat)) {
        //for coords
        if(req.query.lat && req.query.lon) {
            try {
                const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API}`)
                return res.json(data.data)
            } catch (err) {
                console.log(err)
                return res.json({
                    msg: "Something went wrong.1",
                    success: false
                })
            }
        }
        
        //for city
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
    }

    //handle if no city query or coords
    return res.json({
        msg: "City does not exist",
        success: false
    })
})

module.exports = router;
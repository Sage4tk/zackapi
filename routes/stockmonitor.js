const express = require('express');
const cookieParser = require('cookie-parser');

let router = express.Router();

//schema
const stockSchema = require('../models/Stock');

//middleware
const authToken = require('../middleware/authToken');

router.route('/')
.get((req, res) => {
    res.clearCookie('jwt');
    return res.json({ msg: "cookie has been cleared"});
})
.post(authToken,async (req, res) => {
    //handle if no bought value
    if (!req.body.bought || !req.body.price) return res.json({
        msg: "No price value",
        success: false
    })

    let date = new Date()
    const saveStock = new stockSchema({
        bought: req.body.bought,
        price: req.body.price,
        date: date.toLocaleDateString()
    })

    try {
        await saveStock.save();
        return res.status(200).json({
            msg: "Purchase has been saved",
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: "Something went wrong",
            success: false
        })
    }
})

module.exports = router;
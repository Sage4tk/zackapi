const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let router = express.Router();

//import model
const userSchema = require('../models/User');

router.route('/')
.post(async (req, res) => {
    try {
        await userSchema.findOne({ username: req.body.username}, async (err, results) => {
            //handle error
            if (err) return res.status(500).json({
                msg: "Something went wrong",
                logged: false
            })
            //if no user exist
            if (results === null) return res.json({
                msg: "User does not exist",
                logged: false
            })

            await bcrypt.compare(req.body.password, results.password, (error, result) => {
                if (error) return res.status(500).json({
                    msg: "Something went wrong",
                    logged: false
                })
                if (result) {
                    const accessToken = jwt.sign({ name: req.body.username }, process.env.ACCESS_TOKEN);
                    return res.status(200).json({
                        jwt: accessToken,
                        msg: "Logged in!",
                        logged: true
                    })
                }
                //if does not match
                return res.json({msg: "Password does not match."});
            })
        })
    } catch (err) {
        return res.json({
            msg: "Something went wrong",
            logged: false
        })
    }
})

module.exports = router
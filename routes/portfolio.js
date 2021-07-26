const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();

//import models
const projectSchema = require('../models/Project');

router.route('/')
.get((req, res) => {
    return res.json({msg: "all good"})
})
.post(async (req, res) => {
    try {
        const saveItem = new projectSchema({
            title: "test",
            imgUrl: "test",
            websiteLink: "test",
            websiteDescription: "test",
            technology: "test"
        })

        await saveItem.save();
        return res.json({msg: "saved"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "something went wrong"})
    }
})

module.exports = router
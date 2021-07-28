const express = require('express');
const mongoose = require('mongoose');

let router = express.Router();

//import models
const projectSchema = require('../models/Project');

//middleware
// const authToken = require('../middleware/authToken');

router.route('/')
.get(async (req, res) => {
    try {
        const data = await projectSchema.find();
        return res.json(data)
    } catch (err) {
        return res.json({msg: "Something went wrong", status: "failed"});
    }
})
.post(async (req, res) => {
    try {
        const saveItem = new projectSchema({
            title: req.body.title,
            imgUrl: req.body.imgUrl,
            websiteLink: req.body.websiteLink,
            websiteDescription: req.body.websiteDescription,
            technology:  req.body.technology
        })

        await saveItem.save();
        return res.json({msg: "saved"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "something went wrong"})
    }
});

module.exports = router
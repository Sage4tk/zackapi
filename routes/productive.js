const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

let router = express.Router();

//models
const productiveSchema = require('../models/ProductivePost');

router.route('/')
.get(async (req, res) => {
    try {
        const data = await productiveSchema.find();
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.json({msg: "failed"});
    }
})
.post(async (req, res) => {
    try {
        const savePost = new productiveSchema({
            post: "memes",
            date: new Date().toLocaleDateString()
        })

        await savePost.save();
        return res.json({msg: "donzo"});
    } catch (err) {
        console.log(err);
        return res.json({msg:"failed"});
    }
})

module.exports = router;
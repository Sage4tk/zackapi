const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

let router = express.Router();

//schema
const stockSchema = require('../models/Stock');

//middleware
const authToken = require('../middleware/authToken');

router.route('/')
.get(async (req, res) => {
    try {
        const data = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=VOO&apikey=${process.env.STOCK_API}`);
        const stock= data.data["Time Series (Daily)"]
        const selectorStock = stock[Object.keys(stock)[0]];

        let stockData = await stockSchema.find();
        stockData = JSON.parse(JSON.stringify(stockData))

        //adds key for roi + amount
        const finalStock = stockData.map((e) => {
            e.finalPrice = parseFloat(((((parseFloat(selectorStock['4. close']) - e.price) / e.price) + 1) * e.bought).toFixed(2));
            return e;
        })

        console.log(finalStock)
        return res.json({
            bought: finalStock,
            lastPrice: stock[Object.keys(stock)[0]]
        });
    } catch (err) {
        console.log(err)
        res.json({
            msg: "Something went wrong.",
            success: false
        })
    }
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
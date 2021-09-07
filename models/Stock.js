const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    bought: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema);
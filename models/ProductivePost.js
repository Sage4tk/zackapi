const mongoose = require('mongoose');

const productiveSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Productive', productiveSchema)
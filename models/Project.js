const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    websiteLink: {
        type: String,
        required: true
    },
    websiteDescription: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema)
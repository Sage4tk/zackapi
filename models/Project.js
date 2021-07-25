const mongoose = require('mongoose');

const projectScheme = new mongoose.Scheme({
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
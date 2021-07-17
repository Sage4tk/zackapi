const express = require('express');
const path = require('path');

let router = express.Router();

const views = path.join(__dirname, '../views/index.html');

router.route('/')
.get((req, res) => {
    return res.sendFile(views);
})

module.exports = router
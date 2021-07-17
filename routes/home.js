const express = require('express');

let router = express.Router();

router.route('/')
.get((req, res) => {
    return res.send("WELCOME")
})

module.exports = router
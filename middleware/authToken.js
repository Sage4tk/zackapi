const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function authToken(req, res, next)  {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token == null) return res.status(401).json({msg: "Unauthorized"});

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(401).json({msg: "Unauthorized"});
        req.user = user;
        next();
    })
}
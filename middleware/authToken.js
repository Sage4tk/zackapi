const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = function authToken(req, res, next)  {
    const cookie = req.cookies.jwt;

    if (!cookie) return res.status(401).json({ msg: "Unauthorized"});

    jwt.verify(cookie, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(401).json({msg: "Unauthorized"});
        req.user = user;
        next();
    })
}
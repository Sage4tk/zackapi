const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

dotenv.config();
//middleware
app.use(cors());
app.use(express.json({ limit: "2MB"}));
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"))

//database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to database')
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//import routes
const home = require('./routes/home');
const randomMovie = require('./routes/randomMovie');
const portfolio = require('./routes/portfolio')
const auth = require('./routes/auth');
const weather = require('./routes/weather')

//routes
//home route
app.use('/', home);
//portfolio route
app.use('/api/portfolio', portfolio);
//random movie route
app.use('/api/random_movie', randomMovie);
//auth route
app.use('/auth', auth);
//weather route
app.use('/api/weather', weather);

app.listen(process.env.PORT || 4000, () => {
    console.log('App is running')
});
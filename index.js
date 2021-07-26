const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

dotenv.config();
//middleware
app.use(cors());
app.use(express.json({ limit: "2MB "}));
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

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

//routes
//home route
app.use('/', home);
//portfolio route
app.use('/api/portfolio', portfolio);
//random movie route
app.use('/api/random_movie', randomMovie);

app.listen(process.env.port || 4000, () => {
    console.log('App is running')
});
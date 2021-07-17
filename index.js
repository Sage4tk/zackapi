const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const favicon = require('serve-favicon')
const path = require('path')

const app = express();

dotenv.config();
//middleware
app.use(cors());
app.use(express.json({ limit: "2MB "}));
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//import routes
const home = require('./routes/home');
const randomMovie = require('./routes/randomMovie');

//routes
//home route
app.use('/', home);
//random movie route
app.use('/api/random_movie', randomMovie);

app.listen(process.env.port || 3000, () => {
    console.log('App is running')
});
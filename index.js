const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { urlencoded } = require('express');

const app = express();

dotenv.config();
//middleware
app.use(cors());
app.use(express.json({ limit: "2MB "}));
app.use(express.urlencoded({extended:false}));



app.listen(process.env.port || 3000, () => {
    console.log('App is running')
})
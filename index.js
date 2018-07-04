var express = require('express');
var bodyParser = require('body-parser');

// Configure the database

const dbconfig = require('./config/dbconfig.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create Express app

const app = express();

// Parse request of content type application/ x-www-form url encoded

app.use(bodyParser.urlencoded({ extended: true }));

// Parse request of content type application/json

app.use(bodyParser.json())

// Connecting to the database

mongoose.connect(dbconfig.url)
    .then(() => {
        console.log("successfully connected to the database");
    }).catch(err => {
        console.log("could not connected to the database");
        process.exit();
    });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// Listen for requests

app.listen(3000, () => {
    console.log('Server is listening on PORT 3000');
})


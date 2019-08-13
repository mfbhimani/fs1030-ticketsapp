const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
require('dotenv').config();

const {getHomePage} = require('./routes/index');
const {addCustomerPage, addCustomer} = require('./routes/ticketing');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');

// const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    /* host: 'localhost',
    user: 'root',
    password: '',
    database: 'assg2tickets' */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
// app.set('port', process.env.port || port); // set express to use this port
app.set('port', process.env.HTTP_PORT || port);
// app.set('port', '5000');
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

/* app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer); */

app.get('/', getHomePage);
app.get('/register', addCustomerPage);
app.post('/register', addCustomer);


// set the app to listen on the port
app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server running on port: ${process.env.HTTP_PORT}`);
});
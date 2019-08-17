const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
require('dotenv').config();

const {getHomePage} = require('./routes/index');
const {addCustomerPage, addCustomer, addTicketPage, addTicket, viewOpenTicketsPage, viewTicketDetailsPage, loginPage, loginUser, updateTicket} = require('./routes/ticketing');

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

app.get('/', getHomePage);
app.get('/register', addCustomerPage);
app.get('/login', loginPage);
app.get('/add-ticket/:id', addTicketPage);
app.get('/tickets-viewopen/:id', viewOpenTicketsPage);
app.get('/ticket-view/:id', viewTicketDetailsPage);
app.post('/register', addCustomer);
app.post('/login', loginUser);
app.post('/add-ticket/:id', addTicket);
app.post('/ticket-view/:id', updateTicket);


// set the app to listen on the port
app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server running on port: ${process.env.HTTP_PORT}`);
});
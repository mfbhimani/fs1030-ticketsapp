const fs = require('fs');

module.exports = {
    addCustomerPage: (req, res) => {
        res.render('register.ejs', {
            title: "Register New Customer"
            ,message: ''
        });
    },
    loginPage: (req, res) => {
        res.render('login.ejs', {
            title: "Login to Ticketing site"
            ,message: ''
        });
    },
    loginUser: (req, res) => {
        console.log('here 3');
        console.log(req.body);
        let message = '' ;

        let username = req.body.username;
        let password = req.body.password;

        let usernameQuery = "SELECT * FROM `users` WHERE username = '" + username + "' AND password = '" + password + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                res.redirect('/tickets-viewopen/' + result[0].userid);
            } else {
                
                message = 'Incorect login info provided to access site';
                res.render('login.ejs', {
                    message,
                    title: "Login to Ticketing site"
                });

            }
        }); 

    },
    addCustomer: (req, res) => {

        console.log('here 1');
        console.log(req.body);
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let phone = req.body.phone;
        let username = req.body.username;
        let password = req.body.password;

        console.log(`first name is ${first_name}`) 

        let usernameQuery = "SELECT * FROM `users` WHERE username = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('register.ejs', {
                    message,
                    title: "Register New Customer"
                });
            } else {              
                        
                        let query = "INSERT INTO `users` (first_name, last_name, email, phone, username, password, role) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + email + "', '" + phone + "', '"  + username + "', '" + password + "', 'customer')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                 
            }
        });
    },
    addTicketPage: (req, res) => {
        res.render('ticket-create.ejs', {
            title: "Create New Ticket"
            ,message: ''
        });
    },
    updateTicket: (req, res) => {

        console.log('here 2');
        console.log(req.body);
        let message = '';
        let ticket_id = req.params.id;
        let ticket_comments = req.body.ticket_comments;

        let usernameQuery = "UPDATE `tickets` SET ticket_comments = '" + ticket_comments + "' WHERE ticketid = '" + ticket_id + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/ticket-view/' + ticket_id);
        });
            
    }, 
    addTicket: (req, res) => {

        console.log('here 2');
        console.log(req.body);
        let message = '';
        let user_id = req.params.id;
        let ticket_subject = req.body.ticket_subject;
        let ticket_comments = req.body.ticket_comments;
        let ticket_status = req.body.ticket_status;

        // console.log(`first name is ${first_name}`) 

        let usernameQuery = "SELECT * FROM `users` WHERE userid = '" + user_id + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length = 0) {
                message = 'User ID does not exist in db';
                res.render('ticket-create.ejs', {
                    message,
                    title: "Create New Ticket"
                });
            } else {              
                        // enter ticket details to the database
                        let query = "INSERT INTO `tickets` (ticket_subject, ticket_comments, ticket_status, userid) VALUES ('" +
                            ticket_subject + "', '" + ticket_comments + "', '" + ticket_status + "', '" + user_id + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/tickets-viewopen/' + user_id);
                        });
                 
            }
        });
    },
    viewOpenTicketsPage: (req, res) => {
        let user_id = req.params.id;
        let query = "SELECT tickets.ticket_subject, tickets.ticket_comments, tickets.ticket_status, tickets.ticketid, tickets.ticket_creation_date, users.first_name, users.last_name, users.userid FROM `tickets` JOIN `users` ON tickets.userid = users.userid WHERE  tickets.userid = '" + user_id + "' ORDER BY tickets.ticket_creation_date DESC"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('ticketsopen-view.ejs', {
                title: "View Open Tickets"
                ,tickets: result,userinfo: req.params.id
            });
        });

    },
    viewTicketDetailsPage: (req, res) => {
        let ticket_id = req.params.id;
        let message = '';
        let query = "SELECT tickets.ticket_subject, tickets.ticket_comments, tickets.ticket_status, tickets.ticketid, tickets.ticket_creation_date, users.first_name, users.last_name, users.email, users.phone FROM `tickets` JOIN `users` ON tickets.userid = users.userid WHERE  tickets.ticketid = '" + ticket_id + "'"; 

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            
            res.render('ticket-details.ejs', {
                message,
                title: "View Ticket Details"
                ,ticket: result
            });
        });

    }
    
};
const fs = require('fs');

module.exports = {
    addCustomerPage: (req, res) => {
        res.render('register.ejs', {
            title: "Register New Customer"
            ,message: ''
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
                        // send the player's details to the database
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
                            res.redirect('/');
                        });
                 
            }
        });
    },
    viewOpenTicketsPage: (req, res) => {
        let user_id = req.params.id;
        let query = "SELECT tickets.ticket_subject, tickets.ticket_comments, tickets.ticket_status, tickets.ticketid, tickets.ticket_creation_date, users.first_name, users.last_name FROM `tickets` JOIN `users` ON tickets.userid = users.userid WHERE  tickets.userid = '" + user_id + "' ORDER BY tickets.ticket_creation_date DESC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('ticketsopen-view.ejs', {
                title: "View Open Tickets"
                ,tickets: result
            });
        });

    },
    viewTicketDetailsPage: (req, res) => {
        let ticket_id = req.params.id;
        let message = '';
        let query = "SELECT tickets.ticket_subject, tickets.ticket_comments, tickets.ticket_status, tickets.ticketid, tickets.ticket_creation_date, users.first_name, users.last_name, users.email, users.phone FROM `tickets` JOIN `users` ON tickets.userid = users.userid WHERE  tickets.ticketid = '" + ticket_id + "'"; // query database to get all the players

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
    /* editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Player"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    } */
};
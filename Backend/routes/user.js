const e = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();


const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require("dotenv").config();

// Services
var auth = require('../services/authentication');
var checkRoleStudent = require('../services/checkRoleConsultant');
var checkRoleConsultant = require('../services/checkRoleAdmin');
var checkRoleAdmin = require('../services/checkRoleStudent');
const sendEmail = require('../services/gmail') // For gmail

//Student Sign Up
router.post('/signup', (req, resp) => {
    let user = req.body;
    let query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contact_number, email, password, status, role) values (?,?,?,?,0,'student')";
                connection.query(query, [user.name, user.contact_number, user.email, user.password], (err, results) => {
                    if (!err) {
                        return resp.status(200).json({ message: "Successfully registered" });
                    }
                    else
                        return resp.status(500).json({ message: err });
                });
            }
            else
                return resp.status(400).json({ message: "Email address already exists" })
        }
        else
            return resp.status(500).json(err);
    })
});

//Create Consultant
router.post('/addconsultant', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    let query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contact_number, email, password, status, role) values (?,?,?,?,0,'consultant')";
                connection.query(query, [user.name, user.contact_number, user.email, user.password], (err, results) => {
                    if (!err) {
                        return resp.status(200).json({ message: "Consultant Created" });
                    }
                    else
                        return resp.status(500).json({ message: err });
                });
            }
            else
                return resp.status(400).json({ message: "Email address already exists" })
        }
        else
            return resp.status(500).json(err);
    })
});

router.post("/login", (req, resp) => {
    const user = req.body;
    query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        console.log(results);
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password)
                return resp.status(401).json({ message: "Incorrect username or password" });
            else if (results[0].status === 0) {
                return resp.status(401).json({ message: "Wait for admin approval" });
            }
            else if (results[0].password === user.password) {
                // console.log("Uname Password Matches");
                const payload = { email: results[0].email, role: results[0].role };
                accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                resp.status(200).json({ token: accessToken });
            }
            else return resp.status(400).json({ message: "Something went wrong. Please try again later." });
        }
        else
            return resp.status(500).json(err);
    });
});

//Forgot Password
router.post("/forgotpassword", (req, resp) => {
    const user = req.body;
    query = "select email, password from user where email=?";
    connection.query(query, [user.email], async (err, results) => {
        // console.log(results);
        if (!err) {
            if (results.length <= 0) {
                console.log(user.email + "Email not in the database");
            }
            else {
                let result = await sendEmail(results[0].email, process.env.EMAIL_USER, "Password by Kas Migration System", `<p><b>Your login details</b><br/><b>Email:</b> ${results[0].email}<br/><b>Password:</b> ${results[0].password}<br/><br/><a href='http://localhost:4200' target='_blank' rel='noopener noreferrer'>Click here to login with your credentials</a></p>`);
                console.log("Result - " + result); // If you want to log what result was
            }
        }
        else
            return resp.status(500).json(err);
    });
    return resp.status(200).json({ message: "If the email associated matches with our records then we will send you details." });
});



// Get list of students
router.get("/getstudents", auth.authenticateToken, (req, resp) => {
    let query = "select id, name, contact_number, email, status from user where role ='student'";
    connection.query(query, (err, results) => {
        if (!err) {
            return resp.status(200).json(results);
        }
        else {
            return resp.status(500).json(err);
        }
    });
});

//Update Status
router.patch("/update", auth.authenticateToken, (req, resp) => {
    let user = req.body;
    console.log()
    let query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 1) {
                resp.status(200).json({ message: "Update successfully" })
            }
            else {
                resp.status(400).json({ message: "Issue updating the status. Please provide correct id." })
            }
        }
        else
            resp.status(500).json(err);
    });
});

//Change Password
router.post('/changepassword',auth.authenticateToken, (req, res) => {
    let user = req.body;
    let email = res.locals.email;
    console.log(email)
    var query = "select * from user where email=? and password=?";
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect Old Password" });
            } else if (results[0].password == user.oldPassword) {
                query = "update user set password = ? where email = ?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password Updated Successfully" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                res.status(400).json({ message: "Something went wrong, please try again later" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

//Check Token
router.get('/checkToken',auth.authenticateToken, (request, response) => {
    return response.status(200).json({ message: "true" });
});

module.exports = router;
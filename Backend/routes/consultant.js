const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');

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

//Update Consultant
router.patch('/updateuserstatus/:id', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    let id = req.params.id;
    let query = "select * from user where id=? && role='consultant'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length > 0) {
                query = "update user set status=? where id=?";
                connection.query(query, [user.status, id], (err, results) => {
                    if (!err) {
                        return resp.status(200).json({ message: "User Updated" });
                    }
                    else
                        return resp.status(500).json({ message: err });
                });
            }
            else
                return resp.status(400).json({ message: "User Not Updated" });
        }
        else
            return resp.status(500).json(err);
    })
});

//Get all consultants
router.get("/getAllConsultants",auth.authenticateToken, (req, resp) => {
    let query = "select * from user where role='consultant'";
    connection.query(query, (err, results) => {
        if (!err) {
            return resp.status(200).json(results);
        }
        else {
            return resp.status(500).json(err);
        }
    });
});


module.exports = router;
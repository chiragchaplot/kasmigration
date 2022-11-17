const e = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.get('/details', auth.authenticateToken, (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    var tokenStruct = jwt.decode(token);
    var role = tokenStruct.role;
    const userId = tokenStruct.userid;

    if (role === process.env.ROLE_ADMIN || role === process.env.ROLE_CONSULTANT) {
        var matchStudents, unmatchedStudents, incompleteApplications, completedApplications;
        var matchStudentsQuery = "select count(*) as matchStudents from user where status=0 && role='student'";
        var unmatchedStudentsQuery = "select count(*) as unmatchStudents from application where consultantid IS NOT NULL";
        var incompleteApplicationsQuery = "select count(*) as incompleteApplications from application where stage != 5";
        var completedApplicationsQuery = "select count(*) as completeApplications from user where status=1 && role='student'";

        connection.query(matchStudentsQuery, (err, results) => {
            if (!err) {
                matchStudents = results[0].matchStudents;
            } else {
                return res.status(500).json(err)
            }
        })

        connection.query(unmatchedStudentsQuery, (err, results) => {
            if (!err) {
                unmatchedStudents = results[0].unmatchStudents;
            } else {
                return res.status(500).json(err)
            }
        })

        connection.query(incompleteApplicationsQuery, (err, results) => {
            if (!err) {
                incompleteApplications = results[0].incompleteApplications;
            } else {
                return res.status(500).json(err)
            }
        })

        connection.query(completedApplicationsQuery, (err, results) => {
            if (!err) {
                completedApplications = results[0].completeApplications;
                var data = {
                    role:role,
                    matchStudents: matchStudents,
                    unmatchedStudents: unmatchedStudents,
                    incompleteApplications: incompleteApplications,
                    completedApplications: completedApplications
                }
                return res.status(200).json(data);
            } else {
                return res.status(500).json(err)
            }
        })
    } else if (role === process.env.ROLE_STUDENT) {
        console.log(userId);
        var incompleteApplications, completedApplications;
        var incompleteApplicationsQuery = "select count(*) as incompleteApplications from application where stage != 5 AND studentid = ?";
        var completedApplicationsQuery = "select count(*) as completeApplications from application where stage = 5 AND studentid = ?";

        connection.query(incompleteApplicationsQuery,[userId], (err, results) => {
            if (!err) {
                incompleteApplications = results[0].incompleteApplications;
            } else {
                return res.status(500).json(err)
            }
        })

        connection.query(completedApplicationsQuery,[userId], (err, results) => {
            if (!err) {
                completedApplications = results[0].completeApplications;
                var data = {
                    role:role,
                    incompleteApplications: incompleteApplications,
                    completedApplications: completedApplications
                }
                return res.status(200).json(data);
            } else {
                return res.status(500).json(err)
            }
        })
    }

})

module.exports = router
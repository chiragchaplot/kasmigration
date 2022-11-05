const e = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details',auth.authenticateToken,(req,res,next)=>{
    var matchStudents, unmatchedStudents, incompleteApplications, completedApplications;
    var matchStudentsQuery  = "select count(*) as matchStudents from application where consultantid IS NULL";
    var unmatchedStudentsQuery = "select count(*) as unmatchStudents from application where consultantid IS NOT NULL";
    var incompleteApplicationsQuery = "select count(*) as incompleteApplications from application where stage != 5 AND status = 0";
    var completedApplicationsQuery = "select count(*) as completeApplications from application where stage = 5 AND status = 1";
    
    connection.query(matchStudentsQuery,(err,results)=>{
        if(!err) {
            matchStudents = results[0].matchStudents;
        } else {
            return res.status(500).json(err)
        }
    })

    connection.query(unmatchedStudentsQuery,(err,results)=>{
        if(!err) {
            unmatchedStudents = results[0].unmatchStudents;
        } else {
            return res.status(500).json(err)
        }
    })

    connection.query(incompleteApplicationsQuery,(err,results)=>{
        if(!err) {
            incompleteApplications = results[0].incompleteApplications;
        } else {
            return res.status(500).json(err)
        }
    })

    connection.query(completedApplicationsQuery,(err,results)=>{
        if(!err) {
            completedApplications = results[0].completeApplications;
            var data = {
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


})

module.exports = router
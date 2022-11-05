const express = require('express');
const { response } = require('..');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.post('/createApplication',(req,res,next)=>{
    const body = req.body;
    checkExistingApplicationQuery = "select * from application where studentid=? && courseid=?";
    connection.query(checkExistingApplicationQuery, [body.studentid, body.courseid], (err, results) => {
        if(!err) {
            if (results.length<=0) {
                createApplicationQuery = "insert into application(studentid,stage,courseid,status) values(?,1,?,0)";
                connection.query(createApplicationQuery, [body.studentid, body.courseid],(err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Application Started" });
                    }
                    else
                        return res.status(500).json({ message: err });
                });
            } else {
                return res.status(406).json({message:"Application already exists"});
            }
        }
    })
})

router.post

module.exports = router
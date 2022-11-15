const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.post('/createApplication', auth.authenticateToken, (req, res, next) => {
    const body = req.body;
    checkExistingApplicationQuery = "select * from application where studentid=? && courseid=?";
    connection.query(checkExistingApplicationQuery, [body.studentid, body.courseid], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                createApplicationQuery = "insert into application(studentid,stage,courseid,status) values(?,1,?,0)";
                connection.query(createApplicationQuery, [body.studentid, body.courseid], (err, results) => {
                    if (!err) {
                        return res.status(200).json({message: "Application Created"});
                    }
                    else {
                        return res.status(500).json({ message: err });
                    }
                });

            } else {
                return res.status(406).json({ message: "Application already exists" });
            }
        }
    })
})

router.post('/getStudentApplication', auth.authenticateToken, (req, res, next) => {
    const body = req.body;
    getAppDetails = "select a.id as applicationid, a.studentid as studentid, as2.description as applicationstage, u.name as studentname, u.contactNumber as phone, u.email as email, c.name  as coursename, university.name as universityname  from application a inner join user u on u.id = a.studentid INNER JOIN courses c on c.id = a.courseid inner join applicationStage as2  on as2.id = a.stage inner join university on c.universityid = university.id  where a.studentid=? && a.courseid = ?";
    connection.query(getAppDetails, [body.studentid, body.courseid], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(406).json({ message: "Application Created But Trouble Reading Data" });
        }
    });
})

router.post('/getapplications', auth.authenticateToken, (req, res, next) => {
    const body = req.body;
    checkExistingApplicationQuery = "select a.id as applicationid, u.name, c.name as course,  as2.description as applicationstage, u2.name as universityname from application a  inner join user u on u.id = a.studentid  INNER JOIN courses c on c.id = a.courseid  inner join applicationStage as2  on as2.id = a.stage inner join university u2 on c.universityid  = u2.id  where a.studentid=?";
    connection.query(checkExistingApplicationQuery, [body.id], (err, results) => {
        //console.log(query);
        if (!err) {
            return res.status(200).json(results);
        } else {
            console.log(err);
            return resp.status(500).json(err);
        }
    })
})

router.post

module.exports = router
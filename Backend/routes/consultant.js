const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');

//Create Consultant
router.post('/addconsultant', auth.authenticateToken, (req, resp) => {
    console.log("try");
    let user = req.body;
    let query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contact_number, email, password, status, role) values (?,?,?,'password',1,'consultant')";
                connection.query(query, [user.name, user.contactNumber, user.email], (err, results) => {
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

//Create Consultant
router.patch('/updateconsultant', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    let id = user.id;
    console.log(id);
    let query = "select * from user where id=?";
    connection.query(query, id, (err, results) => {
        if (!err) {
            if (results.length >= 0) {
                query = "update user set name=?, contact_number=?, email=? where id=?";
                connection.query(query, [user.name, user.contactNumber, user.email, id], (err, results) => {
                    if (!err) {
                        return resp.status(200).json({ message: "Consultant Updated" });
                    }
                    else
                        return resp.status(500).json({ message: err });
                });
            }
            else
                return resp.status(400).json({ message: "Details are not matching" })
        }
        else
            return resp.status(500).json(err);
    })
});


//Update Consultant Status
router.patch('/updateuserstatus', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    let id = user.id;
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

//Get all applications
router.get('/getapplications',(req,res,next)=>{
    const body = req.body;
    checkExistingApplicationQuery = "select a.id as applicationid, u.name, c.name as course,  as2.description as applicationstage, u2.name as universityname from application a  inner join user u on u.id = a.studentid  INNER JOIN courses c on c.id = a.courseid  inner join applicationStage as2  on as2.stage = a.stage inner join university u2 on c.universityid  = u2.id";
    connection.query(checkExistingApplicationQuery, (err, results) => {
        if(!err) {
            return res.status(200).json(results);
        } else {
            return resp.status(500).json(err);
        }
    })
})


module.exports = router;
const e = require('express');
const express = require('express');
const connection = require('../connection');
var auth = require('../services/authentication');
const router = express.Router();

router.get("/universities", (req, resp) => {
    let query = "select name from university";
    connection.query(query, (err, results) => {
        if (!err) {
            return resp.status(200).json(results);
        }
        else {
            return resp.status(500).json(err);
        }
    });
});

router.get("/findcourse", (req, resp) => {
    let query = "select * from courses";
    connection.query(query, (err, results) => {
        if (!err) {
            return resp.status(200).json(results);
        }
        else {
            return resp.status(500).json(err);
        }
    });
});

// Get courses per university
router.get('/getbyuniversity/:id',(req,res,next)=>{
    let id = req.params.id;
    let spec = req.body
    var query = "select * from courses where universityid=? and status='1'";
    connection.query(query,[id,spec.level],(err,results) => {
        if(!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
});

// Update Status for University Course
router.patch('/updateuniversitycourse',auth.authenticateToken,(req,res) => {
    let courseDetails = req.body;
    var query = "update courses set status=? where id=?";
    connection.query(query,[courseDetails.status, courseDetails.id],(err,result)=> {
        if(!err) {
            if(result.affectedRows == 0) {
                return res.status(400).json({message:"Course not found"});
            } else {
                return res.status(400).json({message: "Course Updated"});
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;
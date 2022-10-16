const e = require('express');
const express = require('express');
const connection = require('../connection');
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
module.exports = router;
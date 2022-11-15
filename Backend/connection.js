const mysql = require('mysql');
const { getLogger } = require('nodemailer/lib/shared');
require('dotenv').config();

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

var pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout:31536000000
})

// connection.connect((err) => {
//     if(err) {
//         console.log(`Error while connecting to MySQL - ${err}`);
//         throw err;
//     }
//     console.log("Database Connection established!");
// });

pool.on('connection', function(_conn){

    if(_conn){
        console.log('Connected to DB via threadID' + _conn.threadId);
        _conn.query('SET SESSION auto_increment_increment=1');
    } else {
        console.log(_conn);
    }
    console.log("Database Connection established!");
});

module.exports = connection
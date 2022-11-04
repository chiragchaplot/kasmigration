const nodemailer = require('nodemailer');
// const { response } = require('..');
require('dotenv').config();

exports = module.exports = sendEmail = (to, from, subject, body) => {
    const mailOptions = {
        to: to,
        from: from || process.env.EMAIL_USER,
        subject: subject,
        html: body
    }
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        port: 465,
        host: 'smtp.gmail.com'
    }).sendMail(mailOptions, (err, info) => {
        if (!err) {
            return true;
        }
        else {
            console.log("Error while sending email - " + err);
            return false;            
        }
    })
    return true;

}

const nodemailer = require('nodemailer');

var sub = "Test";
var to = "chiragchaplot@gmail.com";
var text = "Test Email";

const msg = {
    from: process.env.app.EMAIL,
    to: to,
    subject: sub,
    text: text
}

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    port: 465,
    host: "smtp.gmail.com"
});
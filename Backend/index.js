const express  = require('express');
var cors = require('cors');
const { urlencoded } = require('express');
const app = express();
const connectionSettings = require('./connection');
const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');
const dashboardRoute = require('./routes/dashboard');
app.use(cors());
app.use(urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/courses',courseRoute);
//app.use('/dashboard',dashboardRoute);
app.connect(connectionSettings)
module.exports = app;
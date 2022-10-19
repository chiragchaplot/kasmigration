require ('dotenv').config();
const http = require('http');
const app = require('./index')

//Create The Server
const server = http.createServer(app);

//Start and listen on theport defined in .env file
server.listen(process.env.PORT);
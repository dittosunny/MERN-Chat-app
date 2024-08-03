const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const port = process.env.PORT
const authroute = require('./routes/authRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');
const  connectMongoDb  = require('./DB/MDBconnection');

const {app,server} = require('./Socket/socket')


app.use(express.json());
app.use(cookieParser())
//to parse the incoming requests with json payloads from req.body
//routes
app.use("/auth",authroute)
app.use("/message",messageRoute)
app.use("/users",userRoute)

app.get('/', function(req, res) {   res.send('Hi') });  


server.listen(port, () => {
    connectMongoDb();
    console.log(`http://localhost ${port}`);
});

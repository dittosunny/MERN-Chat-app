const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const port = process.env.port
const authroute = require('./routes/authRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');
const  connectMongoDb  = require('./DB/MDBconnection');


app.use(express.json());
app.use(cookieParser())
//to parse the incoming requests with json payloads from req.body
//routes
app.use("/auth",authroute)
app.use("/message",messageRoute)
app.use("/users",userRoute)

app.get('/', function(req, res) {   res.send('Hi') });  


app.listen(port, () => {
    connectMongoDb();
    console.log(`Server running at port ${port}`);
});

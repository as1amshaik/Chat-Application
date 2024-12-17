const cors = require('cors');
const express = require("express");
const http = require("http");

const session = require('express-session');
const bodyParser = require('body-parser');
const {PORT}=require('./config')

const io = require('socket.io')





const path = require("path");

console.log(PORT)
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'user_name_session',
    resave: false,
    saveUninitialized: true
}));
const server = http.createServer(app);

const soc = io(server);            // Initialize Socket.IO on the server

soc.on("connection",s=>{
    console.log(s.id)


    s.on("broadcastMessage", (message,sender) => {
        console.log("Broadcasting message:", message);
        io.emit("newMessage", { text: message, sender:sender });
      });
    

});



const userRoute = require("./routes/user");
const homeRoute = require("./routes/home");
const { Socket } = require('socket.io');


app.use(express.json());
app.use(cors()); // Enable CORS for all routes




app.use("/user", userRoute);
app.use("/home", homeRoute);
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});












app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
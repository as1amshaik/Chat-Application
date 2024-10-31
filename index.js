const express = require("express");

const session = require('express-session');
const bodyParser = require('body-parser');
// const {socketIo} = require('socket.io')





const path = require("path");
const {PORT}=require('./config')

console.log(PORT)
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'user_name_session',
    resave: false,
    saveUninitialized: true
}));
// const io = socketIo(app);            // Initialize Socket.IO on the server



const userRoute = require("./routes/user");
const homeRoute = require("./routes/home");


app.use(express.json());

app.use("/user", userRoute);
app.use("/home", homeRoute);
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});












app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
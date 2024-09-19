const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();



// process.env from dotenv, to prevent link from beign displayable on git
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongodb Connected!");
    }).catch((err) => console.log(err));



    
app.listen(5933, ()=>{
    console.log("Backend server is running fart.")
})
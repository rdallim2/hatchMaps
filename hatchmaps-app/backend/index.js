import express from 'express';
const app = express();
import dotenv from 'dotenv'; // Simplifies use of environment variables
import router from './routes/routes.js';
import mysql from 'mysql2';
import connection from './routes/db.js';


dotenv.config();

app.use(express.json()); //So that you are abloe to use JSON

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"temps"
})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });

// process.env from dotenv, to prevent link from beign displayable on git

app.listen(5933, ()=>{
    console.log("Backend server is running.");
});
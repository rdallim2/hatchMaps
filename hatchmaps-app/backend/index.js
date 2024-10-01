import express from 'express';
const app = express();
import dotenv from 'dotenv'; // Simplifies use of environment variables
import router from './routes/routes.js';
import mysql from 'mysql2';
import connection from './routes/db.js';
import temps from './scraper.js';
import cron from 'node-cron';


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

await temps();

cron.schedule('0 * * * *', async () => {
    console.log("Running the web scraper");
    try {
        await temps();  // Await the async function
        console.log("Web scraper completed successfully");
    } catch (error) {
        console.error("Error running the web scraper:", error);
    }
});

// process.env from dotenv, to prevent link from beign displayable on git

app.listen(5933, ()=>{
    console.log("Backend server is running.");
});
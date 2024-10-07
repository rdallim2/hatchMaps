import express from 'express';
const app = express();
import dotenv from 'dotenv'; // Simplifies use of environment variables
import router from './routes/routes.js';
import mysql from 'mysql2';
import connection from './routes/db.js';
import temps from './scraper.js';
import cron from 'node-cron';
import cors from 'cors';

app.use(cors());


dotenv.config();

app.use(express.json()); //So that you are abloe to use JSON

const express = require('express');  // Import Express (if you're using it)
const mysql = require('mysql2/promise');  // Import mysql2 library

const port = process.env.PORT || 3000;  // Set your server port

async function connectWithRetry() {
  const maxRetries = 5;  // Maximum number of retries
  let attempt = 0;       // Current attempt count

  while (attempt < maxRetries) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'temps',
      });
      console.log('Connected to MySQL successfully');
      return connection;  // Return the connection if successful
    } catch (error) {
      attempt++;
      console.error(`Error connecting to MySQL (attempt ${attempt}):`, error.message);
      if (attempt < maxRetries) {
        // Wait for 2 seconds before the next attempt
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        console.error('Max retries reached. Could not connect to MySQL.');
        throw error;  // Re-throw the error after max retries
      }
    }
  }
}

// Start the server and connect to MySQL
(async () => {
  try {
    const connection = await connectWithRetry();
    // Here you can start your server after successfully connecting to MySQL
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Use the connection for queries or pass it to your routes
    // For example, you can set the connection in a global variable or context
    app.set('dbConnection', connection);
    
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    // Optionally exit the process if the database connection fails
    process.exit(1);  // Exit with an error code
  }
})();


/*
const db = mysql.createConnection({
    host:"mysql",
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
*/

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

app.use('/', router);

app.listen(5933, ()=>{
    const host = 'localhost'; // or use the actual host if needed
    const port = 5933;
    console.log(`Backend server is running at http://${host}:${port}`);
});
import mysql from "mysql2"

const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // 'db' from docker-compose
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
  });

export default connection;
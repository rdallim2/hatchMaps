import mysql from "mysql2"

const connection = mysql.createConnection({
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

export default connection;
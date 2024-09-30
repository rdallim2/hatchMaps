import express from 'express';
const router = express.Router();
import connection from './db.js';


router.get("/temps", async (req,res)=>{
    connection.query('SELECT * FROM temps', (error, results, fields) =>{
        if (error) throw error;
        res.json(results);
    })
});



export default router;
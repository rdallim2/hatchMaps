import express from 'express';
const router = express.Router();
import connection from './db.js';

router.get('/', (req, res)=>{
    res.status(200);
    res.send("Reached root URL of backend");
})

router.get("/temps", async (req,res)=>{
    connection.query('SELECT * FROM hatch_maps_241007.water_data', (error, results, fields) =>{
        if (error) throw error;
        res.json(results);
    })
});



export default router;
const router = require("express").Router();
const Pin = require("../models/Pin");

// Create a pin (As in a marker on the map), using a post request

router.post("/", async(req, res)=>{ //short for request/response
    const newPin = new Pin(req.body); // Try saving new pin, requesting body, if error
    try{
        const savedPin = await newPin.save(); //use await so that the line below doesn't send before the data is properly saved
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all pins

router.get("/", async (req,res)=>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins); 
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router
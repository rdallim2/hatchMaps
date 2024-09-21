const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Register
router.post("/register", async(req,res)=>{
    try{
        //Generate new password
        const salt = await bcrypt.genSalt(10); //salt is a random string used to enhance security
        console.log("Salt generated:", salt); 
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //concatenates pass with salt and hashes

        //Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //Save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post("/login", async(req,res)=>{
    try{
        //find user
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("Wrong email or password!"); //400 error means invalid credentials
        
        //validate password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        !validPassword && res.status(400).json("Wrong email or password!");
        //send res
        res.status(200).json({ _id: user._id, email: user.email});

    }catch(err){
        res.status(500).json(err);
    }
});

//Login



module.exports = router
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req,res) => {
    const {username, passsword} = req.body;
    try{
        const admin = await User.findOne({username});
        if(!admin){
            return res.status(404).json({message: "Admin not found"});
        } 
        if(admin.passsword !== passsword){
            res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: admin._id, username: admin.usernmae, role: admin.role }, 
            JWT_SECRET,
            {expiresIn: "1h"}
        )
        return res.status(200).json({
            message: "Admin logged in successfully",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    }catch(err){
        console.error("Failed to login as admin", err);
        res.status(500).json({message: "Failed to login as admin"});
    }
})

module.exports = router;
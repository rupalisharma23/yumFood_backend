const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.put('/updateInfo', async(req,res)=>{
    try{
          const {email, password} = req.body;
          if(email){
            let salt = await bcrypt.genSalt(10);
            let securePass = await bcrypt.hash(password, salt);
               const updateInfoItem = await User.findOneAndUpdate({email:email},{...req.body,password:securePass},{new:true})
               if (updateInfoItem) {            
               res.status(200).json("updated");
               }
               else{
                 return res.status(404).json({ error: "User not found" });
               }
          }
          else{
            res.status(400).json('email required');
          }
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error})
    }
})

module.exports = router
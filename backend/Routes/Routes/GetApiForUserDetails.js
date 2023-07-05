const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get('/userDetails', async(req,res)=>{
    try{
            const email = req.header('email');
            if(email){

            const userInfo = await User.findOne({ email: email });
            res.status(200).json({ userInfo });
            }
            else{
                res.status(400).json('email required')
            }
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:error})
    }
})

module.exports = router

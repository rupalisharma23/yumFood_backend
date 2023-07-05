const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.put('/updateInfo', async(req,res)=>{
    try{
          const {email, password} = req.body;
          const preemail = req.header('email');
          const emailExist = await User.findOne({email})
          if(emailExist && emailExist.email!==preemail){
            return res.status(404).json({ error: "email already exists" });
          }
          else{
          if (preemail) {
            const updateInfoItem = await User.findOneAndUpdate(
              { email: preemail },
              { ...req.body },
              { new: true }
            );
            if (updateInfoItem) {
              res.status(200).json("updated");
            } else {
              return res.status(404).json({ error: "User not found" });
            }
          } else {
            res.status(400).json("email required");
          }
          }
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error})
    }
})

module.exports = router
const express = require("express");
const router = express.Router();
const Cart = require("../../models/AddToCart");

router.get('/getCount', async (req,res)=>{
    try{
          const email = req.header('email');
          if(!email){
            res.status(400).json('email required')
          }
          else{
            const cartCount = await Cart.findOne({email});
            res.status(200).json({ count: cartCount.cart.length });
          }
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error})
    }
})

module.exports = router
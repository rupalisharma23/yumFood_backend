const express = require("express");
const router = express.Router();
const Cart = require("../../models/AddToCart");

router.post('/getCart', async (req,res)=>{
    try{
        const {email} = req.body;
        const getCartItems = await Cart.find({email:email});
        res.status(200).json(getCartItems)
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:error})
    }
})

module.exports = router

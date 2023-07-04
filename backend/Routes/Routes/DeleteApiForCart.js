const express = require('express')
const router = express.Router();
const Cart = require("../../models/AddToCart");
const mongoose = require('mongoose')

router.delete('/cartDelete/:id', async(req,res)=>{
    try{
            const id = req.params.id;
           const deleteCart = await Cart.findOneAndUpdate(
             {
               "cart._id": id, 
             },
             { $pull: { cart: { _id: id } } },
             { new: true }
           );
            res.status(200).json('item deleted')
    }
    catch(error){
        console.log(error);
        res.status(400).json({error:error})
    }
})

module.exports = router
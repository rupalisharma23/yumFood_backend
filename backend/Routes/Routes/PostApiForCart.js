const express = require("express");
const router = express.Router();
const Cart = require("../../models/AddToCart");

router.post('/cart', async (req,res)=>{
  try{
    const {quantity, email, name, _id, image, date, price} = req.body;
    const cartItem = await Cart.findOne({ email, "cart._id": _id }); 
         if (cartItem) {
           // If the _id exists, perform an update using the positional operator
           const result = await Cart.findOneAndUpdate(
             { email, "cart._id": _id },
             { $set: { "cart.$": req.body } },
             { new: true }
           );
           res.status(200).json("Item updated in cart");
         } else {
           // If the _id does not exist, perform an insert by pushing the new item to the cart array
           const newItem = {
             quantity,
             name,
             _id,
             image,
             date,
             price
           };

           const result = await Cart.findOneAndUpdate(
             { email },
             { $push: { cart: newItem } },
             { upsert: true, new: true }
           );
           res.status(200).json("Item added to cart");
         }
  }
  catch(error){
    console.log(error)
    res.status(400).json({error:error})
  }
})

module.exports = router

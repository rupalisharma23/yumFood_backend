const express = require("express");
const router = express.Router();
const Orders = require("../../models/Orders");

router.post('/Orders',async(req,res)=>{
    let eId = await Orders.findOne({'email': req.body.email})
    if(eId === null){
         try {
           await Orders.create({
             email: req.body.email,
             orders: [
               {
                 name: req.body.name,
                 price: req.body.price,
                 quantity: req.body.quantity,
                 _id: req.body._id,
                 date:req.body.date
               },
             ],
           });

           res.json({ success: "order placed" });
         } catch (error) {
           res.json({ "server error": error.message });
         }
    }
    else{
        try{
              await Orders.findOneAndUpdate(
                { email: req.body.email },
                {
                  $push: {
                    orders: {
                      name: req.body.name,
                      price: req.body.price,
                      quantity: req.body.quantity,
                      _id: req.body._id,
                      date: req.body.date,
                    },
                  },
                }
              ).then(() => {
                res.json({ success: "order place" });
              });
        }
        catch(error){
              res.json({"server error":error.message})
        }
    }
   
})

module.exports = router;

// note
// why orders: is used here only and dont need to send in payload
// The error you are encountering is due to the use of the $push operator in the MongoDB findOneAndUpdate method. The $push operator is used to add elements to an array field. However, in your case, it seems that you are trying to push multiple fields (name, price, quantity) as separate elements to the array, which is not allowed in MongoDB.

// To fix the error, you should create a nested object containing the name, price, and quantity fields and then use the $push operator to add this object to the array. Here's how you can update your code:

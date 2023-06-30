const express = require('express');
const router = express.Router();
const GetOrders = require("../../models/GetOrders");

router.post('/getOrders', async(req,res) =>{
    try{
         let allOrders = await GetOrders.find({'email':req.body.email})
         res.json(allOrders)
    }
    catch(error){
console.error('Error fetching data from "food_items" collection:', error);
res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
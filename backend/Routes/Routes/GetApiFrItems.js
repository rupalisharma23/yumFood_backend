const express = require("express");
const router = express.Router();
const food = require("../../models/FoodItemsSchema");

router.get('/foodList', async (req,res)=>{
try {
  const fetchedFoodItems = await food.find({});
  res.json(fetchedFoodItems);
} catch (error) {
  console.error('Error fetching data from "food_items" collection:', error);
  res.status(500).json({ error: "Internal Server Error" });
}
})

module.exports = router;
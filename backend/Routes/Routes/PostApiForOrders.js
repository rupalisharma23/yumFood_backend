const express = require("express");
const router = express.Router();
const Orders = require("../../models/Orders");
const Cart = require("../../models/AddToCart");

router.post("/Orders", async (req, res) => {
  const { email, orders } = req.body;
  try {
    let orderDocument = await Orders.findOne({ email: email });

    if (orderDocument === null) {
      // If email does not exist, create a new document
      await Orders.create({
        email: email,
        orders: orders, // Assuming the payload contains an array of orders
      });
      res.json({ success: "orders placed" });
    } else {
      // If email exists, append the new orders to the existing document
      orderDocument.orders.push(...orders);
      await orderDocument.save();
      res.json({ success: "orders placed" });
    }
    const result = await Cart.findOneAndDelete(
      { email }
    );
  } catch (error) {
    res.json({ "server error": error.message });
  }
});

module.exports = router;

// note
// why orders: is used here only and dont need to send in payload
// The error you are encountering is due to the use of the $push operator in the MongoDB findOneAndUpdate method. The $push operator is used to add elements to an array field. However, in your case, it seems that you are trying to push multiple fields (name, price, quantity) as separate elements to the array, which is not allowed in MongoDB.

// To fix the error, you should create a nested object containing the name, price, and quantity fields and then use the $push operator to add this object to the array. Here's how you can update your code:

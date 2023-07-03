const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItems = new Schema({
  email: String,
  cart: [
    {
      name: String,
      price: String,
      quantity: Number,
      _id: String,
      date: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model('items_Of_cart', CartItems)
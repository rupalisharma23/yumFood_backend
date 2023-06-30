const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodSchema = new Schema({
  categoryName: String,
  dish: [
    {
      name: String,
      price: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("food_items", FoodSchema);
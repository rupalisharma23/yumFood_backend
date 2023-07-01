const mongoose = require('mongoose');
const { Schema } = mongoose;

// const FoodSchema = new Schema({
//   categoryName: String,
//   dish: [
//     {
//       name: String,
//       price: String,
//       quantity: Number,
//     },
//   ],
// });

const DishSchema = new Schema({
  name: String,
  price: String,
  quantity: Number,
  image: String, // Add image property for the image URL (you can modify the type as needed)
});

const FoodSchema = new Schema({
  categoryName: String,
  dish: [DishSchema], // Use the DishSchema to define the dish array
});

module.exports = mongoose.model("food_items", FoodSchema);
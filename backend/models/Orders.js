const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodOrders = new Schema({
  email: String,
  orders: [
    {
      name: String,
      price: String,
      quantity: Number,
      _id: String,
      date:String
    },
  ],
});

module.exports = mongoose.model("Oders", foodOrders)
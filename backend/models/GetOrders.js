const mongoose = require('mongoose');
const {Schema} = mongoose;

const getOrders = new Schema({
  orders: [{ name: String, price: String, quantity: Number }],
});

module.exports = mongoose.model("oders",getOrders)
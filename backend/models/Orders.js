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
      date:String,
      image:String
    }
  ],
});

module.exports = mongoose.model("Orders", foodOrders)

// in this case, the collection in the database will be named "orders" (all lowercase and pluralized) even though you used "Orders" as the model name. MongoDB automatically pluralizes the model name to create the corresponding collection name.
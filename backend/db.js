const mongoose = require("mongoose");

const mongoURI =
  "mongodb://rupalisharma232002:7oJXlGv9H3UVJuEF@ac-usa01zy-shard-00-00.jdcmmcu.mongodb.net:27017,ac-usa01zy-shard-00-01.jdcmmcu.mongodb.net:27017,ac-usa01zy-shard-00-02.jdcmmcu.mongodb.net:27017/yumFoodMERN?ssl=true&replicaSet=atlas-qfmnrv-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // const FoodItem = mongoose.model(
    //   "food_items",
    //   new mongoose.Schema({
    //     categoryName: String,
    //     name: String,
    //     options: [
    //       {
    //         half: String,
    //         full: String,
    //       },
    //     ],
    //   })
    // );

    // const fetchedFoodItems = await FoodItem.find({});

    // console.log("Fetched data from 'food_items' collection:", fetchedFoodItems);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDatabase;

// Following are the steps that you neet to follow

// 1. Install mongo db to your computer
// 2. Install mongo db tool zip file in your computer which includes mongo import export
// 3. Run mongod in comand prompt to start the connection
// 4. Open a new comand prompt
// 5. Move to the directory where mongo tools are present cd C:\mongodb-database-tools-windows-x86_64-100.7.3\bin
// 6. Now copy paste the data import export comand lines given in mongo db server and replace the filename databasename etc with actual names
// 7. mongoimport --uri mongodb+srv://rupalisharma232002:7oJXlGv9H3UVJuEF@cluster0.jdcmmcu.mongodb.net/yumFoodMERN --collection food_items --jsonArray --file "C:\foodDilveryApp\yumfood\foodItems.json"

// important node
// mongodb://rupalisharma232002:7oJXlGv9H3UVJuEF@ac-usa01zy-shard-00-00.jdcmmcu.mongodb.net:27017,ac-usa01zy-shard-00-01.jdcmmcu.mongodb.net:27017,ac-usa01zy-shard-00-02.jdcmmcu.mongodb.net:27017/yumFoodMERN?ssl=true&replicaSet=atlas-qfmnrv-shard-0&authSource=admin&retryWrites=true&w=majority
// remember to add database name before ?ssl

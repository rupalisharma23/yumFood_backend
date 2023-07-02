const express = require("express");
const mongoDBConnection = require("./db")
const app = express();
const port = process.env.PORT || 5000;
const path = require("path"); 
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({ origin: process.env.BASE_URL }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoDBConnection();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json())
app.use('/api', require('./Routes/Routes/SignupLogin'))
app.use('/api', require('./Routes/Routes/GetApiFrItems'))
app.use('/api', require('./Routes/Routes/PostApiForOrders'))
app.use('/api', require('./Routes/Routes/GetApiForOrder'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

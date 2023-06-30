const express = require("express");
const mongoDBConnection = require("./db")
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
app.use(express.json())
app.use('/api', require('./Routes/Routes/SignupLogin'))
app.use('/api', require('./Routes/Routes/GetApiFrItems'))
app.use('/api', require('./Routes/Routes/PostApiForOrders'))
app.use('/api', require('./Routes/Routes/GetApiForOrder'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

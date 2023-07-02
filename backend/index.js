const express = require("express");
const mongoDBConnection = require("./db")
const app = express();
const port = process.env.PORT || 5000;
const path = require("path"); 
const cors = require("cors");
const dotenv = require("dotenv");
const history = require("connect-history-api-fallback");
dotenv.config();

const allowedOrigins = [
  process.env.BASE_URL,
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use(history());
app.use(express.static(path.join(__dirname, "build")));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json())
app.use('/api', require('./Routes/Routes/SignupLogin'))
app.use('/api', require('./Routes/Routes/GetApiFrItems'))
app.use('/api', require('./Routes/Routes/PostApiForOrders'))
app.use('/api', require('./Routes/Routes/GetApiForOrder'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require('cookie-parser');
// const db = require("./models/db");

const user = require("./routes/user")

app.use(cors({ origin:[`http://localhost:3001`,`http://localhost:3000`],exposedHeaders: ["set-cookie"], credentials:true }));
app.use(cookieParser());
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.use('', user);

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
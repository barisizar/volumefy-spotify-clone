
const mysql = require("mysql2");
//mySQL workbench ten db yi cekiyo
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "vol",
  });

  module.exports = db;
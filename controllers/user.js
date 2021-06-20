// Requiring the necessary libraries.
const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

// The passwords will be encrypted using this keyword.
const accessTokenSecret = 'mhpsecret';

const home = (req, res) => {
  res.json({ message: "Welcome to server." });
};

// Make a post request to the database (using async instead).
const createUser = async(req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  db.query(
    "INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)",
    [id, username, email, encryptedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to login.
const loginUser = async (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT password FROM users WHERE username=? ",
    username,
    async function (error, results) {
      console.log(results);
      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } 
      else {
        if(results) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );
          if(comparison) {
            const accessToken = jwt.sign({ username: username}, accessTokenSecret);
            res.send({
              code: 200,
              accessToken,
              success: "login successful",
            });
          } 
          else {
            res.send({
              code: 204,
              error: "Username and password does not match",
            });
          }
        }
        else{
          res.send({
            "code":206,
            "error": "Username does not exist"
          })
        }
      }
    }
  );
};

// This method is to get the users from the database.
const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const user = (req, res) => {
  const currentUsername = req.params.username;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    currentUsername,
    (err, result) => {
      if(err){
        res.json({ message: err });
        console.log(err);
      } 
      else{
        currentUser = result;
        console.log(currentUser);
        res.json({ user: currentUser[0] });
      }
    }
  );
};

module.exports = {
  home,
  createUser,
  getUsers,
  loginUser,
  user,
};

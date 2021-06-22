const db = require("../models/db");
// CRUD functionlarini tanimliyo ve db ile interact ediyo
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const accessTokenSecret = 'mhpsecret';

const home = (req, res) => {
  res.json({ message: "Welcome to server." });
};

const createUser = async (req, res) => {
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
        const expiration = "2h";
            const accessToken = jwt.sign({ username: username}, accessTokenSecret, {
                    expiresIn :"2h"
                });
                res.cookie('token', accessToken, { expires: new Date(Date.now() + expiration),
                  secure: false }).send({
              code: 200,
              token:accessToken,
              success: "created successfully",
            });
            console.log(req.cookies)
      }
    }
  );
};

const loginUser = async (req, res) => {
  // console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username, password);
  // console.log(typeof username);
  db.query(
    "SELECT password FROM users WHERE username=? ",
    username,
    async function (error, results) {
      // console.log(results);
      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        if (results) {
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparison) {
            // const start = Date.now();
            // console.log(start);
            const expiration = "2h";
            const accessToken = jwt.sign({ username: username}, accessTokenSecret, {
                    expiresIn :"2h"
                });
                // console.log(accessToken)
                res.cookie('token', accessToken, { expires: new Date(Date.now() + expiration),
                  secure: false, httpOnly: true}).send({
              code: 200,
              token:accessToken,
              success: "login successful",
              // cookie:(req.signedCookies)
            });
            console.log(req.cookies.token);
          } else {
            res.send({
              code: 204,
              error: "Email and password does not match",
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
  const currUsername = req.params.username;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    currUsername,
    (err, result) => {
      if (err) {
        res.json({ message: err });
        console.log(err);
      } else {
        currUser = result;
        console.log(user);
        res.json({ user: currUser[0] });
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

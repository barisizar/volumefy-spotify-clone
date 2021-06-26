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

// This method is to create the users.
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

// This method is to create the users.
const createArtist = (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const artist_name = req.body.artist_name;
  const genre = req.body.genre;

  db.query(
    "INSERT INTO artists (id, artist_name, genre) VALUES (?,?,?)",
    [id, artist_name, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create the users.
const createAlbum = (req, res) => {
  console.log(req.body);
  const id_album = req.body.id_album;
  const id_artist = req.body.id_artist;
  const album_name = req.body.album_name;
  const genre = req.body.genre;
  const year = req.body.year;
  const img_src = req.body.img_src;

  db.query(
    "INSERT INTO albums (id_album, id_artist, album_name, genre, year, img_src) VALUES (?,?,?,?,?,?)",
    [id_album, id_artist, album_name, genre, year, img_src],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to create the users.
const createSong = (req, res) => {
  console.log(req.body);
  const id_song = req.body.id_song;
  const id_album = req.body.id_album;
  const song_name = req.body.song_name;
  const song_src = req.body.song_src

  db.query(
    "INSERT INTO songs (id_song, id_album, song_name, song_src) VALUES (?,?,?,?)",
    [id_song, id_album, song_name, song_src],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
};

// This method is to edit the gender.
const editGender = async(req, res) => {
    const id = req.body.id;
    const gender = req.body.gender;
    db.query(
      "UPDATE users SET gender = ? WHERE id = ?",
      [gender, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  };

// This method is to edit the age.
const editAge = async(req, res) => {
  const id = req.body.id;
  const age = req.body.age;
  db.query(
    "UPDATE users SET age = ? WHERE id = ?",
    [age, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the country.
const editCountry = async(req, res) => {
  const id = req.body.id;
  const country = req.body.country;
  db.query(
    "UPDATE users SET country = ? WHERE id = ?",
    [country, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the phone number.
const editPhone = async(req, res) => {
  const id = req.body.id;
  const phone = req.body.phone;
  db.query(
    "UPDATE users SET phone = ? WHERE id = ?",
    [phone, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to edit the user's artist status.
const editArtist = async(req, res) => {
  const id = req.body.id;
  const artist = req.body.artist;
  db.query(
    "UPDATE users SET artist = ? WHERE id = ?",
    [artist, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// This method is to login.
const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT password, id FROM users WHERE username=? ",
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
            const accessToken = jwt.sign({username: username, id: results[0].id}, accessTokenSecret);
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

// This method is to get the albums from the database.
const getAlbums = (req, res) => {
  var id_artist = req.params.id_artist;
  // console.log(id_artist);
  db.query("SELECT * FROM albums where id_artist = ?",
  id_artist
  , (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
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

const searchUser = (req, res) => {
  const keyword = req.body.username;
  console.log("mhp gay");
  db.query(
    "SELECT id,username FROM users WHERE username like ?",
    "%" + keyword + "%",
    (err, result) => {
      if (err) {
        res.json({ message: err });
        console.log(err);
      } else {
        console.log(result);
        res.json( result );
      }
    }
  );
};

module.exports = {
  home,
  createUser,
  getUsers,
  getAlbums,
  loginUser,
  user,
  searchUser,
  editGender,
  editAge,
  editCountry,
  editPhone,
  editArtist,
  createArtist,
  createAlbum,
  createSong
};

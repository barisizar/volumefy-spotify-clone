// This file is to define routes for the methods
// inside the controller. (other user.js)

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  home,
  createUser,
  getUsers,
  getAlbums,
  getArtists,
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
  createSong,
  searchTrack,
  searchArtist
} = require("../controllers/user");

router.get("/", home);
router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/searchUser/", searchUser);
router.post("/searchTrack/", searchTrack);
router.post("/searchArtist/", searchArtist);
router.get("/user/:username", auth, user);
router.get("/users", getUsers);
router.get("/albums", getAlbums);
router.get("/artists", getArtists);
router.put("/editGender", editGender);
router.put("/editAge", editAge);
router.put("/editCountry", editCountry);
router.put("/editPhone", editPhone);
router.put("/editArtist", editArtist);
router.post("/createArtist", createArtist);
router.post("/createAlbum", createAlbum);
router.post("/createSong", createSong);
module.exports = router;
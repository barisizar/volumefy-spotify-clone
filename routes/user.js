// This file is to define routes for the methods
// inside the controller. (other user.js)

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  home,
  createUser,
  getUsers,
  loginUser,
  user,
  searchUser,
  editGender,
  editAge,
  editCountry,
  editPhone,
  editArtist
} = require("../controllers/user");

router.get("/", home);
router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/searchUser/", searchUser);
router.get("/user/:username", auth, user);
router.get("/users", getUsers);
router.put("/editGender", editGender);
router.put("/editAge", editAge);
router.put("/editCountry", editCountry);
router.put("/editPhone", editPhone);
router.put("/editArtist", editArtist);
module.exports = router;
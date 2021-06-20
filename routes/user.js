// This file is to define routes for the methods 
// inside the controller. (other user.js)

const express = require('express')
const router = express.Router()

const {
    home,
    createUser,
    getUsers,
    loginUser,
    user
} = require('../controllers/user');

router.get('/',home);
router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/user/:username',user);
router.get('/users',getUsers);

module.exports = router;
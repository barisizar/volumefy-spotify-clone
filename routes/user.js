const express = require('express')

const auth = require('../middleware/auth')

const router = express.Router()
//controllerdan gelen functionlara https olarak route tanimliyo
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
router.get('/user/:username',auth,user);
router.get('/users',getUsers);

module.exports = router;

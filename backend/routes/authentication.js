const express = require('express');
const router = express.Router();
const { login_get, guardianLogin, staffLogin,logout } = require('../controllers/authController');




router.get('/login', login_get);
router.post('/login/staff', staffLogin);
router.post('/login/guardian', guardianLogin);
router.post('/logout', logout);


module.exports = router;
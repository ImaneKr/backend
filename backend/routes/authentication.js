const express = require('express');
const router = express.Router();
const { login_get, guardianLogin, staffLogin,logout_get } = require('../controllers/authController');




router.get('/login', login_get);
router.post('/staff', staffLogin);
router.post('/guardian', guardianLogin);
router.get('/logout', logout_get);


module.exports = router;
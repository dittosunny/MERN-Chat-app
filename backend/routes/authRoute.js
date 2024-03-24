const express = require('express');
const router = express.Router();

const authController = require('../controller.js/authController.js');


router.get('/register', authController.Signup);
router.get('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router;

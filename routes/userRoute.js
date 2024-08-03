const express = require('express');
const router = express.Router();

const routemiddleware = require('../middleware/protectRoute')
const userController = require('../controller.js/userController')

router.get('/getusers',routemiddleware.protectedRoute ,userController.getUserforSideBar)






module.exports = router;

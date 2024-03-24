const express = require('express');
const router = express.Router();

const messageController = require('../controller.js/messageController')
const routemiddleware = require('../middleware/protectRoute')

router.post("/send/:id",routemiddleware.protectedRoute , messageController.sendMessage )

module.exports = router;

const authController = require('../controller/auth');
const express = require('express');
const router = express.Router();


router.post("/signup", authController.createUser)

exports.router = router;
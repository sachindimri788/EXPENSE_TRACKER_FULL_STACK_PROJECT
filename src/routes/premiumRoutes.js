const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const { getAllUser } = require('../controllers/premiumController');

router.get('/getAllUser',verifyToken,getAllUser);

module.exports = router;
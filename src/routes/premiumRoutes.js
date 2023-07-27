const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const { getAllUser, getDailyExpense, getMonthlyExpense } = require('../controllers/premiumController');

router.get('/getAllUser',verifyToken,getAllUser);
router.post('/getDailyExpense',verifyToken,getDailyExpense);
router.post('/getMonthlyExpense',verifyToken,getMonthlyExpense);

module.exports = router;
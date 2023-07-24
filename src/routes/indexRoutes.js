const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const expenseRoutes=require('./expenseRoute');
const premiumRoutes=require('./premiumRoutes');

router.use('/user', userRoutes);
router.use('/expense',expenseRoutes);
router.use('/premium',premiumRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const expenseRoutes=require('./expenseRoute');

router.use('/user', userRoutes);
router.use('/expense',expenseRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require("path");

const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoute');
const premiumRoutes = require('./premiumRoutes');




router.use('/user', userRoutes);
router.use('/expense', expenseRoutes);
router.use('/premium', premiumRoutes);

router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, `../views/${req.url}`))
})

module.exports = router;

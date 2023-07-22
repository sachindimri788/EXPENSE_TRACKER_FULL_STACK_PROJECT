const express = require('express');
const router = express.Router();
const { addExpense,getAllExpense,updateExpense,deleteExpense }=require('../controllers/expenseController');
const { verifyToken } = require('../util/auth');

router.post('/',verifyToken, addExpense);
router.get('/',verifyToken, getAllExpense);
router.put('/:id',verifyToken,updateExpense);
router.delete('/:id',verifyToken,deleteExpense);



module.exports = router;
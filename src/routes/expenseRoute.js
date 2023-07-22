const express = require('express');
const router = express.Router();
const { addExpense,getAllExpense,updateExpense,deleteExpense }=require('../controllers/expenseController');

router.post('/', addExpense);
router.get('/', getAllExpense);
router.put('/:id',updateExpense);
router.delete('/:id',deleteExpense);



module.exports = router;
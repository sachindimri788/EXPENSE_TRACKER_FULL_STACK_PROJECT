const { where } = require('sequelize');
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

class UserRepo {
    async addExpense(expenseInfo, userId) {
        return await Expense.create({ ...expenseInfo, userId });
    }
    
    async updateExpenseInUserTable(userId) {
        const totalExpenses = await Expense.sum('expenseAmount', {
            where: { userId },
        });
        return await User.update({ totalExpenses }, { where: { id: userId } });
    }

    async getAllExpense(userId) {
        return await Expense.findAll({ where: { userId } });
    }
    
    async updateExpense(updatedExpense, id) {
        const expense = await Expense.findOne({ where: { id } });
        expense.expenseAmount = updatedExpense.expenseAmount;
        expense.description = updatedExpense.description;
        expense.category = updatedExpense.category;
        return await expense.save();
    }

    async deleteExpense(id, userId) {
        const expense = await Expense.findOne({ where: { id } });
        return await expense.destroy();
    }


}

module.exports = UserRepo;
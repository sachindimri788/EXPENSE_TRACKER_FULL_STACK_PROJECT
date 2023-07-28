const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

class UserRepo {

    async addExpense(expenseInfo, userId, transaction = null) {
        if (transaction) {
            return await Expense.create({ ...expenseInfo, userId }, { transaction });
        } else {
            return await Expense.create({ ...expenseInfo, userId });
        }
    }

    async updateExpenseInUserTable(userId, transaction = null) {
        if (transaction) {
            const totalExpenses = await Expense.sum('expenseAmount', {
                where: { userId },
                transaction,
            });
            return await User.update({ totalExpenses }, { where: { id: userId }, transaction });
        } else {
            const totalExpenses = await Expense.sum('expenseAmount', {
                where: { userId },
            });
            return await User.update({ totalExpenses }, { where: { id: userId } });
        }
    }


    async getAllExpense(userId,limit,offset) {
        const expenses= await Expense.findAll({ where: { userId } ,limit,offset});
        const totalItems = await Expense.count({where:{userId}});
        const totalPages = Math.ceil(totalItems / limit);
        return {expenses,totalPages};

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
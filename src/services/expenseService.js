const ExpenseRepo = require('../repo/expenseRepo');
const expenseRepo = new ExpenseRepo();
class ExpenseServices {
    async addExpense(expenseInfo, userId) {
        await expenseRepo.addExpense(expenseInfo, userId);
        return await expenseRepo.updateExpenseInUserTable(userId);
    }
    async getAllExpense(userId) {
        await expenseRepo.updateExpenseInUserTable(userId);
        return await expenseRepo.getAllExpense(userId);

    }
    async updateExpense(updatedExpense, id, userId) {
        await expenseRepo.updateExpense(updatedExpense, id, userId);
        return await expenseRepo.updateExpenseInUserTable(userId);
    }
    async deleteExpense(id, userId) {
        await expenseRepo.deleteExpense(id, userId);
        return await expenseRepo.updateExpenseInUserTable(userId);
    }
}


module.exports = ExpenseServices;
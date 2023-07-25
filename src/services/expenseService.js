const sequelize = require('../../config/db');
const ExpenseRepo = require('../repo/expenseRepo');
const expenseRepo = new ExpenseRepo();

class ExpenseServices {
    async  addExpense(expenseInfo, userId) {
        let transaction;
        // try {
          transaction = await sequelize.transaction();
          await expenseRepo.addExpense(expenseInfo, userId, transaction);
          await expenseRepo.updateExpenseInUserTable(userId, transaction);
          return await transaction.commit();
        // } catch (error) {
        //   if (transaction) {
        //      await transaction.rollback();
        //   }
        //   throw error;
        // }
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
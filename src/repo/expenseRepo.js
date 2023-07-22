const Expense = require('../models/expenseModel');

class UserRepo{
    async addExpense(expenseInfo){
        try {
            return await Expense.create(expenseInfo);
        } catch (error) {
            throw new Error("internal Error")
        }
        
    }
    
    async getAllExpense(){
        try {
            return await Expense.findAll();
        } catch (error) {
            throw new Error("internal Error")
        }   
    }
    async updateExpense(updatedExpense,id){
        try {
            const expense = await Expense.findOne({ where: { id } });
            expense.expenseAmount = updatedExpense.expenseAmount;
            expense.description = updatedExpense.description;
            expense.category=updatedExpense.category;
            return await expense.save();
        } catch (error) {
            throw new Error("internal Error")
        }
       
    }

    async deleteExpense(id){
        try {
            const expense = await Expense.findOne({ where: { id } });
        return await expense.destroy();
        } catch (error) {
            throw new Error("internal Error")
        }
    }
    
   
}

module.exports=UserRepo;
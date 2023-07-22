const ExpenseRepo=require('../repo/expenseRepo');
const expenseRepo=new ExpenseRepo();
class ExpenseServices{
    async addExpense(expenseInfo){
        try {
            return await expenseRepo.addExpense(expenseInfo)
        } catch (error) {
            throw new Error(error.message?error.message:"error") //if error from services then simple error or if error from userRepo then error.message
        }
    }

    async getAllExpense(){
        try {
            return await expenseRepo.getAllExpense();
        } catch (error) {
            throw new Error(error.message?error.message:"error")
        }
    }
    async updateExpense(updatedExpense,id){
        try {
            return await expenseRepo.updateExpense(updatedExpense,id);
        } catch (error) {
            throw new Error(error.message?error.message:"error")
        }
    }
    async deleteExpense(id){
        try{
            return await expenseRepo.deleteExpense(id);
        }
        catch(error){
            throw new Error(error.message?error.message:"error")
        }
    }
}


module.exports=ExpenseServices;
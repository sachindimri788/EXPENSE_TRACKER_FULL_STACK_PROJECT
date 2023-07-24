const Expense = require('../models/expenseModel');
const User = require('../models/userModel');
const sequelize = require('sequelize');

class PremiumRepo{
    async getAllUserExpenses(){
        try {
            return await Expense.findAll({
                attributes: [
                  [sequelize.fn('sum', sequelize.col('expenseAmount')), 'totalExpense'],
                  [sequelize.col('userExpense.name'), 'name'],
                ],
                group: ['userExpense.id', 'userExpense.name'], // Group by both userId and user.name
                include: [
                  {
                    model: User,
                    as: 'userExpense',
                    attributes: [],                      // We only need to group by user.id and user.name, so no need to include other attributes
                  },
                ],
                order: [[sequelize.literal('totalExpense'), 'DESC']], // Order by totalExpense in descending order
              });
        } catch (error) {
            throw new Error("internal Error")
        }   
    }
}

module.exports=PremiumRepo;
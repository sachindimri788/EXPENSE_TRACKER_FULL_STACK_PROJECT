const User = require("../models/userModel");
const Expense = require("../models/expenseModel");
const { Op } = require("sequelize");

class PremiumRepo {
  async getAllUserExpenses() {
    return await User.findAll({
      attributes: ["name", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });
    // return await Expense.findAll({
    //     attributes: [
    //       [sequelize.fn('sum', sequelize.col('expenseAmount')), 'totalExpense'],
    //       [sequelize.col('userExpense.name'), 'name'],
    //     ],
    //     group: ['userExpense.id', 'userExpense.name'], // Group by both userId and user.name
    //     include: [
    //       {
    //         model: User,
    //         as: 'userExpense',
    //         attributes: [],                      // We only need to group by user.id and user.name, so no need to include other attributes
    //       },
    //     ],
    //     order: [[sequelize.literal('totalExpense'), 'DESC']], // Order by totalExpense in descending order
    //   });
  }

  async getDailyExpense(startDate, endDate, userId) {
    return await Expense.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
        userId: userId,
      },
    });
  }
  async getMonthlyExpense(startDate, endDate, userId) {
    return await Expense.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
        userId: userId,
      },
    });
  }
}

module.exports = PremiumRepo;

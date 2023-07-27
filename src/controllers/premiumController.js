const PremiumServices = require('../services/premiumService');
const premiumServices = new PremiumServices();


const getAllUser = async (req, res) => {
  try {
    const expenses = await premiumServices.getAllUserExpenses();
    return res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
};

const getDailyExpense = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const date = req.body.date;
    const expenses = await premiumServices.getDailyExpense(date, userId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'error' });

  }
}

const getMonthlyExpense = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const date = req.body.date;
    const expenses = await premiumServices.getMonthlyExpense(date, userId);
    res.status(200).json(expenses);

  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
}

module.exports = { getAllUser, getDailyExpense, getMonthlyExpense };

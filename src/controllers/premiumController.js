
const PremiumServices = require('../services/premiumService');
const premiumServices = new PremiumServices();


const getAllUser = async (req, res) => {
  try {
    const expenses=await premiumServices.getAllUserExpenses();
    return res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
};

module.exports = { getAllUser };

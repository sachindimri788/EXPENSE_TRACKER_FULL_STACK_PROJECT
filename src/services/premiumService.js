const PremiumRepo = require('../repo/premiumRepo');
const premiumRepo = new PremiumRepo();

class PremiumServices {
  async getAllUserExpenses() {
    return await premiumRepo.getAllUserExpenses();
  }

  async getDailyExpense(date, userId) {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    return await premiumRepo.getDailyExpense(startDate, endDate, userId)
  }

  async getMonthlyExpense(date, userId) {
    const startDate = new Date(`${date}-01`);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(`${date}-31`);
    endDate.setUTCHours(23, 59, 59, 999);
    return await premiumRepo.getMonthlyExpense(startDate, endDate, userId)
  }

}

module.exports = PremiumServices;
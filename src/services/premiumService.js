const PremiumRepo = require('../repo/premiumRepo');
const premiumRepo = new PremiumRepo();

class PremiumServices {
  async getAllUserExpenses() {
    return await premiumRepo.getAllUserExpenses();
  }
}

module.exports = PremiumServices;
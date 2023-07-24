const PremiumRepo = require('../repo/premiumRepo');
const premiumRepo = new PremiumRepo();

class PremiumServices {
  async getAllUserExpenses() {
    try {
      return await premiumRepo.getAllUserExpenses();
    } catch (error) {
      throw new Error(error.message ? error.message : 'An error occurred while fetching user expenses.');
    }
  }
}

module.exports = PremiumServices;
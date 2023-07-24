const PremiumRepo=require('../repo/premiumRepo');
const premiumRepo=new PremiumRepo();
class PremiumServices{
    getAllUserExpenses(){

    }
    async getAllUserExpenses(){
        try {
            return await premiumRepo.getAllUserExpenses();
        } catch (error) {
            throw new Error(error.message?error.message:"error") 
        }
    }
       
}


module.exports=PremiumServices;
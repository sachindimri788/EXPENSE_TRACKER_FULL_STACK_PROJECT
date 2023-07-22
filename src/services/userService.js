const UserRepo=require('../repo/userRepo');
const userRepo=new UserRepo();
class UserServices{
    async userRegister(user){
        try {
            return userRepo.userRegister(user);
        } catch (error) {
            throw new Error(error.message?error.message:"error");     //if error from services then simple error or if error from userRepo then error.message
        }
        
    }
    async isMailExists(email){
        try {
            return userRepo.isMailExists(email);
        } catch (error) {
            throw new Error(error.message?error.message:"error");
        }
        
    }
    async userLogin(email,password){
        try {
            return userRepo.userLogin(email,password);
        } catch (error) {
            throw new Error(error.message?error.message:"error");
        }
        
    }
}


module.exports=UserServices;
const UserRepo=require('../repo/userRepo');
const userRepo=new UserRepo();
class UserServices{
    async userRegister(user){
        return userRepo.userRegister(user);
    }
    async isMailExists(email){
        return userRepo.isMailExists(email);
    }
    async userLogin(user){
        return userRepo.userLogin(user);
    }
}


module.exports=UserServices;
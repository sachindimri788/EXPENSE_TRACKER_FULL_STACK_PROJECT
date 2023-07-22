const UserRepo=require('../repo/userRepo');
const userRepo=new UserRepo();
class UserServices{
    async userRegister(user){
        return userRepo.userRegister(user);
    }
    async isMailExists(email){
        return userRepo.isMailExists(email);
    }
    async userLogin(email,password){
        return userRepo.userLogin(email,password);
    }
}


module.exports=UserServices;
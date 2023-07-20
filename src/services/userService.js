const UserRepo=require('../repo/userRepo');
const userRepo=new UserRepo();
class UserServices{
    async userRegister(user){
        return userRepo.userRegister(user);
    }
}


module.exports=UserServices;
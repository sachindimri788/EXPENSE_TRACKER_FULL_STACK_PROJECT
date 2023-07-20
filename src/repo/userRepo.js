const User=require('../models/userModel');
class UserRepo{
    async userRegister(user){
        return User.create(user);
    }
}

module.exports=UserRepo;
const User = require('../models/userModel');
class UserRepo {
    async userRegister(user) {
        try {
            return await User.create(user);
        } catch (error) {
            throw new Error("internal Error")
        }

    }
    
    async isMailExists(email) {
        try {
            const exist = await User.findOne({ where: { email } });
            return exist ? true : false;
        } catch (error) {
            throw new Error("internal Error")
        }
    }

    async userLogin(password) {
        try {
            const userInfo = await User.findOne({ where: { password }, });
            return userInfo;

        } catch (error) {
            throw new Error({ message: "internal error" });
        }
    }
}

module.exports = UserRepo;
const User = require('../models/userModel');
const { Op } = require('sequelize');
class UserRepo {
    async userRegister(user) {
        return await User.create(user);
    }
    async isMailExists(email) {
        const exist = await User.findOne({ where: { email } });
        return exist ? true : false;
    }
    async userLogin(user) {
        try {
            const userInfo = await User.findOne({
                where: {
                    [Op.and]: [
                        { email: user.email },
                        { password: String(user.password) },
                    ],
                },
            });
            return userInfo;

        } catch (error) {
            throw new Error({message:"internal error"});
        }
    }
}

module.exports = UserRepo;
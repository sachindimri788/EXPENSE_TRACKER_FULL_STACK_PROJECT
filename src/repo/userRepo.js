const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserRepo {
    async userRegister(user) {
        try {
            bcrypt.hash(user.password, 10, async (err, hash) => {
                if (hash) {
                    return await User.create({ ...user, password: hash });
                }
                else {
                    throw new Error();
                }
            });

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

    async userLogin(email, password) {
        try {
            const user = await User.findOne({ where: { email } });
            const bpass = await bcrypt.compare(password, user.password);
            if (bpass) {
                return user;
            }
            else {
                return false;
            }

        } catch (error) {
            throw new Error("internal error");
        }
    }
}

module.exports = UserRepo;
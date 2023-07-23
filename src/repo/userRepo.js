const Order = require('../models/orders');
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
    async findByStatusAndId(info) {
        try {
            return await Order.findOne({ where: info })
        } catch (error) {
            throw new Error("internal error");
        }
    }

    async createOrder(order) {
        try {
            return await Order.create(order);
        } catch (error) {
            throw new Error("internal error");
        }
    }


    async orderUpdate(info,orderId) {
        try {
            return await Order.update(info, { where: orderId });
        } catch (error) {
            throw new Error("internal error");
        }
    }

    async userUpdate(info,id){
        try {
           return await User.update(info, { where: id })
        } catch (error) {
            throw new Error("internal error");
        }
    }

}

module.exports = UserRepo;
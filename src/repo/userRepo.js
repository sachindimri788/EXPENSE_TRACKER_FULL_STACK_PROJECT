const Order = require('../models/orders');
const User = require('../models/userModel');

class UserRepo {
    async userRegister(user,hash) {
        return await User.create({ ...user, password: hash });
    }

    async isMailExists(email) {
        const exist = await User.findOne({ where: { email } });
        return exist ? true : false;
    }

    async userLogin(email) {
        return await User.findOne({ where: { email } });
    }
    
    async findByStatusAndId(info) {
        return await Order.findOne({ where: info })
    }

    async createOrder(order) {
        return await Order.create(order);
    }


    async orderUpdate(info, orderId) {
        return await Order.update(info, { where: orderId });
    }

    async userUpdate(info, id) {
        return await User.update(info, { where: id })
    }

}

module.exports = UserRepo;
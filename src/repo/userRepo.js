const Order = require('../models/orders');
const ResetPassword = require('../models/resetPassword');
const User = require('../models/userModel');

class UserRepo {
    async userRegister(user,hash) {
        return await User.create({ ...user, password: hash });
    }

    async isMailExists(email) {
        const exist = await User.findOne({ where: { email } });
        return exist ? true : false;
    }

    async userDetails(email) {
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

    async checkAlreadySend(userId){
        const exist = await ResetPassword.findOne({ where: { userId ,isActive:true }});
        return exist ? true : false;
    }

    async saveIdsInResetPassword(id,userId){
        return await ResetPassword.create({id,userId});
    }
    async isResetPasswordIdExist(id){
        return await ResetPassword.findOne({where:{id,isActive:true}});
    }
    
    async updateIsActiveStatus(id){
       return await ResetPassword.update({ isActive: false }, { where: { id} });
    }
    async updateUserPassword(id,password){
        return await User.update({ password }, { where: { id } });
    }
}

module.exports = UserRepo;
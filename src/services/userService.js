const UserRepo = require('../repo/userRepo');
const userRepo = new UserRepo();
class UserServices {
    async userRegister(user) {
        try {
            return userRepo.userRegister(user);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");     //if error from services then simple error or if error from userRepo then error.message
        }

    }
    async isMailExists(email) {
        try {
            return userRepo.isMailExists(email);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }

    }
    async userLogin(email, password) {
        try {
            return userRepo.userLogin(email, password);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }

    }
    async findByStatusAndId(info) {
        try {
            return userRepo.findByStatusAndId(info);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }
    }
    async createOrder(order) {
        try {
            return userRepo.createOrder(order);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }
    }

    async orderUpdate(info,orderId){
        try {
            return userRepo.orderUpdate(info,orderId);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }
    }
    async userUpdate(info,id){
        try {
            return userRepo.userUpdate(info,id);
        } catch (error) {
            throw new Error(error.message ? error.message : "error");
        }
    }
}


module.exports = UserServices;
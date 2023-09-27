const UserRepo = require("../repo/userRepo");
const userRepo = new UserRepo();
const bcrypt = require("bcrypt");
const { generateToken } = require("../util/auth");
const sendMail = require("../util/emailSendInBlue");
const { v4: uuidv4 } = require("uuid");
class UserServices {
  async userRegister(user) {
    let result = {};
    const exist = await userRepo.isMailExists(user.email);
    if (!exist) {
      const hash = await bcrypt.hash(user.password, 10);
      if (hash) {
        await userRepo.userRegister(user, hash);
        result.statusCode = 200;
        result.message = "Register Successful";
      } else {
        result.statusCode = 500;
        result.message = "Internal Error";
      }
    } else {
      result.statusCode = 409;
      result.message = "Email Already Exists";
    }
    return result;
  }

  async userLogin(email, password) {
    let result = {};
    const exist = await userRepo.isMailExists(email);
    if (exist) {
      const userInfo = await userRepo.userDetails(email);
      const bpass = await bcrypt.compare(password, userInfo.password);
      if (bpass) {
        const token = generateToken({
          userId: userInfo.dataValues.id,
          userName: userInfo.dataValues.name,
        });
        result.statusCode = 200;
        result.message = "Login SuccessFully";
        result.token = token;
      } else {
        result.statusCode = 401;
        result.message = "Invalid Password";
      }
    } else {
      result.statusCode = 401;
      result.message = "User Not found";
    }
    return result;
  }

  async forgotPassword(email) {
    const result = {};
    const existMail = await userRepo.isMailExists(email);
    if (existMail) {
      const id = uuidv4();
      const userInfo = await userRepo.userDetails(email);
      const userId = userInfo.dataValues.id;
      const isAlreadySend = await userRepo.checkAlreadySend(userId);
      if (isAlreadySend) {
        result.message = "Already Send";
      } else {
        await userRepo.saveIdsInResetPassword(id, userId);
        await sendMail(email, id);
        result.message =
          "The reset link has been sent to your registered email.";
      }
    } else {
      result.message = "Email is Not Registered";
    }
    return result;
  }

  async resetPassword(id, password) {
    const result = {};
    const resetDetails = await userRepo.isResetPasswordIdExist(id);
    if (resetDetails) {
      const hash = await bcrypt.hash(password, 10);
      if (hash) {
        await userRepo.updateUserPassword(resetDetails.dataValues.userId, hash);
        await userRepo.updateIsActiveStatus(id);
        result.statusCode = 200;
        result.message = "Reset Password Successful";
      } else {
        result.statusCode = 500;
        result.message = "Internal Error";
      }
    } else {
      result.statusCode = 200;
      result.message = "Link Expired";
    }
    return result;
  }

  async findByStatusAndId(info) {
    return userRepo.findByStatusAndId(info);
  }
  async createOrder(order) {
    return userRepo.createOrder(order);
  }

  async orderUpdate(info, orderId) {
    return userRepo.orderUpdate(info, orderId);
  }

  async userUpdate(info, id) {
    return userRepo.userUpdate(info, id);
  }
}

module.exports = UserServices;

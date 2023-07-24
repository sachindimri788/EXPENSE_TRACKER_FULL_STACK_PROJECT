const UserServices = require('../services/userService');
const Razorpay = require('razorpay');
const { generateToken } = require('../util/auth');
const userServices = new UserServices();
require('dotenv').config({ path: './env/development.env' })

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = { name, email, password }
        const exist = await userServices.isMailExists(email);
        if (!exist) {
            await userServices.userRegister(user)
            return res.status(200).json({ message: "Register Successful" });
        }
        else {
            return res.status(409).json({ message: "Email Already Exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "failed", error: error.message })
    }

};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await userServices.isMailExists(email);
        if (exist) {
            const userInfo = await userServices.userLogin(email, password);
            if (userInfo) {

                const token = generateToken({ userId: userInfo.dataValues.id, userName: userInfo.dataValues.name });
                return res.status(200).json({ message: "Login SuccessFully", token });
            } else {
                return res.status(401).json({ message: "Invalid Password" });
            }
        }
        else {
            return res.status(404).json({ message: "User Not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "failed", error: error.message });
    }
}


const purchasePremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 25000;
        const orderExist = await userServices.findByStatusAndId({ userId: res.locals.userId, status: "PENDING"})
        if (orderExist) {
            return res.status(201).json({ orderid: orderExist.dataValues.orderId, key_id: rzp.key_id });
        }
        else {
            rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
                if (err) {
                    throw new Error(err)
                }
                await userServices.createOrder({ orderId: order.id, status: "PENDING", userId: res.locals.userId });
                return res.status(201).json({ orderid: order.id, key_id: rzp.key_id });
            })
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Something went wrong", error })
    }
}


const updateTransactionStatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        await userServices.orderUpdate({ paymentId: payment_id, status: "SUCCESSFUL" }, { orderId: order_id });
        await userServices.userUpdate({ isPremiumUser: true }, { id: res.locals.userId });
        return res.status(202).json({ success: true, message: "Transaction Successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err, message: "Something went wrong" });
    }
};


 const isPremiumUser = async (req, res, next) => {
    try {
      if (res.locals.user.isPremiumUser) {
        return res.json({ isPremiumUser: true });
      }
      else{
        return res.json({ isPremiumUser: false });
      }
    } catch (error) {
      console.log(error);
    }
  };



module.exports = { userRegister, userLogin, purchasePremium, updateTransactionStatus,isPremiumUser };

const UserServices=require('../services/userService')
const userServices=new UserServices();

const userRegister = async(req, res) => {
    const {name,email,password}=req.body;
    const user={name,email,password}
    await userServices.userRegister(user)
    return res.status(200).json({message:"success"});
};

module.exports = {userRegister};

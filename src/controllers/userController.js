const UserServices = require('../services/userService');
const { generateToken } = require('../util/auth');
const userServices = new UserServices();

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = { name, email, password }
        const exist=await userServices.isMailExists(email);
        if(!exist){
        await userServices.userRegister(user)
        return res.status(200).json({ message: "Register Successful" });
        }
        else{
        return res.status(409).json({ message: "Email Already Exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "failed",error:error.message })
    }

};

const userLogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const exist=await userServices.isMailExists(email);
        if(exist){
        const userInfo=await userServices.userLogin(email,password);
        if(userInfo){
            
            const token=generateToken({userId:userInfo.dataValues.id,userName:userInfo.dataValues.name});
            return res.status(200).json({ message: "Login SuccessFully",token});
        }else{
            return res.status(401).json({ message: "Invalid Password" });
        }}
        else{
            return res.status(404).json({message:"User Not found"});
        }
    } catch (error) {
        return res.status(500).json({ message: "failed",error:error.message});
    }
}

module.exports = { userRegister,userLogin };

const UserServices = require('../services/userService')
const userServices = new UserServices();

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = { name, email, password }
        const isMailExists=userServices.isMailExists(email);
        if(!isMailExists){
        await userServices.userRegister(user)
        return res.status(200).json({ message: "Register Successful" });
        }
        else{
        return res.status(200).json({ message: "Email Already Exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal Error" })
    }

};

const userLogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const isMailExists=userServices.isMailExists(email);
        if(isMailExists){
        const userInfo=await userServices.userLogin(password);
        if(userInfo){
            return res.status(200).json({ message: "Login SuccessFully" });
        }else{
            return res.status(401).json({ message: "Invalid Password" });
        }}
        else{
            return res.status(404).json({message:"User Not found"});
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "internal Error" });
    }
}

module.exports = { userRegister,userLogin };

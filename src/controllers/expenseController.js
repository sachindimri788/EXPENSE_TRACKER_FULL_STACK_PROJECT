const ExpenseServices = require('../services/expenseService')
const expenseServices = new ExpenseServices();
const addExpense= async (req, res)=>{
    try {
        const {expenseAmount,category,description} = req.body;
        const expenseInfo={expenseAmount,category,description}
        await expenseServices.addExpense(expenseInfo);
        return res.json({ message: "success" })
    }
    catch (error) {
        return res.status(500).json({ message: "failed",error:error.message})
    }
}

const getAllExpense = async (req, res) => {
    try {
        const user=await expenseServices.getAllExpense();
        res.status(200).json(user);
    }
    catch (error) {
        
        return res.status(500).json({ message:"failed" ,error:error.message})
    }
};
const updateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const {expenseAmount,category,description} = req.body;
        const updatedExpense={expenseAmount,category,description};
        await expenseServices.updateExpense(updatedExpense,id);
        
        return res.json({ message: "success" })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "failed" })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        await expenseServices.deleteExpense(id);
        return res.json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "failed",error:error.messages });
    }
};
module.exports = { addExpense,getAllExpense,updateExpense,deleteExpense };

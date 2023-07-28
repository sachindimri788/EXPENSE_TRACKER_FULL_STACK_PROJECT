const ExpenseServices = require('../services/expenseService')
const expenseServices = new ExpenseServices();
const addExpense = async (req, res) => {
    try {
        const userId = res.locals.userId;
        const { expenseAmount, category, description } = req.body;
        const expenseInfo = { expenseAmount, category, description }
        await expenseServices.addExpense(expenseInfo, userId);
        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        return res.status(500).json({ message: "failed", error: error.message })
    }
}

const getAllExpense = async (req, res) => {
    try {
        const page = Number(req.query.page||1);
        const userId = res.locals.userId;
        const expenses = await expenseServices.getAllExpense(userId,page);
        res.status(200).json(expenses);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "failed", error: error.message })
    }
};

const updateExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = res.locals.userId;
        const { expenseAmount, category, description } = req.body;
        const updatedExpense = { expenseAmount, category, description };
        await expenseServices.updateExpense(updatedExpense, id, userId);
        return res.status(200).json({ message: "success" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "failed" })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = res.locals.userId;
        await expenseServices.deleteExpense(id, userId);
        return res.status(200).json({ message: "success" });
    } catch (error) {
        return res.status(500).json({ message: "failed", error: error.messages });
    }
};
module.exports = { addExpense, getAllExpense, updateExpense, deleteExpense };

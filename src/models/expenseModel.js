const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Expense = sequelize.define(
  'expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    expenseAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    }
  },
);
User.hasMany(Expense);
Expense.belongsTo(User, { foreignKey: "userId", as: "userExpense" });


module.exports=Expense;
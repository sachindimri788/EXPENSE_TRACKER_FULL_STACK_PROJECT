const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

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
    }
  },
);

module.exports=Expense;
const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

sequelize.options.logging = false;

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPremiumUser: DataTypes.BOOLEAN,

  totalExpenses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;

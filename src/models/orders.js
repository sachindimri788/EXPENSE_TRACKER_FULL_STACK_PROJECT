const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentId: DataTypes.STRING,
  orderId: DataTypes.STRING,
  status: DataTypes.STRING,
  userId:{
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  }
});
User.hasMany(Order);
Order.belongsTo(User, { foreignKey: "userId", as: "userOrder" });

module.exports = Order;

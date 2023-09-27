const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const ResetPassword = sequelize.define("resetpassword", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  isActive: DataTypes.BOOLEAN,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});
ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

module.exports = ResetPassword;

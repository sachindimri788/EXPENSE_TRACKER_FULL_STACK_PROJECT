const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
sequelize.options.logging = false;

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
    
    },
    email: {
      type: DataTypes.STRING,
     
    },
    password:{
        type:DataTypes.STRING
    }
  },
);

module.exports=User;
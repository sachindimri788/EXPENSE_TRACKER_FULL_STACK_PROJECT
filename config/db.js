require('dotenv').config({path:'../env/development.env'})

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense', 'root', process.env.PASSWORD, {
    host: "localhost",
    dialect: 'mysql',
  });

  sequelize.authenticate().then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  module.exports = sequelize;
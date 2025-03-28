const { Sequelize } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging : false
});

let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
  console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'express-practice',
//   password: 'valdiadmin123',
// });

// module.exports = pool.promise();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express-practice', 'root', 'valdiadmin123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');


module.exports = new Sequelize('chatserverdb', 'admin', 'tom', {
  host: 'localhost',
  dialect:  'postgres',
  logging: false,
});




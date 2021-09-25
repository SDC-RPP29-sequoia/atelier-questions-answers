const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sdc', 'sdcuser', 'sdcpass', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    freezeTableName: true
  }
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Sequelize Connected');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports.sequelize = sequelize;

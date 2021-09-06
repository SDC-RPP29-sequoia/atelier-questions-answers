const { Sequelize } = require('sequelize');

// create connection
const sequelize = new Sequelize('sdc', 'sdcuser', 'sdcpass', {
  host: 'localhost',
  dialect: 'postgres',
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
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Dish = require('./dish')(sequelize);
const Order = require('./order')(sequelize);

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

module.exports = { Dish, Order };

const { Sequelize } = require('sequelize');

// Initialize Sequelize with configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_URL || 'database.sqlite' // Use environment variable for database path
});

// Import and initialize models
const Dish = require('./dish')(sequelize);
const Order = require('./order')(sequelize);

// Sync database schema
const syncDatabase = async () => {
    try {
        await sequelize.sync({
            alter: process.env.NODE_ENV !== 'production', // Use alter: true instead of force: true in non-production environments
        });
        console.log('Database & tables synchronized!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

module.exports = { Dish, Order };

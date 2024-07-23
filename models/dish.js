const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Dish = sequelize.define('Dish', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    return Dish;
};

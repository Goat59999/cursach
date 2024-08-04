const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Dish = sequelize.define('Dish', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true // Ensures name is not an empty string
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true, // Ensures price is a float
                min: 0 // Ensures price is not negative
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true // Ensures category is not an empty string
            }
        }
    }, {
        // Optional: Define additional model options
        indexes: [
            {
                unique: false,
                fields: ['category'] // Adding an index on the category field
            }
        ],
        timestamps: true // Adds createdAt and updatedAt fields
    });

    return Dish;
};

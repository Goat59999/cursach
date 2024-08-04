const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        dishName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true // Ensures dishName is not an empty string
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true, // Ensures quantity is an integer
                min: 1 // Ensures quantity is at least 1
            }
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true, // Ensures totalPrice is a float
                min: 0 // Ensures totalPrice is not negative
            }
        }
    }, {
        // Optional: Define additional model options
        indexes: [
            {
                unique: false,
                fields: ['dishName'] // Adding an index on the dishName field
            }
        ],
        timestamps: true // Adds createdAt and updatedAt fields
    });

    return Order;
};

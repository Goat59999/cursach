const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Dish = sequelize.define('Dish', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 0
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT, // Используйте TEXT для длинного текста
            allowNull: true // Описание не обязательно
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true // URL изображения не обязательно
        }
    }, {
        indexes: [
            {
                unique: false,
                fields: ['category']
            }
        ],
        timestamps: true
    });

    return Dish;
};

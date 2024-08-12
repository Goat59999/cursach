const express = require('express');
const router = express.Router();
const { Order, Dish } = require('./index');

// Создание заказа
router.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body.items; // ожидаем массив объектов с id, quantity и totalPrice

        for (let item of orderData) {
            const dish = await Dish.findByPk(item.id);
            if (dish) {
                await Order.create({
                    dishName: dish.name,
                    quantity: item.quantity,
                    totalPrice: dish.price * item.quantity
                });
            }
        }

        res.status(201).send('Order created successfully');
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

module.exports = router;

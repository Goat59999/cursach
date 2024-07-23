const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Dish, Order } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для страницы панели администратора
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API маршруты
app.post('/api/dishes', async (req, res) => {
    try {
        const dish = await Dish.create(req.body);
        res.status(201).json(dish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/dishes', async (req, res) => {
    try {
        const dishes = await Dish.findAll();
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/dishes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Dish.destroy({ where: { id } });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Dish not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

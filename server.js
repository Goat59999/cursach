const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer'); // Подключение multer для загрузки файлов
const { Dish, Order } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка multer
const upload = multer({ dest: 'uploads/' }); // Директория для хранения загруженных файлов

// Middleware
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Обслуживание загруженных файлов
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
app.post('/api/dishes', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        const imageUrl = req.file ? req.file.path : null; // Путь к загруженному файлу

        const dish = await Dish.create({ name, price, category, description, imageUrl });
        res.status(201).json(dish);
    } catch (error) {
        console.error('Ошибка при добавлении блюда:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/dishes', async (req, res) => {
    try {
        const { category } = req.query;
        let dishes;
        if (category) {
            dishes = await Dish.findAll({ where: { category } });
        } else {
            dishes = await Dish.findAll();
        }
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Ошибка при получении блюд:', error.message);
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
        console.error('Ошибка при удалении блюда:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error('Ошибка при добавлении заказа:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Ошибка при получении заказов:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const { sequelize } = require('./index');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Подключаем маршруты
app.use(require('./api')); // Подключаем API маршруты

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    sequelize.sync();
});

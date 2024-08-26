// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Проверка, существует ли пользователь с таким же именем пользователя или email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем или email уже существует' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });

        await newUser.save();
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Вход пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Поиск пользователя по имени пользователя
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверка правильности пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Генерация JWT токена
        const token = jwt.sign({ userId: user._id }, 'секретный_ключ', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

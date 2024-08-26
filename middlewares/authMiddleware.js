// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ожидаем Bearer токен

    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        const decoded = jwt.verify(token, 'секретный_ключ');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Токен недействителен' });
    }
};

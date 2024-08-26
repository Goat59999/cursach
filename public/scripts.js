// public/scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(registerForm);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Регистрация успешна!');
                    window.location.href = 'login.html'; // Перенаправление на страницу авторизации
                } else {
                    alert('Ошибка регистрации: ' + result.message);
                }
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
                alert('Ошибка при регистрации. Попробуйте еще раз.');
            }
        });
    }

    // Обработка формы авторизации
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Авторизация успешна!');
                    localStorage.setItem('token', result.token); // Сохранение JWT токена в локальное хранилище
                    window.location.href = 'index.html'; // Перенаправление на главную страницу
                } else {
                    alert('Ошибка авторизации: ' + result.message);
                }
            } catch (error) {
                console.error('Ошибка при авторизации:', error);
                alert('Ошибка при авторизации. Попробуйте еще раз.');
            }
        });
    }
});

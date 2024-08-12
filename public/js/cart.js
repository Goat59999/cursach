// cart.js

let cart = [];

function addToCart(dishId, dishName, dishPrice) {
    const existingItem = cart.find(item => item.id === dishId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: dishId, name: dishName, price: dishPrice, quantity: 1 });
    }
    saveCart();
    updateCartView();
}

function removeFromCart(dishId) {
    cart = cart.filter(item => item.id !== dishId);
    saveCart();
    updateCartView();
}

function updateQuantity(dishId, quantity) {
    const item = cart.find(item => item.id === dishId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(dishId);
        } else {
            saveCart();
            updateCartView();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function updateCartView() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.name} - ${item.price} руб. x 
            <input type="number" value="${item.quantity}" min="1" class="form-control" style="width: 60px;" onchange="updateQuantity(${item.id}, this.value)">
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartList.appendChild(li);
    });
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('totalPrice').textContent = `Итого: ${totalPrice} руб.`;
}

async function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart })
        });

        if (response.ok) {
            alert('Заказ успешно оформлен!');
            localStorage.removeItem('cart');
            cart = [];
            updateCartView();
        } else {
            alert('Ошибка при оформлении заказа');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при оформлении заказа');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartView();
});

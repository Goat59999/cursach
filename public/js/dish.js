document.addEventListener('DOMContentLoaded', () => {
    loadDishDetails();
    setupAddToCartButton();
});

async function loadDishDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('id');
    if (dishId) {
        const response = await fetch(`/api/dishes/${dishId}`);
        const dish = await response.json();

        const dishDetails = document.getElementById('dishDetails');
        dishDetails.innerHTML = `
            <div class="col-md-6">
                <img src="${dish.imageUrl ? dish.imageUrl : '/path/to/default/image.jpg'}" class="dish-image" alt="${dish.name}">
            </div>
            <div class="col-md-6">
                <h2>${dish.name}</h2>
                <p>${dish.description ? dish.description : 'Описание не доступно'}</p>
                <p><strong>Цена:</strong> ${dish.price} руб.</p>
                <p><strong>Категория:</strong> ${dish.category}</p>
                <label for="quantity">Количество:</label>
                <input type="number" id="quantity" class="form-control" value="1" min="1">
                <button id="addToCart" class="btn btn-primary mt-3">Добавить в корзину</button>
            </div>
        `;
    } else {
        document.getElementById('dishDetails').innerHTML = '<p>Блюдо не найдено</p>';
    }
}

function setupAddToCartButton() {
    document.getElementById('dishDetails').addEventListener('click', (event) => {
        if (event.target && event.target.id === 'addToCart') {
            const urlParams = new URLSearchParams(window.location.search);
            const dishId = urlParams.get('id');
            const quantity = parseInt(document.getElementById('quantity').value, 10);

            if (dishId && quantity > 0) {
                addToCart(dishId, quantity);
                alert('Товар добавлен в корзину');
            } else {
                alert('Пожалуйста, выберите корректное количество.');
            }
        }
    });
}

function addToCart(dishId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItemIndex = cart.findIndex(item => item.id === dishId);
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ id: dishId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Select elements
const cartIcon = document.querySelector('.cart-icon');
const shoppingCart = document.querySelector('.shopping-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart-btn');

// Get the category from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'all';

// Update the category title
const categoryTitle = document.querySelector('.category-title');
categoryTitle.textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

// Product data
const products = {
    sneakers: [
        { title: 'Running Shoes', desc: 'Lightweight and durable running shoes.', price: '$60.00', image: 'images/pexels-melvin-buezo-1253763-18946898.jpg' },
        { title: 'Casual Sneakers', desc: 'Trendy sneakers for casual outings.', price: '$50.00', image: 'images/shoe bg2.jpg' },
    ],
    boots: [
        { title: 'Black Flats', desc: 'Shiny Leather Black flats.', price: '$80.00', image: '../images/heels women.jpg' },
        { title: 'Formal Boots', desc: 'Stylish boots for formal occasions.', price: '$90.00', image: '../images/formal men.jpg' },
    ],
    sandals: [
        { title: 'Beach Sandals', desc: 'Lightweight sandals for summer.', price: '$40.00', image: '../images/sandles-1.jpg' },
        { title: 'Casual Sandals', desc: 'Comfortable sandals for daily wear.', price: '$45.00', image: '../images/sandals-2.jpg' },
    ],
};

// Get the product list container
const productList = document.getElementById('product-list');

// Load products based on the category
const selectedProducts = products[category] || [];
selectedProducts.forEach(product => {
    const productHTML = `
        <div class="col-md-3">
            <div class="product-item">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.desc}</p>
                <p class="product-price">${product.price}</p>
                <button class="btn add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;
    productList.innerHTML += productHTML;
});

// Event listeners
cartIcon.addEventListener('click', () => shoppingCart.classList.add('active'));
closeCartBtn.addEventListener('click', () => shoppingCart.classList.remove('active'));
cartOverlay.addEventListener('click', () => shoppingCart.classList.remove('active'));

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartCount.textContent = cart.length; // Update cart count
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-desc">${item.description}</p>
                    <p class="cart-item-price">${item.price}</p>
                    <button class="btn remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + price;
        }, 0);

        cartTotal.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));

        // Reattach event listeners for the "Remove" buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index; // Get the index of the item to remove
                cart.splice(index, 1); // Remove the item from the cart array
                updateCart(); // Update the cart UI
                alert('Item removed from cart successfully!');
            });
        });
    }

    addToCartButtons.forEach(button => button.addEventListener('click', (event) => {
        const productItem = event.target.closest('.product-item');
        const product = {
            image: productItem.querySelector('.product-image').src,
            title: productItem.querySelector('.product-title').textContent,
            description: productItem.querySelector('.product-desc').textContent,
            price: productItem.querySelector('.product-price').textContent,
        };
        cart.push(product);
        updateCart();
        alert('Item added to cart successfully!');
    }));

    updateCart();
});

// form validation for the contact page
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check if name is empty
    if (name === '') {
        alert('Please enter your name.');
        return false;
    }

    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Check if message is empty
    if (message === '') {
        alert('Please enter your message.');
        return false;
    }

    // If all validations pass
    alert('Form submitted successfully!');
    return true;
}


// script.js
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = [];

// Load cart from sessionStorage on page load
function loadCart() {
  const cartData = sessionStorage.getItem("cart"); // Key changed to "cart"
  if (cartData) {
    cart = JSON.parse(cartData);
  } else {
    cart = [];
  }
  renderCart();
}

// Save current cart state to sessionStorage
function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Key changed to "cart"
}

// Render the product list with Add to Cart buttons
function renderProducts() {
  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;
    
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.setAttribute("data-id", product.id);
    button.addEventListener("click", () => addToCart(product.id));
    
    li.appendChild(button);
    productList.appendChild(li);
  });
}

// Render the cart contents inside ul#cart-list
function renderCart() {
  cartList.innerHTML = ""; // Clear current content
  
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add product to cart by id
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
}

// Clear the cart and update sessionStorage and UI
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Initialize page
renderProducts();
loadCart();

clearCartBtn.addEventListener("click", clearCart);

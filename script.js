// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
  
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Utility to get cart array from sessionStorage
function getCart() {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Utility to save cart array to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render the list of first 5 products with Add to Cart buttons
function renderProducts() {
  productList.innerHTML = "";
  products.slice(0, 5).forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners dynamically
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render cart items from sessionStorage
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add selected product to cart and update storage and UI
function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ id: product.id, name: product.name, price: product.price });
    saveCart(cart);
    renderCart();
  }
}

// Clear cart from sessionStorage and UI
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Button click event for clear cart
clearCartBtn.addEventListener("click", clearCart);

// Initialize UI on page load
renderProducts();
renderCart();

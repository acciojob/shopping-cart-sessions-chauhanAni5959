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
const cartList = document.getElementById("cart-list"); // Fixed typo from "carList"
const clearCartBtn = document.getElementById("clear-cart-btn"); // Fixed typo from "clearCarBtn"

// Cart helper functions
function getCart() {
  const cartStr = sessionStorage.getItem("cart");
  return cartStr ? JSON.parse(cartStr) : [];
}
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list (only first 5 products)
function renderProducts() {
  productList.innerHTML = ""; // Clear prior content
  products.slice(0, 5).forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  // Attach event listeners to buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = Number(event.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render cart items
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = ""; // Clear previous cart display
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add product to cart
function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ id: product.id, name: product.name, price: product.price });
    saveCart(cart);
    renderCart();
  }
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Bind clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial rendering when page loads
renderProducts();
renderCart();

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
  { id: 6, name: "Product 6", price: 60 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage or empty array if none
function getCart() {
  const cartRaw = sessionStorage.getItem("cart");
  return cartRaw ? JSON.parse(cartRaw) : [];
}

// Save cart array to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products list (only first 5 products)
function renderProducts() {
  productList.innerHTML = "";
  products.slice(0, 5).forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  // Attach event listeners on newly created buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = Number(event.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render cart items in the UI
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add a product to the cart array and update storage & UI
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push({ id: product.id, name: product.name, price: product.price });
    saveCart(cart);
    renderCart();
  }
}

// Clear cart both from sessionStorage & UI
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Initial renders on page load
renderProducts();
renderCart();

// DOM Elements
const menuBtn = document.querySelector("#menu-btn");
const navbar = document.querySelector(".navbar");
const searchBtn = document.querySelector("#search-btn");
const searchForm = document.querySelector(".search-form");
const cartBtn = document.querySelector("#cart-btn");
const shoppingCart = document.querySelector(".shopping-cart");
const loginBtn = document.querySelector("#login-btn");
const filterButtons = document.querySelectorAll(".filter-buttons .btn");
const productBox = document.querySelector(".box-container");

// Toggle Menu
menuBtn.onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
};

// Toggle Search Form
searchBtn.onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  shoppingCart.classList.remove("active");
};

// Toggle Shopping Cart
cartBtn.onclick = () => {
  shoppingCart.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

// Remove active classes when scrolling
window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
};

// Filter Products
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    document.querySelectorAll(".box-container .box").forEach((product) => {
      if (filter === "all" || product.classList.contains(filter)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// Product Data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 4500000,
    category: "elektronik",
    image: "https://via.placeholder.com/300x300?text=Smartphone+X",
    stars: 4,
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 12000000,
    category: "elektronik",
    image: "https://via.placeholder.com/300x300?text=Laptop+Pro",
    stars: 5,
  },
  {
    id: 3,
    name: "Kemeja Formal",
    price: 350000,
    category: "fashion",
    image: "https://via.placeholder.com/300x300?text=Kemeja+Formal",
    stars: 4,
  },
  {
    id: 4,
    name: "Celana Jeans",
    price: 250000,
    category: "fashion",
    image: "https://via.placeholder.com/300x300?text=Celana+Jeans",
    stars: 3,
  },
  {
    id: 5,
    name: "Panci Masak",
    price: 150000,
    category: "rumah-tangga",
    image: "https://via.placeholder.com/300x300?text=Panci+Masak",
    stars: 4,
  },
  {
    id: 6,
    name: "Blender",
    price: 300000,
    category: "rumah-tangga",
    image: "https://via.placeholder.com/300x300?text=Blender",
    stars: 5,
  },
];

// Display Products
function displayProducts() {
  productBox.innerHTML = "";

  products.forEach((product) => {
    const stars = "★".repeat(product.stars) + "☆".repeat(5 - product.stars);

    const productElement = document.createElement("div");
    productElement.classList.add("box");
    productElement.classList.add(product.category);

    productElement.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="stars">${stars}</div>
                <div class="price">Rp ${product.price.toLocaleString(
                  "id-ID"
                )}</div>
                <a href="#" class="btn add-to-cart" data-id="${
                  product.id
                }">Tambah ke Keranjang</a>
            </div>
        `;

    productBox.appendChild(productElement);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Cart functionality
let cart = [];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCart();
    showAlert(`${product.name} telah ditambahkan ke keranjang`);
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateCart() {
  const cartItems = document.querySelector(".cart-items");
  const totalElement = document.querySelector(".total span");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">Rp ${item.price.toLocaleString("id-ID")} x ${
      item.quantity
    }</div>
            </div>
            <i class="fas fa-trash trash" data-id="${item.id}"></i>
        `;

    cartItems.appendChild(cartItem);
  });

  totalElement.textContent = total.toLocaleString("id-ID");

  // Add event listeners to trash icons
  document.querySelectorAll(".trash").forEach((icon) => {
    icon.addEventListener("click", () => {
      const productId = parseInt(icon.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// Show alert
function showAlert(message) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent = message;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  // Add some style for alerts
  const style = document.createElement("style");
  style.textContent = `
        .alert {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #4CAF50;
            color: white;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.5s, fadeOut 0.5s 2.5s;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
  document.head.appendChild(style);
});

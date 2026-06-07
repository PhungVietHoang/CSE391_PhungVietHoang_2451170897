const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://picsum.photos/id/1/200",
    rating: 4.5,
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 45990000,
    category: "laptop",
    image: "https://picsum.photos/id/0/200",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 8490000,
    category: "audio",
    image: "https://picsum.photos/id/3/200",
    rating: 4.7,
  },
  {
    id: 4,
    name: "iPad Air 6",
    price: 16990000,
    category: "tablet",
    image: "https://picsum.photos/id/4/200",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    price: 29990000,
    category: "phone",
    image: "https://picsum.photos/id/5/200",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Dell XPS 13",
    price: 39990000,
    category: "laptop",
    stock: 5,
    rating: 4.5,
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    price: 6190000,
    category: "audio",
    image: "https://picsum.photos/id/7/200",
    rating: 4.3,
  },
  {
    id: 8,
    name: "Xiaomi Pad 6",
    price: 7990000,
    category: "tablet",
    image: "https://picsum.photos/id/8/200",
    rating: 4.2,
  },
  {
    id: 9,
    name: "Google Pixel 9 Pro",
    price: 24500000,
    category: "phone",
    image: "https://picsum.photos/id/9/200",
    rating: 4.8,
  },
  {
    id: 10,
    name: "ASUS ROG Zephyrus",
    price: 41990000,
    category: "laptop",
    image: "https://picsum.photos/id/10/200",
    rating: 4.7,
  },
  {
    id: 11,
    name: "Marshall Motif II",
    price: 4990000,
    category: "audio",
    image: "https://picsum.photos/id/11/200",
    rating: 4.1,
  },
  {
    id: 12,
    name: "Samsung Galaxy Tab S9",
    price: 19990000,
    category: "tablet",
    image: "https://picsum.photos/id/12/200",
    rating: 4.5,
  },
];

let cartCount = 0;
let selectedCategory = "all";
let searchKeyword = "";
let currentSort = "default";

// Render bộ khung giao diện ban đầu từ JavaScript
const root = document.getElementById("root");
const container = document.createElement("div");
container.classList.add("container");
root.appendChild(container);

// Tạo Navbar
const navbar = document.createElement("div");
navbar.classList.add("navbar");
navbar.innerHTML = `
    <h2>E-Shop Engine</h2>
    <div>
        <button id="modeToggle">Toggle Dark Mode</button>
        <span style="margin-left:20px;">🛒 Giỏ hàng:<span id="cartBadge" class="cart-badge">0</span></span>
    </div>
`;
container.appendChild(navbar);

// Tạo bảng điều khiển Controls
const controls = document.createElement("div");
controls.classList.add("controls-panel");
container.appendChild(controls);

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Tìm sản phẩm nhanh...";
searchInput.classList.add("search-input");
controls.appendChild(searchInput);

const catGroup = document.createElement("div");
catGroup.classList.add("category-group");
const categories = ["all", "phone", "laptop", "tablet", "audio"];
categories.forEach((cat) => {
  const btn = document.createElement("button");
  btn.textContent = cat.toUpperCase();
  btn.dataset.category = cat;
  if (cat === "all") btn.classList.add("active");
  catGroup.appendChild(btn);
});
controls.appendChild(catGroup);

const sortSelect = document.createElement("select");
sortSelect.classList.add("sort-select");
sortSelect.innerHTML = `
    <option value="default">Sắp xếp</option>
    <option value="priceAsc">Giá tăng dần</option>
    <option value="priceDesc">Giá giảm dần</option>
    <option value="ratingDesc">Đánh giá cao nhất</option>
`;
controls.appendChild(sortSelect);

// Lưới sản phẩm
const grid = document.createElement("div");
grid.classList.add("products-grid");
container.appendChild(grid);

// Hệ thống các hàm lõi xử lý Logic dữ liệu
function renderProducts() {
  grid.innerHTML = "";

  let filtered = products.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (currentSort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
  if (currentSort === "priceDesc") filtered.sort((a, b) => b.price - a.price);
  if (currentSort === "ratingDesc")
    filtered.sort((a, b) => b.rating - a.rating);

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Giá: ${p.price.toLocaleString("vi-VN")}đ</p>
            <p>⭐ ${p.rating} / 5</p>
        `;

    const addBtn = document.createElement("button");
    addBtn.classList.add("add-btn");
    addBtn.textContent = "Thêm vào giỏ";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn chặn kích hoạt hành vi mở Modal
      cartCount++;
      document.getElementById("cartBadge").textContent = cartCount;
    });

    card.appendChild(addBtn);

    // Thêm sự kiện Click hiển thị thông tin chi tiết Modal
    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });
}

function openModal(p) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${p.name}</h2>
            <img src="${p.image}" style="width:100%; height:250px; object-fit:cover; border-radius:8px;" alt="${p.name}">
            <p style="margin-top:15px;"><b>Phân loại:</b> ${p.category.toUpperCase()}</p>
            <p><b>Giá bán:</b> ${p.price.toLocaleString("vi-VN")}đ</p>
            <p><b>Đánh giá hệ thống:</b> ⭐ ${p.rating} Sao</p>
            <p>Sản phẩm chính hãng phân phối nguyên seal mới 100% bảo hành toàn quốc.</p>
        </div>
    `;

  overlay
    .querySelector(".close-modal")
    .addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

// Lắng nghe và điều khiển các sự kiện tương tác
searchInput.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
  renderProducts();
});

catGroup.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  catGroup
    .querySelectorAll("button")
    .forEach((b) => b.classList.remove("active"));
  e.target.classList.add("active");
  selectedCategory = e.target.dataset.category;
  renderProducts();
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderProducts();
});

document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Chạy khởi tạo danh mục
renderProducts();

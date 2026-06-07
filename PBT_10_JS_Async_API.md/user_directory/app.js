const api = {
  baseURL: "https://jsonplaceholder.typicode.com",

  async getUsers() {
    const res = await fetch(`${this.baseURL}/users`);
    if (!res.ok) throw new Error("Không thể tải danh sách users");
    return res.json();
  },

  async createUser(data) {
    const res = await fetch(`${this.baseURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Tạo user thất bại");
    return res.json();
  },

  async updateUser(id, data) {
    const res = await fetch(`${this.baseURL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Cập nhật user thất bại");
    return res.json();
  },

  async deleteUser(id) {
    const res = await fetch(`${this.baseURL}/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Xóa user thất bại");
    return res.json();
  },
};

const ui = {
  usersSection: document.getElementById("users-section"),
  status: document.getElementById("status"),
  formTitle: document.getElementById("form-title"),
  nameInput: document.getElementById("name-input"),
  emailInput: document.getElementById("email-input"),
  phoneInput: document.getElementById("phone-input"),
  searchInput: document.getElementById("search-input"),
  cancelButton: document.getElementById("cancel-button"),
  refreshButton: document.getElementById("refresh-button"),

  showLoading() {
    this.usersSection.innerHTML =
      '<div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div>';
    this.status.textContent = "Đang tải danh sách...";
    this.status.className = "status";
  },

  hideLoading() {
    this.status.textContent = "";
  },

  showError(message) {
    this.status.textContent = message;
    this.status.className = "status error";
  },

  showSuccess(message) {
    this.status.textContent = message;
    this.status.className = "status";
  },

  renderUsers(users) {
    if (!users.length) {
      this.usersSection.innerHTML =
        '<div class="user-card"><p>Không có user để hiển thị.</p></div>';
      return;
    }
    this.usersSection.innerHTML = users
      .map(
        (user) => `
        <div class="user-card" data-id="${user.id}">
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone || "—"}</p>
          <p><strong>Company:</strong> ${user.company?.name || "—"}</p>
          <div class="user-actions">
            <button class="edit">Sửa</button>
            <button class="delete">Xóa</button>
          </div>
        </div>
      `,
      )
      .join("");
  },
};

let users = [];
let editingId = null;

async function loadUsers() {
  try {
    ui.showLoading();
    users = await api.getUsers();
    ui.renderUsers(users);
    ui.hideLoading();
  } catch (error) {
    ui.showError(error.message);
  }
}

function resetForm() {
  editingId = null;
  ui.formTitle.textContent = "Thêm user mới";
  ui.nameInput.value = "";
  ui.emailInput.value = "";
  ui.phoneInput.value = "";
  ui.cancelButton.classList.add("hidden");
}

function filterUsers(query) {
  const lowered = query.trim().toLowerCase();
  const filtered = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(lowered) ||
      user.email.toLowerCase().includes(lowered)
    );
  });
  ui.renderUsers(filtered);
}

async function handleSubmit(event) {
  event.preventDefault();
  const name = ui.nameInput.value.trim();
  const email = ui.emailInput.value.trim();
  const phone = ui.phoneInput.value.trim();

  if (!name || !email) {
    ui.showError("Name và email phải nhập.");
    return;
  }

  const payload = { name, email, phone };

  try {
    ui.showSuccess(editingId ? "Đang cập nhật..." : "Đang tạo user...");

    if (editingId) {
      const updated = await api.updateUser(editingId, payload);
      users = users.map((user) =>
        user.id === editingId ? { ...user, ...updated } : user,
      );
      ui.showSuccess("Cập nhật user thành công.");
    } else {
      const created = await api.createUser(payload);
      users.unshift(created);
      ui.showSuccess("Tạo user thành công.");
    }

    ui.renderUsers(users);
    resetForm();
  } catch (error) {
    ui.showError(error.message);
  }
}

function handleUserAction(event) {
  const card = event.target.closest(".user-card");
  if (!card) return;
  const id = Number(card.dataset.id);

  if (event.target.matches(".edit")) {
    const user = users.find((item) => item.id === id);
    if (!user) return;
    editingId = id;
    ui.formTitle.textContent = "Chỉnh sửa user";
    ui.nameInput.value = user.name;
    ui.emailInput.value = user.email;
    ui.phoneInput.value = user.phone || "";
    ui.cancelButton.classList.remove("hidden");
  }

  if (event.target.matches(".delete")) {
    const confirmed = confirm("Bạn có chắc muốn xóa user này?");
    if (!confirmed) return;
    handleDeleteUser(id);
  }
}

async function handleDeleteUser(id) {
  try {
    ui.showSuccess("Đang xóa user...");
    await api.deleteUser(id);
    users = users.filter((user) => user.id !== id);
    ui.renderUsers(users);
    ui.showSuccess("Xóa user thành công.");
  } catch (error) {
    ui.showError(error.message);
  }
}

function bindEvents() {
  document.getElementById("user-form").addEventListener("submit", handleSubmit);
  ui.cancelButton.addEventListener("click", resetForm);
  ui.searchInput.addEventListener("input", (event) =>
    filterUsers(event.target.value),
  );
  ui.refreshButton.addEventListener("click", loadUsers);
  ui.usersSection.addEventListener("click", handleUserAction);
}

bindEvents();
loadUsers();

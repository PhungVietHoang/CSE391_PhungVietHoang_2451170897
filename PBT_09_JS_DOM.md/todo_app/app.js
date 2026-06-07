// Đóng gói logic bằng IIFE tránh ô nhiễm Global Scope
(function () {
  let todos = JSON.parse(localStorage.getItem("todos_db")) || [];
  let currentFilter = "all";

  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");
  const todoCount = document.getElementById("todoCount");
  const todoFilters = document.getElementById("todoFilters");
  const clearCompletedBtn = document.getElementById("clearCompletedBtn");

  function saveState() {
    localStorage.setItem("todos_db", JSON.stringify(todos));
    render();
  }

  // Thiết lập tạo cây DOM bằng createElement bảo mật (Anti-XSS)
  function createTodoNode(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("toggle-checkbox");
    checkbox.checked = todo.completed;

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = todo.text; // An toàn tuyệt đối

    const destroyBtn = document.createElement("button");
    destroyBtn.classList.add("destroy-btn");
    destroyBtn.textContent = "❌";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = todo.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(destroyBtn);
    li.appendChild(editInput);

    return li;
  }

  function render() {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter((t) => {
      if (currentFilter === "active") return !t.completed;
      if (currentFilter === "completed") return t.completed;
      return true;
    });

    filteredTodos.forEach((todo) => {
      todoList.appendChild(createTodoNode(todo));
    });

    const activeCount = todos.filter((t) => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
  }

  // Thêm mới Todo
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = todoInput.value.trim();
    if (!value) return;

    todos.push({
      id: Date.now().toString(),
      text: value,
      completed: false,
    });

    todoInput.value = "";
    saveState();
  });

  // RÀNG BUỘC KỸ THUẬT: Áp dụng Event Delegation lên danh sách #todoList
  todoList.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;
    const targetId = li.dataset.id;

    if (e.target.classList.contains("toggle-checkbox")) {
      const targetTodo = todos.find((t) => t.id === targetId);
      if (targetTodo) targetTodo.completed = e.target.checked;
      saveState();
    }

    if (e.target.classList.contains("destroy-btn")) {
      todos = todos.filter((t) => t.id !== targetId);
      saveState();
    }
  });

  // Chức năng Edit thông qua Sự kiện double-click dblclick
  todoList.addEventListener("dblclick", function (e) {
    const li = e.target.closest("li");
    if (li && e.target.classList.contains("todo-text")) {
      li.classList.add("editing");
      const editInput = li.querySelector(".edit-input");
      editInput.focus();
      // Đẩy con trỏ xuống cuối chuỗi văn bản
      const val = editInput.value;
      editInput.value = "";
      editInput.value = val;
    }
  });

  // Lắng nghe sự kiện lưu kết quả chỉnh sửa của Input Edit
  todoList.addEventListener("keydown", function (e) {
    if (!e.target.classList.contains("edit-input")) return;
    const li = e.target.closest("li");
    if (!li) return;

    if (e.key === "Enter") {
      const newValue = e.target.value.trim();
      if (newValue) {
        const targetTodo = todos.find((t) => t.id === li.dataset.id);
        if (targetTodo) targetTodo.text = newValue;
        li.classList.remove("editing");
        saveState();
      } else {
        todos = todos.filter((t) => t.id !== li.dataset.id);
        saveState();
      }
    }

    if (e.key === "Escape") {
      li.classList.remove("editing");
      render();
    }
  });

  // Đóng chế độ sửa khi Input bị mất focus (blur)
  todoList.addEventListener("focusout", function (e) {
    if (!e.target.classList.contains("edit-input")) return;
    const li = e.target.closest("li");
    if (li && li.classList.contains("editing")) {
      li.classList.remove("editing");
      render();
    }
  });

  // Xử lý bộ lọc (Filter)
  todoFilters.addEventListener("click", function (e) {
    if (!e.target.classList.contains("filter-btn")) return;
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter = e.target.dataset.filter;
    render();
  });

  // Xóa toàn bộ công việc đã hoàn thành
  clearCompletedBtn.addEventListener("click", function () {
    todos = todos.filter((t) => !t.completed);
    saveState();
  });

  // Khởi chạy ứng dụng lần đầu tiên
  render();
})();

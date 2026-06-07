# PBT 10

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1

Output mong đợi:

1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

Giải thích:

- Các dòng `console.log("1 - Start")` và `console.log("4 - End")` chạy ngay lập tức theo luồng đồng bộ.
- `Promise.resolve().then(...)` trả về callback vào Microtask Queue; microtask được xử lý ngay sau khi stack đồng bộ hiện tại rỗng.
- `setTimeout(..., 0)` và `setTimeout(..., 100)` đẩy callback vào Macrotask Queue. Macrotask chỉ chạy sau khi tất cả microtask đã hoàn thành.
- Trong promise thứ hai, `console.log("6 - Promise 2")` xuất hiện trước rồi mới tạo thêm `setTimeout(..., 0)` cho macrotask lồng vào.

Về Event Loop:

- Stack chạy mã đồng bộ trước.
- Khi stack rỗng, Event Loop chuyển sang xử lý Microtask Queue (Promise callbacks, `queueMicrotask`, `MutationObserver`).
- Sau khi microtask hết, Event Loop tiếp tục Macrotask Queue (timer, I/O, UI events).

### Câu A2

```javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}
```

1. `await fetch(...)` — `fetch` trả về một `Promise<Response>`. `await` cần thiết để chờ cho Promise này hoàn thành và nhận về đối tượng `Response` trước khi sử dụng các thuộc tính của nó.

2. `response.ok` — `response.ok` là `false` khi HTTP status code không thuộc khoảng 200–299. Ví dụ:
   - `404 Not Found`
   - `500 Internal Server Error`
   - `429 Too Many Requests`

3. `response.json()` — Phương thức này trả về một `Promise` vì việc đọc và phân tích body JSON có thể xử lý bất đồng bộ. Cần `await` lần nữa để chờ dữ liệu đã được parse thành object JavaScript.

4. `try...catch` — Bắt các lỗi sau:
   - lỗi mạng (network error) khi `fetch` không thể kết nối;
   - lỗi do `throw` khi status không ok (`throw new Error(...)`);
   - lỗi parse JSON nếu nội dung trả về không hợp lệ;
   - các lỗi runtime khác trong khối `try`.

Lưu ý: `catch` không tự động bắt lỗi khi HTTP trả về 404 nếu code không `throw` thêm. Vì vậy phải kiểm tra `response.ok` và `throw` thủ công.

### Câu A3

Sơ đồ 3 trạng thái Promise:

- `Pending` → `Fulfilled`
- `Pending` → `Rejected`

Giải thích Callback Hell:

- Callback Hell là khi các hàm callback được lồng quá sâu vào nhau, tạo ra mã rối, khó đọc, khó gỡ lỗi và khó bảo trì.

Ví dụ 4 cấp callback hell:

```javascript
function loadUser(id, cb) {
  setTimeout(() => cb(null, { id, name: "An" }), 100);
}

function loadPosts(userId, cb) {
  setTimeout(() => cb(null, [{ id: 1, title: "Post A" }]), 100);
}

function loadComments(postId, cb) {
  setTimeout(() => cb(null, [{ id: 1, text: "Nice!" }]), 100);
}

loadUser(1, (err, user) => {
  if (err) return console.error(err);
  loadPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    loadComments(posts[0].id, (err, comments) => {
      if (err) return console.error(err);
      console.log("Done", user, posts, comments);
    });
  });
});
```

Refactor thành async/await:

```javascript
function loadUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "An" }), 100);
  });
}

function loadPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, title: "Post A" }]), 100);
  });
}

function loadComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, text: "Nice!" }]), 100);
  });
}

async function init() {
  try {
    const user = await loadUser(1);
    const posts = await loadPosts(user.id);
    const comments = await loadComments(posts[0].id);
    console.log("Done", user, posts, comments);
  } catch (error) {
    console.error(error);
  }
}

init();
```

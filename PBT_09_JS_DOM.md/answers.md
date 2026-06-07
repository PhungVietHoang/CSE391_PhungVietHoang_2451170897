# PHẦN A.

---

## Câu A1 (5đ) — DOM Tree & Query Selectors

### 1. Sơ đồ cây DOM Tree biểu diễn cấu trúc HTML:

```
div#app
    ├── header
    │    ├── h1
    │    └── nav
    │         ├── a.active
    │         ├── a
    │         └── a
    └── main
         ├── form#todoForm
         │    ├── input#todoInput
         │    └── button
         └── ul#todoList
              ├── li.todo-item
              └── li.todo-item.completed
```

### 2. Tổng hợp các câu lệnh `document.querySelector` theo yêu cầu

```javascript
// 1. Chọn thẻ <h1>
const heading = document.querySelector("h1");

// 2. Chọn input trong form
const formInput = document.querySelector("#todoForm input");
// Hoặc ngắn gọn: document.querySelector("#todoInput");

// 3. Chọn tất cả .todo-item (Trả về một NodeList)
const allTodoItems = document.querySelectorAll(".todo-item");

// 4. Chọn link đang active
const activeLink = document.querySelector("nav a.active");

// 5. Chọn <li> đầu tiên trong #todoList
const firstTodoItem = document.querySelector("#todoList li");
// Hoặc sử dụng CSS Pseudo-class: document.querySelector("#todoList li:first-child");

// 6. Chọn tất cả <a> bên trong <nav> (Trả về một NodeList)
const allNavLinks = document.querySelectorAll("nav a");
```

## Câu A2:

### 1. Phân biệt bản chất và trường hợp sử dụng

| Tiêu chí          | `innerHTML`                                                                                                               | `textContent`                                                                                                                              |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **Bản chất**      | Đọc hoặc ghi nội dung dưới dạng **mã HTML**. Trình duyệt sẽ phân tích (parse) chuỗi truyền vào thành các thẻ DOM thực sự. | Đọc hoặc ghi nội dung thuần dưới dạng **văn bản thô (Plain Text)**. Toàn bộ các thẻ ký tự HTML truyền vào đều bị giữ nguyên làm chuỗi chữ. |
| **Khi nào dùng?** | Khi bạn muốn chèn hoặc render một cấu trúc HTML động có các thẻ định dạng (`<b>`, `<span>`, `<div>`).                     | Khi chỉ cần cập nhật chữ, nhãn, hiển thị số liệu hoặc thông tin dạng văn bản thuần túy không chứa code.                                    |

VD:

```
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// Đoạn mã nguy hiểm: Trình duyệt tải ảnh lỗi 'x' -> Kích hoạt ngay sự kiện onerror sinh ra hộp thoại alert độc hại
document.querySelector("#result").innerHTML = userInput;
```

Giải pháp sửa lỗi:

```
// CÁCH KHẮC PHỤC CHUẨN: Thay innerHTML bằng textContent
const userInput = document.querySelector("#search").value;

// Trình duyệt sẽ render nguyên văn chuỗi "<img src=x onerror=...>" lên màn hình như một đoạn chữ thô.
// Hoàn toàn vô hại vì không có đoạn mã script nào được biên dịch thực thi.
document.querySelector("#result").textContent = userInput;
```

## Câu A3:

### 1. Trường hợp 1: Khi chưa bỏ comment e.stopPropagation()

Khi click vào phần tử trong cùng là nút bấm #btn, sự kiện click kích hoạt tại nút bấm, sau đó lan truyền ngược dần lên các thẻ cha bao bọc bên ngoài theo cơ chế Nổi bọt (Event Bubbling).
Thứ tự in ra ở Console lần lượt là:

```
BUTTON
INNER
OUTER
```

### 2. Trường hợp 2: Khi UNCOMMENT (bỏ dấu comment) e.stopPropagation()

Phương thức e.stopPropagation() có nhiệm vụ chặn đứng lập tức quá trình lan truyền nổi bọt của sự kiện, không cho nó phát tán lên các phần tử cha ở tầng cao hơn.

Thứ tự in ra ở Console lúc này chỉ còn: `BUTTON`

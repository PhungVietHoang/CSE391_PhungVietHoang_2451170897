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

# PHẦN C

## Câu C1:

### 1. Danh sách vạch trần các lỗi sai cụ thể

1. **Lỗi `addEventListener("onclick", ...)` (Dòng 18):** Tên sự kiện truyền vào phương thức `addEventListener` không được chứa tiền tố `on`. Phải sửa thành `"click"`.
2. **Lỗi ghi đè biến hằng số `countDisplay = count` (Dòng 24):** Biến `countDisplay` được khai báo bằng từ khóa `const` giữ tham chiếu đến một phần tử DOM, không thể gán lại bằng giá trị số. Phải sửa thành cập nhật nội dung qua thuộc tính: `countDisplay.textContent = count;`.
3. **Lỗi gán giá trị không chuẩn `historyList.innerHTML = null` (Dòng 25):** Để xóa sạch nội dung HTML một cách tường minh và chuẩn JavaScript, nên gán bằng một chuỗi rỗng `""`.
4. **Lỗi gọi thiếu cặp dấu ngoặc `item.remove` (Dòng 34):** `remove` là một phương thức (method) của Node trong DOM, không phải là một thuộc tính. Gọi thiếu cặp dấu ngoặc `()` sẽ khiến lệnh không thực thi. Phải sửa thành `item.remove();`.
5. **Lỗi ép kiểu dữ liệu từ LocalStorage (Dòng 44):** Khi lấy dữ liệu từ `localStorage.getItem("count")`, kết quả trả về là một chuỗi văn bản (`string`), hoặc `null` nếu chưa có dữ liệu. Nếu không ép kiểu về dạng số (`Number`), phép toán `count++` ở lần nhấn nút sau sẽ biến thành phép cộng chuỗi (Ví dụ: `"0" + 1 = "01"`). Phải xử lý ép kiểu và bọc giá trị mặc định: `Number(localStorage.getItem("count")) || 0`.
6. **Lỗi quên không render lại dữ liệu lịch sử khi Load trang (Dòng 44-45):** Đoạn mã gốc có lưu `historyList.innerHTML` vào bộ nhớ lúc đóng trang, nhưng lúc tải trang (`load`) lại hoàn toàn bỏ quên, không lấy ra để gán lại vào `historyList.innerHTML`.
7. **Lỗi chưa khôi phục các Event Listener cho phần tử cũ được khôi phục (Vấn đề Logic ẩn):** Việc lưu trực tiếp `historyList.innerHTML` (chuỗi HTML thô) rồi nạp lại sẽ làm **mất hoàn toàn** sự kiện xóa `deleteHistory` đã gắn bằng `addEventListener` của các thẻ `<li>` cũ.
8. **Sử dụng `innerHTML` bất cẩn (Dòng 6, 21):** Sử dụng `innerHTML` để hiển thị biến số `count` tuy không lỗi cú pháp nhưng là một bad practice, tạo nguy cơ bảo mật. Nên thay thế bằng `textContent`.

### 2. Mã nguồn sau khi được Debug và Refactor chuẩn chỉnh

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// Hàm dùng chung để gắn sự kiện xóa li (Khắc phục lỗi mất Listener khi Load HTML thô)
function bindDeleteEvent(liElement) {
  liElement.addEventListener("click", function () {
    deleteHistory(this);
  });
}

document.querySelector("#incrementBtn").addEventListener("click", function () {
  count++;
  countDisplay.textContent = count; // Thay đổi từ innerHTML thành textContent bảo mật hơn

  // Tạo và lưu history
  const li = document.createElement("li");
  li.textContent = "Count changed to " + count;
  bindDeleteEvent(li);
  historyList.append(li);
});

// SỬA LỖI 1: Thay "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function () {
  count--;
  countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count; // SỬA LỖI 2: Sửa hành vi gán đè biến const
  historyList.innerHTML = ""; // SỬA LỖI 3: Thay null thành chuỗi rỗng ""
});

function deleteHistory(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
  const items = historyList.querySelectorAll("li");
  items.forEach((item) => {
    item.remove(); // SỬA LỖI 4: Thêm cặp dấu ngoặc () kích hoạt hàm
  });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
  localStorage.setItem("count", count);
  localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
  // SỬA LỖI 5 & 6: Ép kiểu dữ liệu tránh lỗi cộng chuỗi và khôi phục nội dung HTML
  count = Number(localStorage.getItem("count")) || 0;
  countDisplay.textContent = count;

  const savedHistory = localStorage.getItem("history");
  if (savedHistory) {
    historyList.innerHTML = savedHistory;
    // SỬA LỖI 7: Tái ràng buộc lại sự kiện click xóa cho các thẻ li vừa nạp lại từ bộ nhớ
    historyList.querySelectorAll("li").forEach((li) => bindDeleteEvent(li));
  }
});
```

## Câu C2:

1. Tại sao gán sự kiện lên 1000 phần tử riêng lẻ là BAD PRACTICE?
   Quá tải bộ nhớ RAM: Mỗi lần bạn gọi .addEventListener(), JavaScript buộc phải khởi tạo một đối tượng Listener hoàn toàn mới và cấp phát một ô nhớ vật lý trên RAM để duy trì nó. Nhân bản lên 1000 lần sẽ gây lãng phí tài nguyên bộ nhớ một cách nghiêm trọng, dễ gây giật lag (Memory Leak), đặc biệt là trên các thiết bị cấu hình thấp hoặc thiết bị di động. Suy giảm hiệu năng quản lý: Khi các phần tử bị xóa đi hoặc thêm mới động, bạn phải liên tục thực hiện hành vi gắn hoặc hủy sự kiện theo cách thủ công, khiến mã nguồn trở nên cồng kềnh, rối rắm và khó bảo trì.

2. Cơ chế giải quyết của Event Delegation (Ủy quyền sự kiện)Thay vì gắn 1000 bộ lắng nghe lên 1000 thẻ con, Event Delegation chỉ gắn duy nhất 1 bộ lắng nghe sự kiện lên một phần tử cha bao bọc bên ngoài cùng (Parent Node).Nhờ vào cơ chế Nổi bọt sự kiện (Event Bubbling), khi bất kỳ một thẻ con nào bị click, tín hiệu sự kiện sẽ tự động nổi bọt ngược lên trên và kích hoạt hàm xử lý ở thẻ cha. Tại đây, chúng ta chỉ cần dùng thuộc tính e.target (hoặc phương thức e.target.matches(), e.target.closest()) để xác định chính xác thẻ con nào vừa tương tác và đưa ra quyết định xử lý phù hợp. Cách làm này đưa số lượng ô nhớ Listener cần quản lý từ $1000$ về đúng bằng $1$.

3. Tối ưu hóa thuật toán khởi tạo bằng DocumentFragment  
    Đoạn mã gốc gây hại hiệu năng:
   ```
   for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // Xảy ra 1000 lần Reflow / Repaint liên tục liên tiếp!
   }
   ```

Mã nguồn sau khi được Refactor bằng DocumentFragment:

```
// Khởi tạo một kho chứa ảo nằm ngoài cây DOM thực tế
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Chỉ thêm vào bộ nhớ đệm ảo, hoàn toàn KHÔNG gây reflow trang
}

// Bơm toàn bộ 1000 phần tử vào cây DOM thực tế trong duy nhất 1 câu lệnh
document.body.appendChild(fragment); // Chỉ kích hoạt chính xác 1 lần Reflow / Repaint duy nhất!
```

4. Giải thích tại sao DocumentFragment chạy nhanh hơn vượt trội?
   Mỗi khi bạn chèn trực tiếp một phần tử vào cây DOM hiển thị trên màn hình qua lệnh document.body.appendChild, trình duyệt bắt buộc phải dừng luồng logic để tính toán lại toàn bộ kích thước hình học, tọa độ, không gian hiển thị của trang web (Reflow), sau đó vẽ lại giao diện bằng màu sắc và pixel tương ứng (Repaint). Việc thực thi chu kỳ này lặp đi lặp lại 1000 lần trong vòng lặp for sẽ tạo ra một nút thắt cổ chai về hiệu năng cực kỳ nặng nề. Ngược lại, DocumentFragment đóng vai trò như một vùng nhớ đệm ẩn (bộ nhớ tạm ảo), hoàn toàn độc lập và nằm ngoài cây DOM chính thức của trang web. Toàn bộ các thao tác chèn 1000 thẻ div con vào bên trong Fragment đều diễn ra trực tiếp và thuần túy trên RAM, vì thế tốc độ xử lý nhanh đến mức tuyệt đối. Đến bước cuối cùng, khi ta thực hiện document.body.appendChild(fragment), trình duyệt chỉ cần tiếp nhận cấu trúc tổng này và kích hoạt duy nhất 1 lần xử lý hình ảnh hình học (Reflow) để vẽ toàn bộ 1000 phần tử lên màn hình cùng một lúc. Hiệu năng nhờ đó được tăng tốc lên gấp hàng trăm lần.

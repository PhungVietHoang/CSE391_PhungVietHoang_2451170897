# PHẦN A

## Câu A1:

### 1. Triển khai hàm `tinhThueBaoHiem(luong)` theo 3 cú pháp chuẩn

- **Cách 1: Function Declaration (Khai báo hàm truyền thống)**

```javascript
function tinhThueBaoHiemDeclaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue: thue, thuc_nhan: luong - thue };
}
```

- **Cách 2: Function Expression (Biểu thức hàm)**

```
const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
};
```

- **Cách 3: Arrow Function (Hàm mũi tên ngắn gọn)**

```
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
};
```

## Câu A2:

### 1. Dự đoán Output đầu ra

- **Đoạn 1:**
  - `console.log(c.increment());` &rarr; **`1`**
  - `console.log(c.increment());` &rarr; **`2`**
  - `console.log(c.increment());` &rarr; **`3`**
  - `console.log(c.decrement());` &rarr; **`2`**
  - `console.log(c.getCount());` &rarr; **`2`**

- **Đoạn 2 (Trạng thái bảng console sau 200ms):**
  - **`var: 3`** (In ra 3 lần liên tiếp)
  - **`let: 0`**
  - **`let: 1`**
  - **`let: 2`**

### 2. Giải thích chi tiết: Tại sao `var` và `let` cho kết quả khác nhau?

- **Bản chất của `var` (Phạm vi hàm/toàn cục - Function/Global Scope):**
  Từ khóa `var` không có khái niệm **Block Scope** (Phạm vi khối lệnh trong cặp dấu `{}`). Do đó, xuyên suốt quá trình vòng lặp `for` đầu tiên hoạt động, JavaScript chỉ khởi tạo **duy nhất một ô nhớ** cho biến `i`.

  Hàm `setTimeout` là một tác vụ bất đồng bộ (Asynchronous), nó sẽ đẩy các hàm callback in log vào hàng đợi (Callback Queue) để chờ thực thi sau khi luồng chính chạy xong. Khi vòng lặp chạy xong (mất chưa tới 1ms), giá trị của biến `i` chung đã tăng lên thành `3`. Sau 100ms, các hàm callback đồng loạt kích hoạt, chúng cùng nhìn vào một địa chỉ ô nhớ biến `i` chung đó và đều đọc ra giá trị là `3`.

- **Bản chất của `let` (Phạm vi khối - Block Scope):**
  Từ khóa `let` áp đặt thuộc tính **Block Scope** một cách chặt chẽ. Cứ mỗi chu kỳ lặp lại của vòng `for` thứ hai, JavaScript không dùng chung biến cũ mà sinh ra một **không gian phạm vi khối hoàn toàn mới** và tạo ra một biến `j` mới độc lập cho riêng lượt lặp đó.
  Cơ chế **Closure** (Đóng gói) sẽ giúp các hàm callback của `setTimeout` "chụp" và khóa chặt giá trị `j` tương ứng của từng lượt lặp vào vùng nhớ riêng của nó. Khi hết thời gian chờ và kích hoạt lệnh in, các hàm này tìm đúng về vùng không gian bộ nhớ biệt lập được đóng gói từ trước để lấy dữ liệu, tạo ra kết quả tuần tự `0, 1, 2`.

---

## Câu A3 — Array Methods (Cú pháp 1 dòng - Single line)

Dưới đây là các câu lệnh xử lý mảng được tối ưu hóa chỉ trên 1 dòng bằng cách kết hợp Arrow Function với các phương thức mảng nguyên bản (Built-in Array Methods) mà không làm thay đổi cấu trúc của mảng gốc `nums`:

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter((n) => n % 2 === 0);

// 2. Nhân mỗi số với 3
const tripled = nums.map((n) => n * 3);

// 3. Tính tổng tất cả phần tử trong mảng
const totalSum = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm kiếm số đầu tiên lớn hơn 7
const firstGreaterThan7 = nums.find((n) => n > 7);

// 5. Kiểm tra xem CÓ bất kỳ số nào lớn hơn 10 không
const hasGreaterThan10 = nums.some((n) => n > 10);

// 6. Kiểm tra xem TẤT CẢ các số có đồng loạt lớn hơn 0 không
const allGreaterThan0 = nums.every((n) => n > 0);

// 7. Tạo mảng chuỗi định dạng "Số X là [chẵn/lẻ]"
const parityStrings = nums.map(
  (n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`,
);

// 8. Đảo ngược mảng (Sử dụng cú pháp Spread để tạo bản sao tránh làm đột biến mảng gốc)
const reversedNums = [...nums].reverse();
```

## Câu A4:

### 1 Dự đoán output:

```
console.log(name, price, ram, color);
// ➔ Output: "iPhone 16" 25990000 8 "Titan"

console.log(specs);
// ➔ Output: ReferenceError: specs is not defined
```

# PHẦN C:

## Câu C1 (10đ) — Refactor Code (Tối ưu hóa mã nguồn)

### 1. Phân tích các kỹ thuật áp dụng trong quá trình Refactor:

- **`filter()`**: Thay thế hoàn toàn cho 2 khối lệnh điều kiện `if` lồng nhau phức tạp để sàng lọc ra các đơn hàng thỏa mãn điều kiện (`status === "completed"` và `total > 100000`).
- **`map()`**: Loại bỏ vòng lặp `for` thủ công và việc tạo đối tượng rỗng. Kết hợp kỹ thuật **Object Destructuring** lấy trực tiếp `{ id, customer, total }`, đồng thời tính toán gộp các thuộc tính phái sinh `discount` và `finalTotal`.
- **`sort()`**: Thay thế cho thuật toán sắp xếp nổi bọt (Bubble Sort) thủ công bằng 2 vòng lặp lồng nhau rườm rà, thực hiện sắp xếp giảm dần theo thuộc tính `finalTotal`.

### 2. Mã nguồn sau khi Refactor hoàn chỉnh:

```javascript
function processOrders(orders) {
  return orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
}

// --- KIỂM THỬ THỰC TẾ (TEST CASE) ---
const ordersSample = [
  { id: 1, customer: "An", total: 150000, status: "completed" },
  { id: 2, customer: "Bình", total: 50000, status: "completed" },
  { id: 3, customer: "Chi", total: 200000, status: "pending" },
  { id: 4, customer: "Dũng", total: 300000, status: "completed" },
];
console.log(processOrders(ordersSample));
```

## Câu C2:

```
const miniArray = {
    // 1. Tự viết hàm map: Trả về một mảng mới có số phần tử bằng mảng cũ
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // 2. Tự viết hàm filter: Sàng lọc phần tử dựa trên điều kiện logic (đúng/sai) từ hàm callback
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // 3. Tự viết hàm reduce: Tích lũy mảng thành một giá trị đơn nhất
    reduce(arr, fn, initialValue) {
        // Xử lý trường hợp có truyền hoặc không truyền giá trị khởi tạoban đầu
        let accumulator = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// --- HỆ THỐNG KỊCH BẢN KIỂM THỬ BẮT BUỘC (PASS 100%) ---
console.log("miniArray.map:", miniArray.map([1, 2, 3], x => x * 2));         // → [2, 4, 6]
console.log("miniArray.filter:", miniArray.filter([1, 2, 3, 4], x => x > 2)); // → [3, 4]
console.log("miniArray.reduce:", miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10

// Kiểm thử biên với reduce khi không truyền giá trị initialValue
console.log("Reduce không có init:", miniArray.reduce([1, 2, 3, 4], (a, b) => a + b)); // → 10
```

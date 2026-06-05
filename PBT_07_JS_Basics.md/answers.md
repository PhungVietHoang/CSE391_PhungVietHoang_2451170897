---
## PHẦN A

### Câu A1:

#### 1. Dự đoán Output & Kết quả thực tế

| Đoạn mã | Dự đoán Output | Kết quả thực tế khi chạy | Giải thích bản chất cơ chế |
| :--- | :--- | :--- | :--- |
| **Đoạn 1** | `undefined` | `undefined` | Do cơ chế **Hoisting** với `var`. Biến `x` được đưa lên đầu phạm vi và khởi tạo giá trị mặc định là `undefined` trước khi câu lệnh gán `x = 5` diễn ra. |
| **Đoạn 2** | `ReferenceError` | `ReferenceError: Cannot access 'y' before initialization` | Biến `let y` cũng được hoisted nhưng nằm trong **Temporal Dead Zone (TDZ - Vùng chết tạm thời)**. Bạn không thể truy cập biến này trước khi dòng khai báo được chạy. |
| **Đoạn 3** | `TypeError` | `TypeError: Assignment to constant variable.` | Biến khai báo bằng `const` là hằng số, không thể tái gán (`re-assign`) giá trị mới sau khi đã khởi tạo. |
| **Đoạn 4** | `[1, 2, 3, 4]` | `[1, 2, 3, 4]` | `const` ngăn chặn việc **tái gán** hằng số sang một định danh hoặc kiểu dữ liệu khác (`arr = ...`). Tuy nhiên, nó không ngăn cản việc **thay đổi nội dung bên trong** (mutation) của một Object hoặc Array (kiểu dữ liệu tham chiếu). |
| **Đoạn 5** | Trong block: `2`<br>Ngoài block: `1` | Trong block: `2`<br>Ngoài block: `1` | `let` có thuộc tính **Block Scope** (phạm vi khối nhọn `{}`). Biến `a = 2` bên trong khối nhọn là một biến hoàn toàn độc lập, không hề ghi đè hay ảnh hưởng tới biến `a = 1` ở phạm vi toàn cục bên ngoài. |

---

### Câu A2 (5đ) — Data Types & Coercion (Ép kiểu tự động)

#### 1. Dự đoán kết quả các câu lệnh `console.log`

- `console.log(typeof null);` &rarr; **`"object"`** _(Đây là một lỗi thiết kế kinh điển - bug của ngôn ngữ JavaScript từ phiên bản đầu tiên nhưng không thể sửa vì sợ hỏng các hệ thống web cũ)._
- `console.log(typeof undefined);` &rarr; **`"undefined"`**
- `console.log(typeof NaN);` &rarr; **`"number"`** _(NaN viết tắt của Not-a-Number, nhưng kiểu dữ liệu biểu diễn của nó vẫn thuộc tập số)._
- `console.log("5" + 3);` &rarr; **`"53"`**
- `console.log("5" - 3);` &rarr; **`2`**
- `console.log("5" * "3");` &rarr; **`15`**
- `console.log(true + true);` &rarr; **`2`** _(true chuyển đổi thành số 1, 1 + 1 = 2)._
- `console.log([] + []);` &rarr; **`""`** _(Mảng rỗng ép sang chuỗi thành chuỗi rỗng)._
- `console.log([] + {});` &rarr; **`"[object Object]"`**
- `console.log({} + []);` &rarr; **`"[object Object]"`** _(Hoặc có thể trả về `0` tùy môi trường console do `{}` bị hiểu nhầm là một block code trống)._

#### 2. Tại sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau?

- **Với toán tử `+` (Cộng):** Toán tử này trong JavaScript có hai vai trò: cộng toán học và **nối chuỗi (String concatenation)**. Khi một trong hai toán hạng là Chuỗi (`"5"`), JavaScript sẽ ưu tiên ép kiểu toán hạng còn lại thành Chuỗi và thực hiện nối chúng lại với nhau. Do đó, `3` thành `"3"`, tạo ra `"53"`.
- **Với toán tử `-` (Trừ):** Toán tử này chỉ có duy nhất một vai trò toán học là phép tính trừ. Bản thân kiểu Chuỗi không có phép toán trừ. Vì vậy, JavaScript buộc phải ép kiểu tự động (implicit coercion) chuỗi `"5"` về dạng Số (`5`). Phép toán trở thành `5 - 3`, trả về kết quả số `2`.

---

### Câu A3 (5đ) — So sánh toán tử `==` vs `===`

#### 1. Dự đoán kết quả (true / false)

- `console.log(5 == "5");` &rarr; **`true`** _(Chỉ so sánh giá trị, chuỗi "5" được ép kiểu thành số 5)._
- `console.log(5 === "5");` &rarr; **`false`** _(So sánh nghiêm ngặt cả giá trị và kiểu dữ liệu: Number vs String)._
- `console.log(null == undefined);` &rarr; **`true`** _(Quy định đặc biệt trong đặc tả ECMAScript)._
- `console.log(null === undefined);` &rarr; **`false`** _(Khác kiểu dữ liệu)._
- `console.log(NaN == NaN);` &rarr; **`false`** _(NaN là giá trị duy nhất trong JavaScript không tự bằng chính nó)._
- `console.log(0 == false);` &rarr; **`true`** _(false được ép kiểu thành số 0)._
- `console.log(0 === false);` &rarr; **`false`** _(Khác kiểu dữ liệu: Number vs Boolean)._
- `console.log("" == false);` &rarr; **`true`** _(Cả chuỗi rỗng và false đều được ép kiểu về số 0)._

#### 2. Quy tắc cốt lõi: Nên sử dụng `==` hay `===`? Tại sao?

> **Quy tắc:** Từ giờ trở đi, bạn **LUÔN LUÔN NÊN DÙNG `===` (và `!==`)** trong mọi tình huống logic.

- **Lý do:** Toán tử `===` (So sánh nghiêm ngặt) ép buộc kiểm tra đồng thời cả kiểu dữ liệu lẫn giá trị mà không tự ý kích hoạt cơ chế ép kiểu tự động phức tạp như `==`. Sử dụng `===` giúp mã nguồn minh bạch, dễ dự đoán kết quả, tránh được các bug logic ngầm cực kỳ khó phát hiện (ví dụ như việc `"" == false` trả về `true` ở trên).

---

### Câu A4 (5đ) — Khái niệm Truthy & Falsy

#### 1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript

Trong JavaScript, chỉ có chính xác **8 giá trị** sau đây được coi là **Falsy** (khi đưa vào câu điều kiện sẽ trả về `false`):

1. `false` (Chính hằng số boolean false)
2. `0` (Số không)
3. `-0` (Số không âm)
4. `0n` (Kiểu BigInt số không)
5. `""` hoặc `''` hoặc ``` (Chuỗi rỗng hoàn toàn)
6. `null` (Giá trị rỗng)
7. `undefined` (Giá trị chưa xác định)
8. `NaN` (Not-a-Number)

#### 2. Dự đoán kết quả thực thi điều kiện `if`

- `if ("0") console.log("A");` &rarr; **CÓ IN "A"** _(Vì "0" là chuỗi chứa ký tự, không phải chuỗi rỗng nên là Truthy)._
- `if ("") console.log("B");` &rarr; **KHÔNG IN** _ (Chuỗi rỗng là Falsy)._
- `if ([]) console.log("C");` &rarr; **CÓ IN "C"** _(Mọi Object và Array, kể cả mảng rỗng, đều là Truthy)._
- `if ({}) console.log("D");` &rarr; **CÓ IN "D"** _(Object rỗng là Truthy)._
- `if (null) console.log("E");` &rarr; **KHÔNG IN** _(null là Falsy)._
- `if (0) console.log("F");` &rarr; **KHÔNG IN** _(Số 0 là Falsy)._
- `if (-1) console.log("G");` &rarr; **CÓ IN "G"** _(Mọi số khác 0, kể cả số âm, đều là Truthy)._
- `if (" ") console.log("H");` &rarr; **CÓ IN "H"** _(Chuỗi có chứa 1 dấu cách không phải là chuỗi rỗng nên là Truthy)._

---

### Câu A5 (5đ) — Cú pháp Template Literals (Backtick `` ` ``)

Dưới đây là mã nguồn được tối ưu hóa, viết lại bằng cú pháp Template Literals giúp code sạch hơn, loại bỏ hoàn toàn các toán tử `+` và ký tự escape `\"`:

#### Cách 1: Nối chuỗi thông báo

```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## PHẦN C

## Câu C1

Đoạn mã gốc chứa chính xác **6 lỗi** từ cơ bản (cú pháp) đến nâng cao (lịch trình bất đồng bộ). Dưới đây là danh sách chi tiết:

1. Danh sách lỗi, giải thích và cách sửa

- **Lỗi 1: Sử dụng phép gán thay cho phép so sánh trong `if (giaSauGiam = 0)`**
  - _Giải thích:_ Việc dùng duy nhất một dấu `=` đóng vai trò là một phép gán giá trị chứ không phải so sánh. Biểu thức `giaSauGiam = 0` sẽ gán số `0` vào biến và trả về kết quả là `0` (Falsy). Điều này khiến khối lệnh bên trong `if` không bao giờ được thực thi, đồng thời vô tình phá hủy giá trị thực tế của biến `giaSauGiam`.
  - _Cách sửa:_ Đổi thành toán tử so sánh nghiêm ngặt `===` &rarr; `if (giaSauGiam === 0)`.

- **Lỗi 2: Lỗi định dạng/cú pháp dính liền ở dòng kết thúc hàm `return giaSauGiam}`**
  - _Giải thích:_ Viết dấu ngoặc kết thúc khối lệnh dính liền không có khoảng trống hoặc thiếu dấu chấm phẩy làm giảm tính minh bạch của mã nguồn (Dù cơ chế ASI của JS có thể tự sửa, nhưng đây là bad practice khi viết code).
  - _Cách sửa:_ Thêm dấu chấm phẩy và xuống dòng rõ ràng &rarr; `return giaSauGiam;`.

- **Lỗi 3: Truyền sai kiểu dữ liệu đầu vào ở dòng chạy thử `tinhGiaGiamGia("100000", 20)`**
  - _Giải thích:_ Tham số giá bán đầu tiên đang được truyền vào dưới dạng một Chuỗi kí tự (`"100000"`) thay vì Kiểu số (`Number`). Dù JavaScript có thể tự ép kiểu khi thực hiện phép tính `*` và `/`, việc truyền sai kiểu dữ liệu gốc rất dễ gây ra các lỗi tính toán ngầm bất định.
  - _Cách sửa:_ Đổi tham số về dạng số nguyên nguyên bản &rarr; `tinhGiaGiamGia(100000, 20)`.

- **Lỗi 4: Thiếu cơ chế kiểm tra (Validate) dữ liệu đầu vào của hàm**
  - _Giải thích:_ Nếu người dùng vô tình truyền vào một chuỗi chữ không thể chuyển đổi (ví dụ: `"abc"`), phép tính toán học sẽ trả về giá trị lỗi `NaN` (Not a Number). Hàm cần có bộ lọc ngăn chặn ngay từ đầu.
  - _Cách sửa:_ Dùng `typeof` hoặc `isNaN()` để lọc dữ liệu ở đầu hàm.

- **Lỗi 5: Lạm dụng từ khóa `var` hoặc thiếu khai báo an toàn cho biến vòng lặp `for`**
  - _Giải thích:_ Khai báo `var i = 0` khiến phạm vi hoạt động của biến `i` bị rò rỉ ra ngoài toàn cục (Global Scope), không bị giới hạn trong phạm vi của vòng lặp `for`.
  - _Cách sửa:_ Đổi từ khóa khai báo sang `let`.

2. Giải thích lỗi "ẩn" liên quan đến `var` trong vòng lặp kết hợp `setTimeout`

- **Hiện tượng lỗi:** Đoạn mã gốc sau khi kết thúc 1000ms sẽ in ra màn hình 5 dòng chữ giống hệt nhau là: **`Item 5`**, thay vì chạy tuần tự từ `Item 0` đến `Item 4`.
- **Nguyên nhân cốt lõi:** 1. Biến khai báo bằng `var` không sở hữu **Block Scope** (Phạm vi khối) mà mang **Function/Global Scope**. Do đó, chỉ có **duy nhất một ô nhớ** của biến `i` được tạo ra và dùng chung cho cả 5 lượt lặp. 2. Hàm `setTimeout` là một tác vụ bất đồng bộ (Asynchronous). Khi các hàm callback bên trong nó được xếp vào hàng đợi chạy sau 1 giây, vòng lặp `for` đồng bộ đã thực thi xong toàn bộ. Tại thời điểm vòng lặp kết thúc, giá trị của biến `i` chung đã tăng lên đến `5`. Khi các hàm callback được kích hoạt để in log, chúng cùng nhìn vào biến `i` chung này và đều đọc ra giá trị là `5`.
- **Cách khắc phục bằng `let`:** Thay thế `var i = 0` bằng `let i = 0`. Vì `let` có đặc tính **Block Scope**, cứ mỗi một vòng lặp chạy qua, hệ thống sẽ tạo ra một phạm vi khối hoàn toàn độc lập và "đóng băng" (capture) giá trị của `i` tại đúng thời điểm đó dành riêng cho `setTimeout`.

3. Đoạn mã hoàn chỉnh sau khi đã sửa toàn bộ lỗi (Refactored)

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  // 1. Kiểm tra validate dữ liệu đầu vào nghiêm ngặt
  if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
    return "Lỗi: Đầu vào phải là số";
  }
  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  // Sửa lỗi gán (=) thành toán tử so sánh nghiêm ngặt (===)
  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

// Chạy thử nghiệm 1: Đổi chuỗi "100000" thành số 100000
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

// Chạy thử nghiệm 2: Vượt quá 100%
const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Sửa lỗi ẩn: Thay 'var' thành 'let' để tạo Block Scope chính xác cho tác vụ bất đồng bộ
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

---
## PHẦN A

### Câu A1 (5đ) — Khái niệm `var` / `let` / `const`

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

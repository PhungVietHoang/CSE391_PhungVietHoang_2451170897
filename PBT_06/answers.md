### PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1:

Hệ thống Grid của Bootstrap dựa trên bố cục **12 cột**. Dựa vào các class được cung cấp trong đoạn HTML:

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">Box 1</div>
    <div class="col-12 col-md-6 col-lg-3">Box 2</div>
    <div class="col-12 col-md-6 col-lg-3">Box 3</div>
    <div class="col-12 col-md-6 col-lg-3">Box 4</div>
  </div>
</div>
```

Hình minh họa:
Kích thước < 768px:

```
+-----------------------------------+
|               Box 1               |
+-----------------------------------+
|               Box 2               |
+-----------------------------------+
|               Box 3               |
+-----------------------------------+
|               Box 4               |
+-----------------------------------+
```

Kích thước 768px - 991px:

```
+-----------------+-----------------+
|      Box 1      |      Box 2      |
+-----------------+-----------------+
|      Box 3      |      Box 4      |
+-----------------+-----------------+
```

Kích thước ≥ 992px:

```
+---------+---------+---------+---------+
|  Box 1  |  Box 2  |  Box 3  |  Box 4  |
+---------+---------+---------+---------+
```

3. Câu hỏi mở rộng:  
   col-md-6 là gì?

- col: Định nghĩa phần tử là một cột trong hệ thống grid.
- md (Medium): Áp dụng cho màn hình có kích thước từ mức trung bình trở lên ($\ge 768\text{px}$).
- 6: Chiếm 6 trên tổng số 12 cột tối đa.

Tại sao không cần viết col-sm-12?

- Bootstrap được thiết kế theo nguyên lý Mobile-First (ưu tiên giao diện màn hình nhỏ). Các cấu hình kích thước sẽ tự động kế thừa từ dưới lên trên trừ khi có class lớn hơn ghi đè.
- Trong đoạn code đã khai báo col-12 (áp dụng từ mức nhỏ nhất < 576px). Khi lên màn hình kích thước sm ($576\text{px} - 767\text{px}$), hệ thống sẽ tự động kế thừa giá trị 12 này. Việc viết thêm col-sm-12 là không cần thiết và làm dư thừa mã nguồn.

### Câu A2:

1. Giải thích class d-none d-md-block

- d-none: Ẩn phần tử này hoàn toàn ở tất cả các kích thước màn hình (bắt đầu từ kích thước nhỏ nhất).
- d-md-block: Bắt đầu từ màn hình trung bình trở lên (md $\ge 768\text{px}$), thiết lập lại thuộc tính hiển thị thành dạng khối (display: block).

2. Liệt kê và giải thích 5 Spacing Utilities (Margin/Padding)

- mt-3 (Margin Top 3): Thêm khoảng cách phía trên bên ngoài phần tử với độ rộng mặc định mức số 3 (tương đương 1rem hoặc 16px).
- px-4 (Padding X 4): Thêm khoảng cách bên trong phần tử cho cả hai phía trái (Left) và phải (Right) với độ rộng mức số 4 (tương đương 1.5rem hoặc 24px).
- mb-auto (Margin Bottom Auto): Tự động tính toán căn chỉnh khoảng cách phía dưới bên ngoài. Thường áp dụng trong bố cục Flexbox để đẩy các phần tử đi cùng về phía đối diện.
- pt-0 (Padding Top 0): Xóa bỏ hoàn toàn khoảng cách bên trong ở phía trên của phần tử (padding-top: 0;).
- mx-2 (Margin X 2): Thêm khoảng cách bên ngoài cho cả hai phía trái và phải với độ rộng mức số 2 (tương đương 0.5rem hoặc 8px).

3. Phân biệt .container, .container-fluid, và .container-md

### 3. Phân biệt `.container`, `.container-fluid`, và `.container-md`

| Tên Class              | Cách thức hoạt động                                                                                                                                                                                                  | Trường hợp sử dụng                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **`.container`**       | **Chiều rộng cố định theo mốc (Responsive Fixed Width):** Tự động thay đổi giá trị `max-width` tối đa tương ứng với từng Breakpoint. Khi ở màn hình cực nhỏ, nó chiếm 100% chiều rộng.                               | Dùng cho bố cục trang web truyền thống, muốn giới hạn nội dung nằm trong một khung nhất định giữa màn hình ở desktop.                   |
| **`.container-fluid`** | **Luôn tràn viền (Full Width):** Luôn chiếm **100% chiều rộng** của vùng hiển thị (`width: 100%`) tại mọi kích thước màn hình.                                                                                       | Dùng cho các giao diện dạng Dashboard, bản đồ, hoặc các section cần hình ảnh/nền trải dài toàn màn hình.                                |
| **`.container-md`**    | **Tràn viền lúc nhỏ, cố định lúc lớn:** Hoạt động giống `container-fluid` (rộng 100%) khi màn hình nhỏ hơn mốc `md` (`< 768px`). Bắt đầu từ mốc `md` trở lên, nó sẽ tự động khóa độ rộng cố định giống `.container`. | Dùng khi muốn tối ưu giao diện app trên mobile/tablet gọn gàng tràn viền, nhưng vẫn giữ dạng hộp (boxed) đẹp mắt khi xem trên máy tính. |

## Track B - TAILWINDCSS

## Phần A:

## Câu A1:

1. Khối bao ngoài (`div` cha)

- `- flex` &rarr; `display: flex;` (Kích hoạt bố cục Flexbox).
- `- items-center` &rarr; `align-items: center;` (Căn giữa các phần tử con dọc theo trục cross axis).
- `- justify-between` &rarr; `justify-content: space-between;` (Phân bổ khoảng cách đều giữa các phần tử, dạt hai phần tử đầu cuối về hai biên).
- `- p-4` &rarr; `padding: 1rem;` ($16\text{px}$ đều ở cả 4 cạnh).
- `- bg-white` &rarr; `background-color: rgb(255 255 255);` (Đổ màu nền trắng).
- `- shadow-md` &rarr; `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);` (Đổ bóng hiệu ứng trung bình).
- `- rounded-lg` &rarr; `border-radius: 0.5rem;` ($8\text{px}$, bo tròn góc mức lớn).
- `- hover:shadow-xl` &rarr; Thay đổi `box-shadow` thành mức siêu lớn khi người dùng di chuột qua phần tử.
- `- transition-shadow` &rarr; Chỉ định hiệu ứng chuyển cảnh mượt mà (transition) riêng cho thuộc tính `box-shadow`.
- `- duration-300` &rarr; `transition-duration: 300ms;` (Thời gian diễn ra hiệu ứng chuyển cảnh là 0.3 giây).

2. Ảnh thẻ nhân sự (`img`)

- `- w-16` &rarr; `width: 4rem;` ($64\text{px}$).
- `- h-16` &rarr; `height: 4rem;` ($64\text{px}$).
- `- rounded-full` &rarr; `border-radius: 9999px;` (Bo tròn tuyệt đối thành hình tròn).
- `- object-cover` &rarr; `object-fit: cover;` (Ảnh tự động co giãn vừa khung mà không bị bóp méo tỷ lệ).

3. Khối nội dung văn bản (`div` chứa chữ)

- `- ml-4` &rarr; `margin-left: 1rem;` ($16\text{px}$, tạo khoảng cách trống với ảnh ở phía bên trái).
- `- flex-1` &rarr; `flex: 1 1 0%;` (Cho phép khối văn bản tự động giãn nở để chiếm trọn phần không gian trống còn lại trong dòng).

4. Tiêu đề và văn bản (`h3`, `p`)

- `- text-lg` &rarr; `font-size: 1.125rem;` ($18\text{px}$) kèm `line-height: 1.75rem;`.
- `- font-semibold` &rarr; `font-weight: 600;` (Định dạng chữ bán đậm).
- `- text-gray-800` &rarr; `color: rgb(31 41 55);` (Màu chữ xám đậm).
- `- truncate` &rarr; Ẩn phần văn bản bị tràn và tự động thêm dấu ba chấm (`...`) khi chuỗi ký tự quá dài.
- `- text-sm` &rarr; `font-size: 0.875rem;` ($14\text{px}$, cỡ chữ nhỏ).
- `- text-gray-500` &rarr; `color: rgb(107 114 128);` (Màu chữ xám vừa).

5. Nút tương tác (`button`)

- `- px-4` &rarr; `padding-left: 1rem; padding-right: 1rem;` ($16\text{px}$ cho hai cạnh bên).
- `- py-2` &rarr; `padding-top: 0.5rem; padding-bottom: 0.5rem;` ($8\text{px}$ cho hai cạnh trên dưới).
- `- bg-blue-500` &rarr; `background-color: rgb(59 130 246);` (Màu nền xanh dương chủ đạo).
- `- text-white` &rarr; `color: rgb(255 255 255);` (Màu chữ trắng).
- `- rounded-md` &rarr; `border-radius: 0.375rem;` ($6\text{px}$, bo tròn góc mức vừa).
- `- hover:bg-blue-600` &rarr; Đổi màu nền sang sắc xanh dương đậm hơn khi người dùng di chuột qua nút.
- `- focus:ring-2` &rarr; Tạo một vòng nhẫn viền ngoài dày $2\text{px}$ bao quanh phần tử khi được tiêu điểm (focus).
- `- focus:ring-blue-300` &rarr; Thiết lập màu sắc cho vòng nhẫn focus là màu xanh dương nhạt.

## Câu A2:

1. Giải thích prefix responsive: md:, lg:, xl:

- Giống như Bootstrap, TailwindCSS hoạt động theo cơ chế Mobile-First. Các class viết thông thường không có prefix sẽ áp dụng cho màn hình nhỏ nhất (Mobile), các prefix đóng vai trò như media-query kích hoạt thuộc tính khi màn hình đạt kích thước tối thiểu (Breakpoints):
- md: $\rightarrow$ Áp dụng từ màn hình trung bình trở lên (tối thiểu $768\text{px}$).
- lg: $\rightarrow$ Áp dụng từ màn hình lớn trở lên (tối thiểu $1024\text{px}$).
- xl: $\rightarrow$ Áp dụng từ màn hình rất lớn trở lên (tối thiểu $1280\text{px}$).

2. Giải thích state modifiers:

- hover: $\rightarrow$ Áp dụng style khi người dùng di chuột (hover) qua phần tử.
- focus: $\rightarrow$ Áp dụng style khi phần tử được nhắm chọn (focus) (ví dụ: click vào input, dùng phím Tab di chuyển đến button).
- active: $\rightarrow$ Áp dụng style tại khoảnh khắc người dùng đang nhấn giữ chuột trái vào phần tử.
- group-hover: $\rightarrow$ Áp dụng style cho một phần tử con khi người dùng di chuột qua phần tử cha (Yêu cầu phần tử cha phải được khai báo class group). Rất hữu ích khi hover vào cả card thì chữ/icon bên trong tự đổi màu.

3. Viết class Tailwind cho yêu cầu cụ thể:

- Class Tailwind tương ứng: hidden md:flex.

* hidden $\rightarrow$ Ẩn hoàn toàn trên mobile (display: none;).
* md:flex $\rightarrow$ Từ màn hình kích thước md ($\ge 768\text{px}$) trở lên thì kích hoạt display: flex;.

## Câu C1 (10đ) — Tailwind vs CSS thuần

Dưới đây là bảng so sánh phân tích dựa trên trải nghiệm lập trình thực tế khi phát triển một Component (ví dụ: **Product Card**) bằng hai phương pháp: **CSS thuần (đặt tệp .css riêng biệt)** và **TailwindCSS (Inline Utilities)**.

| Tiêu chí so sánh                          | CSS Thuần (Vanilla CSS)                                                                                                                                                                                        | TailwindCSS Utilities                                                                                                                                                                                                                                                                                                          |
| :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML File Size**                        | **Nhỏ hơn đáng kể.** Do mã HTML chỉ chứa cấu trúc thẻ cơ bản và tên class định danh ngắn (ví dụ: `class="product-card"`).                                                                                      | **Nặng hơn rất nhiều.** Tệp HTML phình to do phải gánh một lượng lớn chuỗi ký tự utility classes phức tạp (ví dụ: `class="w-full bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow"`).                                                                                                                       |
| **Maintainability<br>(Khả năng bảo trì)** | _ Khó duy trì khi dự án lớn dần.<br>_ Thường xuyên xảy ra hiện tượng "CSS chết" (mã không dùng đến nhưng không dám xóa vì sợ ảnh hưởng trang khác).<br>\* Phải chuyển đổi qua lại giữa file `.html` và `.css`. | _ **Rất dễ bảo trì.** Do code giao diện gắn chặt vào cấu trúc HTML. Cần sửa card nào chỉ cần tìm trúng thẻ đó để chỉnh sửa class.<br>_ Không có mã CSS thừa thãi trong hệ thống.<br>\* Nhược điểm: Giao diện dòng code trông rối mắt lúc ban đầu.                                                                              |
| **Reusability<br>(Khả năng tái sử dụng)** | **Tái sử dụng bằng Class Name:** Chỉ cần khai báo lại tên lớp CSS đã viết sẵn vào thẻ HTML mới (ví dụ: gắn class `product-card` vào bất cứ đâu).                                                               | **Tái sử dụng linh hoạt qua 2 cách:**<br>1. _Ở tầng Component (Khuyên dùng):_ Đóng gói cấu trúc HTML đó vào các file Template/Component của các framework (React, Vue, Blade, PHP component).<br>2. _Ở tầng CSS:_ Sử dụng chỉ thị `@apply` trong file CSS tổng (Ví dụ: `.card-custom { @apply bg-white rounded-lg shadow; }`). |

---

## Câu C2 (10đ) — Performance & Kiến trúc

1. Tại sao file Tailwind CSS cuối cùng (Production compile) lại nhỏ hơn Bootstrap CSS?

- **Bootstrap** hoạt động theo mô hình **Component-First**. File CSS của Bootstrap chứa mọi biến thể cấu trúc, màu sắc được xây dựng sẵn của hàng trăm component (Nav, Modal, Card, Dropdown, Carousel...) cho dù bạn có gọi ra dùng trong dự án hay không.
- **TailwindCSS** hoạt động theo mô hình **Atomic-CSS (Utility-First)** kết hợp cơ chế quét tự động. Khi xuất bản (Build Production), Tailwind quét toàn bộ các file dự án để tìm các class thực tế được viết. Những class nào không được dùng sẽ hoàn toàn bị loại bỏ. Do vậy, kích thước file CSS nén cuối cùng của Tailwind thường chỉ dao động từ **$10\text{KB} - 50\text{KB}$**, nhỏ hơn file Bootstrap gốc gấp nhiều lần.

2. Giải thích Tailwind PurgeCSS / Tailwind JIT (Just-In-Time)

- **Cách thức loại bỏ:** Công cụ lõi của TailwindCSS sẽ thực hiện việc phân tích cú pháp chuỗi văn bản tĩnh (Static Regex Scanning) trong toàn bộ mã nguồn của bạn. Nó so khớp tên các class có mặt trong file (`.html`, `.js`, `.jsx`...) với bộ từ điển cấu trúc của Tailwind. Toàn bộ các class thừa, không xuất hiện trong code thực tế sẽ bị **Purge (xóa sổ hoàn toàn)** khỏi tệp CSS kết quả.
- **Tailwind JIT Compiler:** Từ phiên bản 3 trở đi, cơ chế JIT (Just-In-Time) thay đổi tư duy: Tailwind không tạo ra sẵn một file CSS khổng lồ nữa. Thay vào đó, khi bạn vừa gõ lệnh `px-4 shadow-sm` vào file HTML và lưu lại, trình biên dịch JIT lập tức phát hiện và **"nấu chín/sinh mã"** duy nhất hai class đó trực tiếp chèn vào CSS runtime.

3. Khi nào KHÔNG nên dùng TailwindCSS? (2 Tình huống cụ thể)
   Mặc dù rất mạnh mẽ, việc ứng dụng TailwindCSS sẽ phản tác dụng trong các trường hợp sau:

- **Tình huống 1: Phát triển mã nhúng (Embed Widgets / Plugins bên thứ ba):** Nếu bạn xây dựng một Chat Widget hoặc Form đăng ký để khách hàng nhúng trực tiếp vào website của họ, việc dùng Tailwind rất nguy hiểm. Nếu website của khách hàng cũng dùng Tailwind nhưng cấu hình cấu trúc hoặc prefix khác, nó sẽ gây ra xung đột ghi đè giao diện nghiêm trọng, làm méo mó widget của bạn. CSS thuần kết hợp Shadow DOM là lựa chọn tốt nhất ở đây.
- **Tình huống 2: Đội ngũ Dev thiếu kỹ năng kiểm soát code và không dùng Component Framework:**
  Trong một dự án phát triển web tĩnh truyền thống quy mô lớn sử dụng mã HTML/PHP thuần thô sơ, việc không dùng các framework chia nhỏ component (như React/Vue) sẽ khiến các đoạn mã giao diện lặp đi lặp lại. Khi cần sửa một thanh Navbar xuất hiện ở 50 trang khác nhau, lập trình viên sẽ phải sửa tay thủ công chuỗi class của cả 50 trang đó. Lúc này, áp dụng CSS truyền thống hoặc SCSS rõ ràng đem lại hiệu quả quản trị cao hơn.

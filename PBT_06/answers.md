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

### Câu A1:  
1.type="email" → Ô nhập văn bản có kiểm tra định dạng email → Dùng cho đăng ký tài khoản, nhập email nhận hóa đơn  
2.type="password" → Ô nhập văn bản nhưng ký tự bị ẩn (****) → Dùng cho đăng nhập, tạo mật khẩu tài khoản  
3.type="text" → Ô nhập văn bản một dòng, không validation đặc biệt → Dùng nhập tên khách hàng, địa chỉ giao hàng  
4.type="number" → Ô nhập số, có nút tăng/giảm, chỉ cho nhập số → Dùng chọn số lượng sản phẩm  
5.type="tel" → Ô nhập số điện thoại, có thể hiện bàn phím số trên mobile → Dùng nhập số điện thoại giao hàng  
6.type="url" → Ô nhập link, kiểm tra định dạng URL → Dùng nhập link website  
7.type="date" → Bộ chọn ngày  → Dùng chọn ngày giao hàng hoặc ngày sinh khách hàng  
8.type="radio" → Nút chọn tròn, chỉ chọn 1 trong nhiều lựa chọn → Dùng chọn phương thức thanh toán  
9.type="checkbox" → Ô vuông, có thể chọn nhiều → Dùng chọn nhiều sản phẩm hoặc đồng ý điều khoản  
10.type="file" → Nút chọn file từ máy → Dùng upload ảnh sản phẩm  hoặc upload bằng chứng thanh toán.  

### Câu A2:  
Trường hợp 1: <input type="text" required value=""> -> Không submmit được vì thuộc tính required bắt buộc phải có giá trị không được để trống  
Trường hợp 2: <input type="email" value="abc"> -> Không submmit được vì type=email là định dạng email, abc không có "@" và domain thiếu cấu trúc của 1 email  
Trường hợp 3: <input type="number" min="1" max="10" value="15"> -> Không submmit được vì max = 10 nhưng lại nhập giá trị value = 15 -> Sai  
Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123"> ->Không submmit được vì pattern yêu cầu đúng 10 chữ số, nhưng "abc123" vừa có chữ vừa không đủ 10 số  
Trường hợp 5: <input type="password" minlength="8" value="123"> -> Không submmit được vì minlength = "8" nhưng value = "123" = 3 < 8 -> không đạt yêu cầu  

### Câu A3:
1.Tại sao `<label for="email">` quan trọng cho người dùng screen reader?  
+ Screen reader sẽ đọc: “Email: edit text”  
+ Người dùng không nhìn thấy giao diện vẫn hiểu input đó để làm gì  
+ Khi click vào label, con trỏ sẽ tự focus vào input

2.Khi nào dùng `<fieldset>` + `<legend>`:
+ Khi nhóm các input có cùng một chủ đề  
+ Form có nhiều phần rõ ràng (thông tin cá nhân, thanh toán, giao hàng…)  
Ví dụ:  
```
<fieldset>
    <legend>Thông tin cá nhân</legend>

    <label for="name">Họ tên:</label>
    <input type="text" id="name">

    <label for="email">Email:</label>
    <input type="email" id="email">
</fieldset>
```
3.aria-label dùng khi:  
+ Không thể hiển thị label trên UI  
+ Icon button (không có text)  
+ Input đặc biệt không có label trực quan  
-Vì sao không dùng aria-label khi đã có label, vì:  
Gây xung đột thông tin  
Mất tính liên kết native HTML  
Giảm maintainability    

### Câu A4:
1.loading="lazy" trong `<img>` khiến ảnh chỉ tải khi gần xuất hiện trong màn hình người dùng.  
-Cải thiện:  
 + Giảm thời gian tải trang ban đầu  
 + Giảm băng thông  
 + Tăng hiệu suất của web   
 + Website nhiều nặng ảnh load nhanh hơn nhiều

-Không nên dùng khi:  
 + Ảnh cần hiển thị ngay  
 + Ảnh quan trọng cho UX ban đầu  
 + Layout cần load đồng bộ (tránh layout shift)  
 + Ảnh nhỏ ít

2.Nên dùng nhiều `<source>` trong thẻ `<video>` vì:  
-Web sẽ chạy từng video từ trên xuống:
 + Tăng tương thích đa trình duyệt  
 + Tránh lỗi video không chạy  
 + Tối ưu hiệu suất
Ba format video web phổ biến: MP4, WebM, MOV.

3.Thuộc tính `alt` trên `<img>` dùng để: 
 + Mô tả nội dung ảnh khi ảnh bị lỗi hoặc không load được, người dùng dùng screen reader
 + Quan trọng cho SEO
 + Cải thiện accessibility
-Ba alt tốt nhất cho các trường hợp:
+ Ảnh sản phẩm iPhone 16: alt="iPhone 16 màu đen hiển thị mặt trước với màn hình sáng"  
+ Ảnh trang trí (decorative): alt="" nên để rỗng
+ Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ doanh thu Q1/2026 đạt 500 triệu tăng 5% so với cùng kỳ năm ngoái"  
### Câu A5:  
`<img>` chỉ là 1 hình ảnh đơn lẻ, không có thêm chú thích hay thông tin gì khác -> Dùng khi ảnh chỉ cần hiển thị, không cần mô tả thêm thông tin phụ.  

`<figure>` là 1 khối nội dung bao gồm cả ảnh, chú thích, các thông tin phụ -> Dùng khi ảnh có thông tin bổ sung quan trọng, ví dụ như: ảnh biểu đồ thống kê, chú thích sản phẩm.  

## Phần C:  
Câu C1:  
Lỗi 1: Dòng 2 - Không có `<label for>`, không có id, name, không required  
Sửa:  
```
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
```

Lỗi 2: Dòng 4 - chỉ có placeholder, không có label → không accessibility  
Sửa:  
```
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>
```

Lỗi 3: Dòng 6 - Password thiếu label + thiếu name + required  
Sửa:  
```
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" placeholder="Mật khẩu" required>
```

Lỗi 4: Dòng 7 - Confirm password không có label + không có id/name  
Sửa:  
```
<label for="confirm_password">Nhập lại mật khẩu:</label>
<input type="password" id="confirm_password" name="confirm_password" placeholder="Nhập lại mật khẩu" required>
```

Lỗi 5: Dòng 9 - Phone dùng type="text" + không có label + pattern validation  
Sửa: 
```
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="^\d{10}$" placeholder="0901234567" required>
```

Lỗi 6: Dòng 11-14 - Select không có label + không có name/id  
Sửa:  
```
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
    <option value="">--Chọn--</option>
    <option value="hanoi">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>
```

Lỗi 7: Dòng 16-18 - Checkbox không dùng input mà chỉ có label rỗng  
Sửa:  
```
<input type="checkbox" id="terms" name="terms" required>
<label for="terms">Tôi đồng ý điều khoản</label>
```

Lỗi 8: Dòng 20 - Submit button dùng input cũ + thiếu best practice  
Sửa:  
```
<button type="submit">Gửi</button>
```

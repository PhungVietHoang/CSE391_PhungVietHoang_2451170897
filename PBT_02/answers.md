Câu A1:  
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

Câu A2:  
Trường hợp 1: <input type="text" required value=""> -> Không submmit được vì thuộc tính required bắt buộc phải có giá trị không được để trống  
Trường hợp 2: <input type="email" value="abc"> -> Không submmit được vì type=email là định dạng email, abc không có "@" và domain thiếu cấu trúc của 1 email  
Trường hợp 3: <input type="number" min="1" max="10" value="15"> -> Không submmit được vì max = 10 nhưng lại nhập giá trị value = 15 -> Sai  
Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123"> ->Không submmit được vì pattern yêu cầu đúng 10 chữ số, nhưng "abc123" vừa có chữ vừa không đủ 10 số  
Trường hợp 5: <input type="password" minlength="8" value="123"> -> Không submmit được vì minlength = "8" nhưng value = "123" = 3 < 8 -> không đạt yêu cầu  

Câu A3:

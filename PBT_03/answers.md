### Câu A1:  
1. Inline CSS:  
Ví dụ:
```
<h1 style="color: red; font-size: 30px;">Hello CSS</h1>
```

Ưu điểm:

 + Áp dụng nhanh ngay trên 1 element  
 + Override dễ các style khác

Nhược điểm:

 + Khó bảo trì  
 + Không tái sử dụng được  
 + HTML bị rối, khó đọc

Nên dùng khi:

 + Fix nhanh tạm thời  
 + Test nhỏ  
 + Override khẩn cấp

2. Internal CSS:   
Ví dụ:
```
<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: blue;
            font-size: 30px;
        }
    </style>
</head>
<body>
    <h1>Hello CSS</h1>
</body>
</html>
```

Ưu điểm:

 + Không cần file ngoài
 + Dễ test nhanh 1 trang

Nhược điểm:

 + Không tái sử dụng giữa nhiều trang
 + File HTML phình to

Nên dùng khi:

 + Prototype
 + Trang đơn (landing page nhỏ)

3. External CSS: 
Ví dụ:
```
<link rel="stylesheet" href="styles.css">
style:
h1 {
    color: green;
    font-size: 30px;
}
```

Ưu điểm:

 + Tái sử dụng nhiều trang
 + Dễ maintain
 + Browser cache → load nhanh
 + Chuẩn production

Nhược điểm:

 + Cần thêm file CSS
 + Load lần đầu hơi chậm hơn inline

Nên dùng khi:

 +Dự án thật
 + Website nhiều trang
 + Team development

### Câu A2:
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ và 45.990.000đ
3. #app header                  → Chọn: ShopTLU, Home, Products, About
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU

Câu A3:
Trường hợp 1:Content-box:   
```
width: 400px;
padding: 20px;
border: 5px;
margin: 10px;
```
Chiều rộng hiển thị (content + padding + border):  
Content: 400  
Padding: 20 × 2 = 40  
Border: 5 × 2 = 10  
400 + 40 + 10 = 450px  
Không gian chiếm trên trang (include margin):
Margin: 10 × 2 = 20
450 + 20 = 470px  

Trường hợp 2: border-box  
```
box-sizing: border-box;
width: 400px;
padding: 20px;
border: 5px;
margin: 10px;
```
Chiều rộng hiển thị: 400px (cố định)  
Kích thước content thực tế:  
Tổng width = 400  
Trừ padding: 40  
Trừ border: 10  
Content = 400 − 50 = 350px  

rường hợp 3: Margin collapse  
```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
Khoảng cách giữa 2 box:  
40px (KHÔNG phải 65px)  

Câu A4:  
1. Tính specificity score $(a, b, c)$ cho mỗi ruleTrong CSS, độ ưu tiên được tính theo hệ thức:a (ID): Số lượng ID selector.b (Classes): Số lượng class selector, attribute selector, và pseudo-classes.c (Elements): Số lượng element selector và pseudo-elements.
2. Kết quả: Element sẽ có màu đỏ (red).Giải thích: Trình duyệt so sánh điểm số từ trái sang phải ($a \rightarrow b \rightarrow c$).Rule C có điểm ID ($a = 1$) cao nhất trong tất cả các rule.Các rule khác (A, B, D) đều có $a = 0$.Vì vậy, Rule C thắng tuyệt đối, bất kể các rule khác có bao nhiêu class hay element đi nữa.
3. Kết quả: Element sẽ có màu cam (orange).
Giải thích:
Inline style (viết trực tiếp trong thuộc tính style="" của thẻ HTML) có độ ưu tiên cao hơn tất cả các selector trong file CSS bên ngoài hoặc trong thẻ <style>. Nếu quy đổi ra điểm số, inline style đứng ở cột đầu tiên (1, 0, 0, 0), cao hơn cả ID selector (0, 1, 0, 0)


4.Kết quả: Element sẽ có màu đen (black).

Giải thích:
Mặc dù Rule A (p) có specificity score thấp nhất (0, 0, 1), nhưng từ khóa !important là một công cụ "phá vỡ" mọi quy tắc phân cấp thông thường.

Khi một thuộc tính được đánh dấu !important, nó sẽ ghi đè lên tất cả các khai báo khác, bao gồm cả ID selector và Inline style.

Thứ tự ưu tiên lúc này trở thành: !important > Inline Style > ID > Class > Element.


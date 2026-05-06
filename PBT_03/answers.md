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


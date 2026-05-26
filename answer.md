Phần A:  
Câu A1:

1.  Thẻ `<meta viewport>` chuẩn:
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
`name="viewport"` : Khai báo cho trình duyệt biết đoạn meta này dùng để cấu hình vùng hiển thị (viewport) của trang web.
`content` để chứa cấu hình tham số như:  
`width=device-width` để cho màn hình của trang web bằng đúng màn hình của thiết bị.
`initial-scale=1.0` đặt mức zoom ban đầu là 1:1 khi trang vừa tải xong.

2.  Nếu thiếu thẻ này , các trình duyệt trên điện thoại sẽ cho rẳng web này được làm cho máy tính.
    Iphone sẽ ép trang web hiển thị 1 viewport với chiều ngang của máy tính => các nút bấm hoặc các chữ sẽ nhỏ tí khiến cho việc thao tác rất khó khăn.

3.  Sự khác nhau giữa Mobile-First (Ưu tiên di động) và Desktop-First(Ưu tiên máy tính):

        Mobile-First: Thiết kế cho điện thoại trước => sau đó mở rộng dần cho tablet, desktop.
        VD CSS:

        ```
        /* CSS mặc định cho Mobile (dưới 768px) */
        .container {
         display: flex;
         flex-direction: column; /* Sắp xếp một cột dọc trên điện thoại */
         padding: 10px;
        }
        /_ Áp dụng từ màn hình 768px trở lên (Tablet, Desktop) _/
        @media (min-width: 768px) {
        .container {
        flex-direction: row; /_ Chuyển thành hàng ngang khi màn hình đủ rộng _/
        padding: 20px;
        }
        }
        ```

        Desktop-First: Thiết kế cho desktop trước → sau đó thu nhỏ cho mobile.

        VD CSS:

        ```
        /* CSS mặc định cho Desktop (Màn hình lớn) */
        .container {
            display: flex;
            flex-direction: row; /* Sắp xếp hàng ngang mặc định */
            padding: 20px;
        }

        /* Áp dụng khi màn hình nhỏ hơn 768px (Mobile) */
        @media (max-width: 768px) {
            .container {
                flex-direction: column; /* Chuyển thành cột dọc trên màn hình nhỏ */
                padding: 10px;
            }
        }
        ```

    Mobile - First được khuyên dùng vì :
    - Người dùng mobile nhiều hơn desktop: Lượng người dùng mobile để truy cập web chiếm 60-70%.
    - Tối ưu hóa hiệu năng: Mobile thì thường sẽ yếu hơn máy tính về phần cứng, mạng, pin nên viết css cho mobile đơn giản hơn => load nhanh hơn.
    - Ép phải thiết kế tinh gọn: Màn hình mobile nhỏ không thể nhét nhiều thứ vào nên buộc phải thiết kế gọn, rõ ràng chỉ tập chung vào những thứ quan trọng.

Bài A2:

1. Kích thước cực nhỏ (extra small): Kích thước: < 576px, 1 cột
2. Kích thước Nhỏ (Small - sm): Kích thước:≥576px, 2 cột
3. Kích thước Trung bình (Medium - md): Kích thước:≥ 768px,3 cột
4. Kích thước Lớn (lg): Kích thước:≥992px,4 cột
5. Kích thước cực lớn (xl): Kích thước: ≥ 1200px, 5 cột
6. Kích thước siêu lớn (xxl): Kích thước: ≥ 1400px, 6 cột

Câu A3:  
| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | `100%` |
| 600px | `540px` |
| 800px | `720px` |
| 1000px | `960px` |
| 1400px | `1140px` |

Câu A4:
cauuu

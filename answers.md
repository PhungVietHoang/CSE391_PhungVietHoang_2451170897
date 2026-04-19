Câu A1:
1.
Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, sẽ xảy ra các bước:
  Bước 1: Request khởi tạo: Trình duyệt nhận lệnh từ người dùng và chuẩn bị một HTTP Request.
  Bước 2:Truyền tải: Request đi qua router WiFi của người dùng.
  Bước 3: Đi qua mạng lưới: Request di chuyển qua nhà mạng và các hạ tầng cáp quang để đến được trung tâm dữ liệu (Data Center) của Shopee.
  Bước 4: Xử lý tại Server: Server của Shopee tiếp nhận yêu cầu, xử lý logic.
  Bước 5: Phản hồi (Response): Server gửi trả dữ liệu (HTML, CSS, JS,...) ngược lại qua con đường đã đi.
  Bước 6: Render: Trình duyệt nhận các file này, thực hiện quy trình render (Parse HTML -> Parse CSS -> Execute JS -> Paint & Render) để hiển thị giao diện lên màn hình.
  
2.
  <img width="687" height="455" alt="image" src="https://github.com/user-attachments/assets/d8e8061a-c906-42ad-8d2d-22807f1db296" />

Câu A2:
Các lỗi Semantic cần sửa:
  Header: Dùng div thay vì thẻ <header>.
  Navigation: Dùng div thay vì thẻ <nav> cho danh sách liên kết.
  Main Content: Dùng div thay vì thẻ <main> để bao bọc nội dung chính.
  Product Card: Dùng div thay vì thẻ <article> cho một sản phẩm đơn lẻ.
  Footer: Dùng div thay vì thẻ <footer>.

Sửa lại:
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h2 class="title">iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </figure>
    </article>
</main>

<footer>
    <p>&copy; 2026 ShopTLU</p>
</footer>


Câu A3:
+---------------------------------------+
| Hộp 1                                 |
+---------------------------------------+
| Text A Text B                         |
+---------------------------------------+
| Hộp 2                                 |
+---------------------------------------+
| Text C Text D                         |
+---------------------------------------+
| Hộp 3                                 |
+---------------------------------------+

Giải thích:
Hình trên được quyết điịnh bởi 2 thuộc tính chính:
1. Block-level elements (<div>):
  Các thẻ <div> là phần tử khối. Chúng có đặc tính tự động chiếm toàn bộ chiều ngang có sẵn và luôn ép buộc một dòng ngắt (line break) trước và sau nó.
Vì vậy, "Hộp 1", "Hộp 2" và "Hộp 3" đều đứng trên các dòng riêng biệt.
2. Inline elements
Các thẻ <span> và <strong> là phần tử nội dòng. Chúng không bắt đầu một dòng mới mà chỉ chiếm không gian vừa đủ với nội dung bên trong.Chúng sẽ cố gắng xếp cạnh nhau trên cùng một dòng nếu có đủ không gian. Do đó, "Text A" đứng cạnh "Text B", và "Text C" đứng cạnh "Text D" trên cùng dòng tương ứng của chúng.

Câu A4:
1. Sự khác nhau giữa <thead>, <tbody>, và <tfoot>
  Các thẻ này giúp cấu trúc hóa bảng dữ liệu một cách ngữ nghĩa (semantic), giúp trình duyệt và các công cụ hỗ trợ (như trình đọc màn hình) hiểu được nội dung của bảng:
  <thead> (Table Header): Chứa các ô tiêu đề của bảng (thường là các thẻ <th>). Nó xác định phần đầu của bảng, giúp người dùng biết các cột chứa thông tin gì.
  <tbody> (Table Body): Chứa dữ liệu chính của bảng. Đây là phần trung tâm nơi các hàng (<tr>) và ô (<td>) dữ liệu được đặt vào.
  <tfoot> (Table Footer): Chứa các thông tin tổng kết hoặc chú thích cuối bảng (ví dụ: tổng cộng, kết quả thống kê).
2. Tại sao KHÔNG NÊN dùng <table> để tạo layout trang web?
Việc sử dụng <table> để dàn trang (layout) là một thói quen cũ từ những năm 90 và hiện nay được coi là một lỗi nghiêm trọng. Dưới đây là 3 lý do chính:
   Gây khó khăn cho khả năng truy cập (Accessibility): Các công cụ hỗ trợ người dùng khiếm thị (screen reader) được lập trình để đọc bảng như một bảng dữ liệu thực thụ. Khi dùng bảng để layout, chúng sẽ đọc các cấu trúc giao diện như thể đó là một bảng số liệu, gây nhầm lẫn và khó khăn cho người dùng.
  
  Ảnh hưởng xấu đến SEO: Các bộ máy tìm kiếm (Google) ưu tiên các trang web có cấu trúc ngữ nghĩa (semantic). Bảng layout làm rối loạn thứ tự nội dung và làm bot tìm kiếm khó hiểu được đâu là nội dung chính, đâu là nội dung phụ, từ đó làm giảm thứ hạng tìm kiếm của trang web.

  Khó bảo trì và kém linh hoạt (Responsive): Bảng có cấu trúc rất cứng nhắc. Khi muốn chuyển đổi giao diện trên di động, bảng rất khó để co giãn hoặc thay đổi thứ tự các phần tử. Thay vào đó, chúng ta nên sử dụng CSS Grid hoặc Flexbox, vốn được thiết kế đặc biệt cho việc dàn trang linh hoạt, sạch sẽ và dễ bảo trì hơn nhiều.

Bài B3:
Lỗi 1: Dòng 1 — Thiếu thông tin html trong doctype — Sửa thành <!DOCTYPE html>.
Lỗi 2: Dòng 1 — Thiếu thẻ mở <html> đầy đủ (thẻ lang) — Sửa thành <html lang="vi">.
Lỗi 3: Dòng 2 — Thiếu thẻ đóng </title> — Sửa thành <title>Trang web</title>.
Lỗi 4: Dòng 3 — Giá trị charset không chuẩn — Sửa thành UTF-8.
Lỗi 5: Dòng 5 — Thẻ đóng tiêu đề <h1> sai (<h1> thay vì </h1>) — Sửa thành </h1>.
Lỗi 6: Dòng 9 — Thiếu thẻ đóng </a> cho liên kết đầu tiên (dùng lại thẻ mở thay vì đóng) — Sửa thành </a>.
Lỗi 7: Dòng 20 — Lồng thẻ sai cách (thẻ <b> mở sau </b> hoặc đóng trước thẻ p) — Sửa thành <b>25.990.000đ</b>.
Lỗi 8: Dòng 31 — Thẻ <table> thiếu cấu trúc ngữ nghĩa (<thead>, <tbody>) — Bổ sung các thẻ này để đạt chuẩn.
Lỗi 9: Dòng 41 — Sử dụng thẻ <main> lần thứ hai (chỉ được có một <main> duy nhất) — Sửa thành <aside>.
Lỗi 10: Dòng 45 — Thiếu thẻ đóng </p> và </footer> — Bổ sung thẻ đóng tương ứng.

Bài C1:
<!DOCTYPE html>
<html lang="vi"> <!-- html gốc, khai báo ngôn ngữ -->
<head>
    <meta charset="UTF-8"> <!-- khai báo bảng mã -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- responsive -->
    <title>Chi tiết sản phẩm</title> <!-- tiêu đề trang -->
</head>
<body> <!-- body chứa toàn bộ nội dung hiển thị -->

    <header> <!-- header vì đây là phần đầu trang -->
        <h1>Logo / Tên website</h1> <!-- h1 đại diện tiêu đề chính -->
        <nav> <!-- nav vì đây là khu vực điều hướng -->
            <ul> <!-- ul vì menu không có thứ tự -->
                <li><a href="#">Trang chủ</a></li> <!-- a dùng để điều hướng -->
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Giỏ hàng</a></li>
            </ul>
        </nav>
    </header>

    <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng breadcrumb -->
        <ol> <!-- ol vì breadcrumb có thứ tự phân cấp -->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Điện thoại</a></li>
            <li>iPhone 16</li> <!-- item cuối không cần link -->
        </ol>
    </nav>

    <main> <!-- main chứa nội dung chính của trang -->

        <section> <!-- section nhóm nội dung sản phẩm -->
            <div class="product-images"> <!-- div vì chỉ là container layout -->
                <img src="#" alt="Ảnh 1"> <!-- img hiển thị hình ảnh -->
                <img src="#" alt="Ảnh 2">
                <img src="#" alt="Ảnh 3">
                <img src="#" alt="Ảnh 4">
                <img src="#" alt="Ảnh 5">
            </div>

            <div class="product-info"> <!-- div container cho thông tin -->
                <h2>Tên sản phẩm</h2> <!-- h2 vì là tiêu đề cấp 2 -->
                <p class="price">Giá</p> <!-- p cho nội dung văn bản -->
                <p class="rating">Đánh giá sao</p>
                <p class="description">Mô tả sản phẩm</p>
            </div>
        </section>

        <section> <!-- section vì là nhóm thông tin riêng -->
            <h2>Thông số kỹ thuật</h2> <!-- tiêu đề section -->
            <table> <!-- table vì dữ liệu dạng bảng -->
                <thead> <!-- phần tiêu đề bảng -->
                    <tr> <!-- hàng -->
                        <th>Thuộc tính</th> <!-- tiêu đề cột -->
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody> <!-- phần nội dung bảng -->
                    <tr>
                        <td>Ví dụ</td> <!-- dữ liệu -->
                        <td>Giá trị</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section> <!-- section cho đánh giá -->
            <h2>Đánh giá / Bình luận</h2>
            <article> <!-- article vì mỗi bình luận là 1 nội dung độc lập -->
                <h3>Tên người dùng</h3>
                <p>Nội dung bình luận</p>
            </article>
        </section>

        <aside> <!-- aside vì là nội dung phụ (sidebar) -->
            <h2>Sản phẩm tương tự</h2>
            <ul> <!-- ul vì danh sách sản phẩm -->
                <li><a href="#">Sản phẩm 1</a></li>
                <li><a href="#">Sản phẩm 2</a></li>
                <li><a href="#">Sản phẩm 3</a></li>
            </ul>
        </aside>

    </main>

    <footer> <!-- footer vì là phần cuối trang -->
        <p>Thông tin liên hệ / bản quyền</p>
    </footer>

</body>
</html>

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
 - Gây khó khăn cho khả năng truy cập (Accessibility): Các công cụ hỗ trợ người dùng khiếm thị (screen reader) được lập trình để đọc bảng như một bảng dữ liệu thực thụ. Khi dùng bảng để layout, chúng sẽ đọc các cấu trúc giao diện như thể đó là một bảng số liệu, gây nhầm lẫn và khó khăn cho người dùng.
  
 - Ảnh hưởng xấu đến SEO: Các bộ máy tìm kiếm (Google) ưu tiên các trang web có cấu trúc ngữ nghĩa (semantic). Bảng layout làm rối loạn thứ tự nội dung và làm bot tìm kiếm khó hiểu được đâu là nội dung chính, đâu là nội dung phụ, từ đó làm giảm thứ hạng tìm kiếm của trang web.

 - Khó bảo trì và kém linh hoạt (Responsive): Bảng có cấu trúc rất cứng nhắc. Khi muốn chuyển đổi giao diện trên di động, bảng rất khó để co giãn hoặc thay đổi thứ tự các phần tử. Thay vào đó, chúng ta nên sử dụng CSS Grid hoặc Flexbox, vốn được thiết kế đặc biệt cho việc dàn trang linh hoạt, sạch sẽ và dễ bảo trì hơn nhiều.


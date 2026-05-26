### Câu A1:  


| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | có | Vị trí mặc định của trình duyệt | có | Vị trí mặc định, không cần điều chỉnh. |
| `relative` | có | Vị trí gốc của chính nó | có | Làm điểm tựa cho phần tử con absolute. |
| `absolute` | Không | Nearest positioned ancestor | có | Đặt icon, nhãn hoặc hiệu ứng chồng lên phần tử cha. |
| `fixed` | Không | viewport | Không | Menu điều hướng luôn hiện ở đầu trang hoặc nút "Back to top". |
| `sticky` | có | Vị trí tổ tiên gần nhất có thanh cuộn | có | Tiêu đề bảng hoặc header giữ nguyên khi cuộn qua nội dung của nó. |


1. `absolute` tham chiếu `body` khi: Phần tử `absolute` đó không nằm trong bất kỳ thẻ tổ tiên nào được set position (khác static). Lúc này, nó sẽ lấy khung hình trình duyệt làm mốc, thường dẫn đến việc canh lề theo thẻ `<body>`.
2. `absolute` tham chiếu `parent` khi: Thẻ cha trực tiếp `parent` của nó được thiết lập thuộc tính position khác `static`.
3. Giải thích "Nearest positioned ancestor" : Là phần tử bao ngoài các phần tử hiện tại có `position` khác `static`.

### Câu A2:   
Trường hợp 1:  
  + Dự đoán layout: : 4 item nằm trên 1 hàng `display:flex ` và mỗi cái sẽ chia đều 25% `flex:1`.  
  + Sơ đồ:``` [  Item 1  ][  Item 2  ][  Item 3  ][  Item 4  ].  ```

Trường hợp 2:  
  + Dự đoán layout: Sẽ có 3 hàng , 2 cột,  mỗi item sẽ chiếm 45% + 2,5% margin trái và 2,5% margin phải.
  + Sơ đồ:
    ```
              [ Item 1 ] [ Item 2 ]
              [ Item 3 ] [ Item 4 ]
              [ Item 5 ] [ Item 6 ]
    ```

Trường hợp 3:  
  + Dự đoán layout: 3 item nằm trên cùng 1 hàng ngang  
      + `space-between`: Item 1 sát lề trái, Item 3 sát lề phải, Item 2 nằm chính giữa.  
      + `align-items: center`: Cả 3 item sẽ được căn giữa theo chiều dọc của container.
   
  + Sơ đồ:
```
---------------------------------------
| [Item 1]      [Item 2]      [Item 3] |  <-- Căn giữa dọc
---------------------------------------
 ```
Trường hợp 4:  
  + Dự đoán layout: 1 hàng và 3 cột
      + Cột 1 và 3 rộng cố định 200px.
      + Cột 2 sẽ chiếm toàn bộ khoảng trống còn lại ở giữa (1fr).
      + Khoảng các giữa các cột là 20px.
  + Sơ đồ: 
```
[ 200px ] --20px-- [   1fr   ] --20px-- [ 200px ]
```
Trường hợp 5:  
  + Dự đoán layout: Có 3 hàng.  
    + Hàng 1: Items 1, 2, 3 (chia đều 33.3%).  
    + Hàng 2: Items 4, 5, 6.  
    + Hàng 3: Item 7 sẽ nằm ở cột đầu tiên (bên trái), hai cột còn lại để trống.  
  + Sơ đồ:
```
[ Item 1 ] [ Item 2 ] [ Item 3 ]
[ Item 4 ] [ Item 5 ] [ Item 6 ]
[ Item 7 ] [        ] [        ]
```

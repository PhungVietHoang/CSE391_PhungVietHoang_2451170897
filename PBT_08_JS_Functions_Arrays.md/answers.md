# PHẦN A

---

## Câu A1:

### 1. Triển khai hàm `tinhThueBaoHiem(luong)` theo 3 cú pháp chuẩn

- **Cách 1: Function Declaration (Khai báo hàm truyền thống)**

```javascript
function tinhThueBaoHiemDeclaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue: thue, thuc_nhan: luong - thue };
}
```

- **Cách 2: Function Expression (Biểu thức hàm)**

```
const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
};
```

- **Cách 3: Arrow Function (Hàm mũi tên ngắn gọn)**

```
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue: thue, thuc_nhan: luong - thue };
};
```

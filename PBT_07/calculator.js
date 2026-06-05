/**
 * Thực hiện phép tính toán học cơ bản giữa hai số
 * @param {any} num1 Số thứ nhất
 * @param {string} operator Toán tử (+, -, *, /, %, **)
 * @param {any} num2 Số thứ hai
 * @returns {number|string} Kết quả phép tính hoặc thông báo lỗi
 */
function calculate(num1, operator, num2) {
  // 1. Kiểm tra input hợp lệ (phải là số)
  // Nếu truyền chuỗi số kiểu "10", ta ép kiểu về số, còn chuỗi chữ như "abc" sẽ bị bắt lỗi
  const n1 = Number(num1);
  const n2 = Number(num2);

  if (
    isNaN(n1) ||
    isNaN(n2) ||
    typeof num1 === "boolean" ||
    typeof num2 === "boolean"
  ) {
    return "Lỗi: Input không phải số";
  }

  // 2. Xử lý các phép tính toán qua toán tử
  switch (operator) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      // Xử lý chia cho 0
      if (n2 === 0) {
        return "Lỗi: Không thể chia cho 0";
      }
      return n1 / n2;
    case "%":
      if (n2 === 0) {
        return "Lỗi: Không thể chia lấy dư cho 0";
      }
      return n1 % n2;
    case "**":
      return n1 ** n2;
    default:
      // Toán tử không hợp lệ
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// --- HỆ THỐNG KỊCH BẢN KIỂM THỬ (TEST CASES) ---
console.log(calculate(10, "+", 5)); // -> 15
console.log(calculate(10, "/", 0)); // -> "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5)); // -> "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // -> "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10)); // -> 1024
console.log(calculate(15, "%", 4)); // -> 3

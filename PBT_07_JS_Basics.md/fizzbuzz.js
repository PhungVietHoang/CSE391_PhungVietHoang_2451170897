// ==========================================
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// ==========================================
function classicFizzBuzz() {
  console.log("--- START CLASSIC FIZZBUZZ ---");
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

// Có thể gọi chạy hàm này nếu cần test version 1:
// classicFizzBuzz();

// ==========================================
// VERSION 2: CUSTOM FIZZBUZZ (DỮ LIỆU ĐỘNG)
// ==========================================
/**
 * Hàm FizzBuzz mở rộng dựa trên mảng quy tắc rules truyền vào
 * @param {number} n Số lượng phần tử cần kiểm tra chạy từ 1 đến n
 * @param {Array} rules Mảng chứa các đối tượng quy tắc { divisor, word }
 */
function customFizzBuzz(n, rules) {
  console.log(`\n--- START CUSTOM FIZZBUZZ (n = ${n}) ---`);

  for (let i = 1; i <= n; i++) {
    let resultStr = "";

    // Duyệt qua toàn bộ danh sách quy tắc được thiết lập
    for (let j = 0; j < rules.length; j++) {
      if (i % rules[j].divisor === 0) {
        resultStr += rules[j].word; // Cộng dồn chuỗi nếu chia hết
      }
    }

    // Nếu chuỗi kết quả rỗng (không thỏa mãn quy tắc nào) -> In chính số đó
    if (resultStr === "") {
      console.log(i);
    } else {
      // Ngược lại, in ra tổ hợp các từ khóa ghép lại
      console.log(`${i} = "${resultStr}"`);
    }
  }
}

// --- HỆ THỐNG KIỂM THỬ MẪU (TEST CASE PHẦN B4) ---
const myRules = [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
];

// Tiến hành chạy thử nghiệm in đến số 110 để kiểm thử điểm 105
customFizzBuzz(105, myRules);

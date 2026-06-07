// 1. pipe() — Nối chuỗi liên hoàn các hàm từ trái sang phải
function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

// Thực nghiệm kiểm thử pipe()
const processPipeline = pipe(
  (x) => x * 2, // 5 → 10
  (x) => x + 10, // 10 → 20
  (x) => x.toString(), // 20 → "20"
  (x) => "Kết quả: " + x,
);
console.log(processPipeline(5)); // → "Kết quả: 20"

// 2. memoize() — Cơ chế lưu trữ đệm (Cache) kết quả tính toán dựa trên đối số đầu vào
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    // Biến các đối số thành một chuỗi key để lưu trữ trong Map
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Thực nghiệm kiểm thử memoize()
const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});
console.log(expensiveCalc(1000000)); // → In "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // → Không in "Đang tính...", lấy từ cache bộ nhớ!

// 3. debounce() — Trì hoãn thực thi hàm cho tới khi người dùng ngừng thao tác trong một khoảng delay
function debounce(fn, delay) {
  let timeoutId = null;
  return function (...args) {
    // Reset bộ đếm thời gian nếu tác vụ tiếp tục được gọi liên tục
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Thực nghiệm kiểm thử debounce()
const doSearch = debounce((query) => {
  console.log("Searching:", query);
}, 500);

// Mô phỏng chuỗi gõ phím nhanh của người dùng: chỉ thực thi lệnh tìm kiếm cuối cùng
doSearch("iP");
doSearch("iPhon");
doSearch("iPhone 16"); // -> Chỉ dòng này thực sự được in ra màn hình sau 500ms

// 4. retry() — Cơ chế tự động thực thi lại một hàm bất đồng bộ (Promise) nhiều lần nếu xảy ra lỗi mạng/hệ thống
async function retry(fn, maxAttempts = 3) {
  let lastError = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(
        `Thử lại lượt ${attempt}/${maxAttempts} thất bại do: ${error.message}`,
      );
    }
  }
  throw new Error(
    `Đã thử lại tối đa ${maxAttempts} lần nhưng vẫn thất bại. Chi tiết lỗi: ${lastError.message}`,
  );
}

// Thực nghiệm kiểm thử retry() với hàm kết nối mạng giả lập ngẫu nhiên
const unstableFetchData = async () => {
  if (Math.random() > 0.1) {
    // 90% tỉ lệ lỗi giả lập
    throw new Error("Mất kết nối server!");
  }
  return "Dữ liệu tải thành công!";
};

// Thực thi bọc trong cấu trúc async tự gọi (IIFE) để kiểm thử
(async () => {
  try {
    console.log("\n=== ĐANG THỰC HIỆN TÁC VỤ RETRY ===");
    const data = await retry(unstableFetchData, 4);
    console.log("-> Kết quả cuối cùng:", data);
  } catch (err) {
    console.error("-> Kết quả cuối cùng:", err.message);
  }
})();

function startGame() {
  // 1. Máy tạo số ngẫu nhiên từ 1 đến 100
  const targetNumber = Math.floor(Math.random() * 100) + 1;

  // Mảng theo dõi các số người dùng đã từng nhập để bắt trùng lặp
  const guessedHistory = [];

  const maxAttempts = 7;
  let currentAttempt = 0;
  let isWin = false;

  alert(
    "Hệ thống đã chọn ngẫu nhiên một số từ 1 đến 100.\nBạn có tối đa 7 lượt để đoán. Bắt đầu!",
  );

  // 2. Vòng lặp quản lý lượt chơi (tối đa 7 lần)
  while (currentAttempt < maxAttempts) {
    let input = prompt(
      `[Lượt đoán ${currentAttempt + 1}/${maxAttempts}] Nhập số bạn chọn (1-100):`,
    );

    // Nếu người dùng ấn nút "Hủy" (Cancel) trên hộp thoại prompt
    if (input === null) {
      alert("Bạn đã thoát trò chơi.");
      return;
    }

    // 3. Chuẩn hóa dữ liệu đầu vào và Validate
    input = input.trim();
    const guess = Number(input);

    // Kiểm tra hợp lệ dữ liệu nhập vào
    if (
      input === "" ||
      isNaN(guess) ||
      !Number.isInteger(guess) ||
      guess < 1 ||
      guess > 100
    ) {
      alert(
        "Cảnh báo: Vui lòng chỉ nhập một số nguyên hợp lệ nằm trong khoảng từ 1 đến 100!",
      );
      continue; // Không tính lượt đoán khi nhập sai định dạng
    }

    // 4. Kiểm tra xem số này đã được đoán ở lượt trước chưa
    let isDuplicate = false;
    for (let i = 0; i < guessedHistory.length; i++) {
      if (guessedHistory[i] === guess) {
        isDuplicate = true;
        break;
      }
    }

    if (isDuplicate) {
      alert(`Bạn đã đoán số ${guess} này rồi! Hãy chọn số khác.`);
      continue; // Không tính lượt đoán khi nhập trùng số cũ
    }

    // Lưu số vừa nhập vào nhật ký bộ nhớ lịch sử
    guessedHistory.push(guess);
    currentAttempt++; // Tính 1 lượt đoán hợp lệ

    // 5. Kiểm tra logic so sánh số với đáp án
    if (guess === targetNumber) {
      isWin = true;
      alert(`Đúng rồi! Bạn đoán đúng sau ${currentAttempt} lần!`);
      break;
    } else if (guess > targetNumber) {
      alert("Thấp hơn!");
    } else {
      alert("Cao hơn!");
    }
  }

  // 6. Xử lý kết cục khi hết 7 lượt mà chưa tìm ra kết quả
  if (!isWin) {
    alert(
      `Bạn đã hết lượt đoán! Bạn thua rồi.\nĐáp án chính xác là: ${targetNumber}`,
    );
  }
}

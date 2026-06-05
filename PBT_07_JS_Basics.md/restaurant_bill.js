/**
 * Hàm tính toán và in hóa đơn chi tiết cho nhà hàng
 * @param {Array} orderList Danh sách món ăn [{ name, price, quantity }]
 * @param {string} dayOfWeek Ngày trong tuần (bằng tiếng Anh, ví dụ: 'Wednesday')
 * @param {boolean} includeTip Có tính tiền tip 5% hay không
 */
function inHoaDonNhaHang(orderList, dayOfWeek, includeTip = true) {
  // 1. Tính tổng tiền gốc chưa giảm giá
  let tongChuaGiam = 0;
  const itemLines = [];

  for (let i = 0; i < orderList.length; i++) {
    const item = orderList[i];
    const thanhTienMon = item.price * item.quantity;
    tongChuaGiam += thanhTienMon;

    // Chuẩn hóa dòng hiển thị món ăn phục vụ in ấn
    const stt = `${i + 1}. `;
    const detail = `${item.name.padEnd(12)} x${item.quantity}`.padEnd(20);
    const cost =
      `@${item.price / 1000}k`.padEnd(7) + `= ${thanhTienMon / 1000}k`;
    itemLines.push(stt + detail + cost);
  }

  // 2. Tính phần trăm giảm giá theo hạn mức tổng hóa đơn
  let phanTramGiamBill = 0;
  if (tongChuaGiam > 1000000) {
    phanTramGiamBill = 15; // Giảm 15% nếu tổng > 1 triệu
  } else if (tongChuaGiam > 500000) {
    phanTramGiamBill = 10; // Giảm 10% nếu tổng > 500k
  }

  // 3. Quy tắc ngày thứ 3 (Wednesday) -> Giảm thêm 5%
  if (dayOfWeek.trim().toLowerCase() === "wednesday") {
    phanTramGiamBill += 5;
  }

  // Tính số tiền được giảm giá dựa trên tổng phần trăm đạt được
  const tienGiamGia = (tongChuaGiam * phanTramGiamBill) / 100;
  const tongSauGiam = tongChuaGiam - tienGiamGia;

  // 4. Tính Thuế VAT (8%) và Tiền Tip (5%) dựa trên số tiền SAU KHI ĐÃ GIẢM GIÁ
  const tienVAT = tongSauGiam * 0.08;
  const tienTip = includeTip ? tongSauGiam * 0.05 : 0;

  // 5. Tổng số tiền cuối cùng khách phải thanh toán
  const tongThanhToan = tongSauGiam + tienVAT + tienTip;

  // --- HÀM HỖ TRỢ ĐỊNH DẠNG SỐ TIỀN VNĐ ---
  const formatVND = (num) => Math.round(num).toLocaleString("vi-VN") + "đ";

  // --- TIẾN HÀNH IN KHUNG HÓA ĐƠN ĐÚNG FORMAT MẪU ---
  console.log("╔══════════════════════════════════════╗");
  console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
  console.log("╠══════════════════════════════════════╣");

  // In danh sách các món ăn
  for (let i = 0; i < itemLines.length; i++) {
    // Căn lề đều hai bên khung
    console.log(`║ ${itemLines[i].padEnd(36)} ║`);
  }

  console.log("╠══════════════════════════════════════╣");

  // In các dòng thông số tài chính
  console.log(
    `║ Tổng cộng:              ${formatVND(tongChuaGiam).padStart(12)} ║`,
  );
  console.log(
    `║ Giảm giá (${phanTramGiamBill}%):           ${formatVND(tienGiamGia).padStart(12)} ║`,
  );
  console.log(`║ VAT (8%):               ${formatVND(tienVAT).padStart(12)} ║`);
  console.log(
    `║ Tip (${includeTip ? "5%" : "0%"}):                ${formatVND(tienTip).padStart(12)} ║`,
  );

  console.log("╠══════════════════════════════════════╣");
  console.log(
    `║ THANH TOÁN:             ${formatVND(tongThanhToan).padStart(12)} ║`,
  );
  console.log("╚══════════════════════════════════════╝");
}

// --- KỊCH BẢN KIỂM THỬ (TEST CASE) ---

// Tạo giỏ hàng mẫu có tổng tiền lớn để kích hoạt giảm giá (>500k)
const gioHang = [
  { name: "Phở bò đặc biệt", price: 65000, quantity: 4 }, // 260.000đ
  { name: "Lẩu thái cá hồi", price: 350000, quantity: 1 }, // 350.000đ
  { name: "Trà thạch đào", price: 20000, quantity: 3 }, // 60.000đ
  // Tổng tiền gốc chưa giảm: 670.000đ -> Thỏa mãn mức giảm 10%
];

// Chạy hàm kiểm thử vào ngày Thứ tư (Wednesday) để được giảm thêm 5% (Tổng cộng giảm 15%)
inHoaDonNhaHang(gioHang, "Wednesday", true);

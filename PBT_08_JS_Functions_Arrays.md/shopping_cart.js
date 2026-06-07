function createCart() {
  // Dữ liệu riêng tư thông qua tính chất đóng gói của Closure
  let items = [];
  let currentDiscountCode = "";

  return {
    // Thêm sản phẩm (nếu đã có → tăng quantity)
    addItem(product, quantity = 1) {
      const existingItem = items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }
    },

    // Xóa sản phẩm theo id
    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    // Cập nhật số lượng
    updateQuantity(productId, newQuantity) {
      const targetItem = items.find((item) => item.id === productId);
      if (targetItem && newQuantity > 0) {
        targetItem.quantity = newQuantity;
      } else if (targetItem && newQuantity <= 0) {
        this.removeItem(productId);
      }
    },

    // Tính tổng tiền gốc chưa giảm giá
    getRawTotal() {
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    // Tính tổng tiền sau khi đã áp mã giảm giá
    getTotal() {
      const rawTotal = this.getRawTotal();
      switch (currentDiscountCode) {
        case "SALE10":
          return rawTotal * 0.9;
        case "SALE20":
          return rawTotal * 0.8;
        case "FREESHIP":
          return Math.max(0, rawTotal - 30000);
        default:
          return rawTotal;
      }
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      const validCodes = ["SALE10", "SALE20", "FREESHIP"];
      if (validCodes.includes(code)) {
        currentDiscountCode = code;
      } else {
        console.log(`Mã giảm giá '${code}' không hợp lệ.`);
      }
    },

    // In giỏ hàng dạng bảng đồ họa văn bản
    printCart() {
      console.log("┌──────────────────────────────────────────────┐");
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");

      items.forEach((item, index) => {
        const stt = (index + 1).toString().padEnd(2);
        const name = item.name.padEnd(13);
        const qty = item.quantity.toString().padStart(2);
        const price = item.price.toLocaleString("vi-VN").padStart(10);
        const total = (item.price * item.quantity)
          .toLocaleString("vi-VN")
          .padStart(10);
        console.log(`│ ${stt}│ ${name} │ ${qty} │ ${price} │ ${total} │`);
      });

      console.log("├──────────────────────────────────────────────┤");
      if (currentDiscountCode) {
        console.log(
          `│ Mã giảm giá áp dụng: ${currentDiscountCode.padEnd(24)}│`,
        );
      }
      const finalTotalStr = this.getTotal().toLocaleString("vi-VN") + "đ";
      console.log(`│ Tổng cộng:      ${finalTotalStr.padStart(28)} │`);
      console.log("└──────────────────────────────────────────────┘");
    },

    // Lấy tổng số sản phẩm (tổng quantity)
    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Xóa toàn bộ giỏ
    clearCart() {
      items = [];
      currentDiscountCode = "";
    },
  };
}

// === HỆ THỐNG KIỂM THỬ (TEST CASE) ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2

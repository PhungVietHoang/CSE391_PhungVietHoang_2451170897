document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const phone = document.getElementById("phone");
  const submitBtn = document.getElementById("submitBtn");

  const state = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  };

  function checkFormValidity() {
    const allValid = Object.values(state).every((status) => status === true);
    submitBtn.disabled = !allValid;
  }

  function toggleStatus(element, isValid) {
    const group = element.parentElement;
    if (isValid) {
      group.classList.remove("invalid");
      group.classList.add("valid");
    } else {
      group.classList.remove("valid");
      group.classList.add("invalid");
    }
    state[element.id] = isValid;
    checkFormValidity();
  }

  // 1. Validate Username (2 - 50 ký tự)
  username.addEventListener("input", () => {
    const val = username.value.trim();
    const icon = username.parentElement.querySelector(".status-icon");
    const isValid = val.length >= 2 && val.length <= 50;
    icon.textContent = isValid ? "✅" : "❌";
    toggleStatus(username, isValid);
  });

  // 2. Validate Email bằng Regex chuẩn RFC
  email.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    toggleStatus(email, emailRegex.test(email.value.trim()));
  });

  // 3. Password Strength Meter
  password.addEventListener("input", () => {
    const val = password.value;
    const bar = document.getElementById("strengthBar");
    const txt = document.getElementById("strengthText");

    let score = 0;
    if (val.length >= 8) {
      const hasLower = /[a-z]/.test(val);
      const hasUpper = /[A-Z]/.test(val);
      const hasDigit = /\d/.test(val);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);

      if (hasLower && hasDigit) score = 1; // Trung bình
      if (hasLower && hasUpper && hasDigit && hasSpecial) score = 2; // Mạnh
    } else if (val.length > 0) {
      score = 0; // Yếu
    }

    if (val.length === 0) {
      bar.style.width = "0%";
      txt.textContent = "";
      toggleStatus(password, false);
    } else if (score === 0) {
      bar.style.width = "33%";
      bar.style.backgroundColor = "#ef4444";
      txt.textContent = "Yếu (Yêu cầu ít nhất 8 ký tự)";
      txt.style.color = "#ef4444";
      toggleStatus(password, false);
    } else if (score === 1) {
      bar.style.width = "66%";
      bar.style.backgroundColor = "#f59e0b";
      txt.textContent = "Trung bình";
      txt.style.color = "#f59e0b";
      toggleStatus(password, true);
    } else {
      bar.style.width = "100%";
      bar.style.backgroundColor = "#10b981";
      txt.textContent = "Mạnh (An toàn)";
      txt.style.color = "#10b981";
      toggleStatus(password, true);
    }

    // Kích hoạt check lại confirm password nếu user đổi pass gốc
    if (confirmPassword.value)
      confirmPassword.dispatchEvent(new Event("input"));
  });

  // 4. Confirm Password Check
  confirmPassword.addEventListener("input", () => {
    const isValid =
      confirmPassword.value === password.value &&
      confirmPassword.value.length > 0;
    toggleStatus(confirmPassword, isValid);
  });

  // 5. Định dạng số điện thoại tự động khi gõ (Auto-formatting: 0901-234-567)
  phone.addEventListener("input", (e) => {
    let digits = e.target.value.replace(/\D/g, ""); // Loại bỏ toàn bộ ký tự không phải số

    let formatted = "";
    if (digits.length > 0) {
      formatted += digits.substring(0, 4);
    }
    if (digits.length > 4) {
      formatted += "-" + digits.substring(4, 7);
    }
    if (digits.length > 7) {
      formatted += "-" + digits.substring(7, 10);
    }

    e.target.value = formatted;
    toggleStatus(phone, digits.length === 10);
  });

  // Xử lý nộp đơn Form Submit -> Hiện Modal tóm tắt thông tin
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.getElementById("successModal");
    const summary = document.getElementById("modalSummary");

    summary.innerHTML = `
            <p><b>Họ tên:</b> ${username.value}</p>
            <p><b>Email:</b> ${email.value}</p>
            <p><b>Số ĐT:</b> ${phone.value}</p>
        `;
    modal.style.display = "flex";
  });

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("successModal").style.display = "none";
    form.reset();
    document.getElementById("strengthBar").style.width = "0%";
    document.getElementById("strengthText").textContent = "";
    document
      .querySelectorAll(".status-icon")
      .forEach((i) => (i.textContent = ""));
    document
      .querySelectorAll(".form-group")
      .forEach((g) => g.classList.remove("valid", "invalid"));
    submitBtn.disabled = true;
  });
});

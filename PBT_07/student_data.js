const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- KHỞI TẠO CÁC BIẾN ĐỂ THỐNG KÊ ---
let countGioi = 0,
  countKha = 0,
  countTB = 0,
  countYeu = 0;

let maxStudent = null;
let minStudent = null;

let totalMath = 0,
  totalPhysics = 0,
  totalCS = 0;

let totalMaleGPA = 0,
  countMale = 0;
let totalFemaleGPA = 0,
  countFemale = 0;

// Mảng lưu trữ kết quả xử lý của từng SV để in bảng sau đó
const processedStudents = [];

// --- VÒNG LẶP XỬ LÝ CHÍNH (LOOPS + IF/ELSE) ---
for (let i = 0; i < students.length; i++) {
  const sv = students[i];

  // 1. Tính điểm trung bình (Hệ số: 0.4, 0.3, 0.3)
  const gpa = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
  // Làm tròn 1 chữ số thập phân bằng toán học thuần túy
  const roundedGPA = Math.round(gpa * 10) / 10;

  // 2. Phân loại xếp loại
  let xepLoai = "";
  if (roundedGPA >= 8.0) {
    xepLoai = "Giỏi";
    countGioi++;
  } else if (roundedGPA >= 6.5) {
    xepLoai = "Khá";
    countKha++;
  } else if (roundedGPA >= 5.0) {
    xepLoai = "Trung bình";
    countTB++;
  } else {
    xepLoai = "Yếu";
    countYeu++;
  }

  // Lưu vào danh sách đã xử lý
  processedStudents.push({
    name: sv.name,
    gpa: roundedGPA.toFixed(1),
    xepLoai: xepLoai,
  });

  // 3. Tìm SV có điểm TB cao nhất và thấp nhất
  if (maxStudent === null || roundedGPA > maxStudent.gpa) {
    maxStudent = { name: sv.name, gpa: roundedGPA };
  }
  if (minStudent === null || roundedGPA < minStudent.gpa) {
    minStudent = { name: sv.name, gpa: roundedGPA };
  }

  // 4. Cộng dồn điểm để tính TB môn toàn lớp
  totalMath += sv.math;
  totalPhysics += sv.physics;
  totalCS += sv.cs;

  // 5. BONUS: Thống kê theo giới tính
  if (sv.gender === "M") {
    totalMaleGPA += roundedGPA;
    countMale++;
  } else if (sv.gender === "F") {
    totalFemaleGPA += roundedGPA;
    countFemale++;
  }
}

// ================= IN KẾT QUẢ RA CONSOLE =================

// Thống kê 1: Bảng kết quả trực quan
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < processedStudents.length; i++) {
  const s = processedStudents[i];
  // Định dạng lề cơ bản để cột ngay ngắn
  const stt = (i + 1).toString().padEnd(3);
  const name = s.name.padEnd(6);
  const gpa = s.gpa.padEnd(4);
  console.log(`| ${stt} | ${name} | ${gpa} | ${s.xepLoai.padEnd(11)} |`);
}

console.log("\n------------------------------------------------");

// Thống kê 2: Đếm số lượng học lực
console.log(`[ Thống kê Xếp loại ]`);
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá:  ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu:  ${countYeu} SV`);

console.log("\n------------------------------------------------");

// Thống kê 3: Thủ khoa & Vĩ khoa
console.log(
  `- SV có điểm TB CAO nhất:  ${maxStudent.name} (${maxStudent.gpa})`,
);
console.log(
  `- SV có điểm TB THẤP nhất: ${minStudent.name} (${minStudent.gpa})`,
);

console.log("\n------------------------------------------------");

// Thống kê 4: Điểm TB các môn của lớp
const classAvgMath = (totalMath / students.length).toFixed(2);
const classAvgPhys = (totalPhysics / students.length).toFixed(2);
const classAvgCS = (totalCS / students.length).toFixed(2);
console.log(`[ Điểm TB môn toàn lớp ]`);
console.log(`- Toán (Math):      ${classAvgMath}`);
console.log(`- Vật lý (Physics):  ${classAvgPhys}`);
console.log(`- Tin học (CS):     ${classAvgCS}`);

console.log("\n------------------------------------------------");

// Thống kê 5: BONUS Giới tính
const avgMale = countMale > 0 ? (totalMaleGPA / countMale).toFixed(2) : 0;
const avgFemale =
  countFemale > 0 ? (totalFemaleGPA / countFemale).toFixed(2) : 0;
console.log(`[ Điểm TB theo giới tính ]`);
console.log(`- Nam (M): ${avgMale}`);
console.log(`- Nữ (F):  ${avgFemale}`);

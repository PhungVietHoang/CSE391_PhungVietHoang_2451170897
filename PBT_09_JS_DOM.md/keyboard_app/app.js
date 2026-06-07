const images = [
    { src: "https://picsum.photos/id/10/800/400", title: "Rừng xanh đại ngàn - Ảnh 1" },
    { src: "https://picsum.photos/id/11/800/400", title: "Thung lũng đá hoang vu - Ảnh 2" },
    { src: "https://picsum.photos/id/12/800/400", title: "Bờ biển sóng vỗ - Ảnh 3" }
];

const commands = [
    { id: "dark", text: "Chuyển đổi giao diện: Dark/Light Mode", action: () => document.body.classList.toggle("dark-mode") },
    { id: "alert", text: "Hệ thống: Hiển thị thông báo Alert chào mừng", action: () => alert("Chào mừng bạn đến với hệ thống phím tắt nâng cao!") },
    { id: "reset", text: "Thư viện: Quay về hình ảnh đầu tiên", action: () => changeImage(0) }
];

let currentIndex = 0;
let isPlaying = false;
let slideInterval = null;
let activeIndexPalette = 0;
let filteredCommands = [...commands];

const displayImg = document.getElementById("displayImg");
const imgCaption = document.getElementById("imgCaption");
const playBtn = document.getElementById("playBtn");
const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdResultList = document.getElementById("cmdResultList");

function changeImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;
    displayImg.src = images[currentIndex].src;
    imgCaption.textContent = images[currentIndex].title;
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playBtn.textContent = "Dừng Slideshow (Space)";
        slideInterval = setInterval(() => changeImage(currentIndex + 1), 2000);
    } else {
        playBtn.textContent = "Chạy Slideshow (Space)";
        clearInterval(slideInterval);
    }
}

// Render Command Items lên Palette
function renderPalette() {
    cmdResultList.innerHTML = "";
    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.classList.add("cmd-item");
        li.role = "option";
        if (idx === activeIndexPalette) li.classList.add("selected");
        li.textContent = cmd.text;
        
        li.addEventListener("click", () => {
            cmd.action();
            closePalette();
        });
        cmdResultList.appendChild(li);
    });
}

function openPalette() {
    cmdPalette.style.display = "flex";
    cmdPalette.setAttribute("aria-hidden", "false");
    cmdInput.focus();
    cmdInput.value = "";
    filteredCommands = [...commands];
    activeIndexPalette = 0;
    renderPalette();
}

function closePalette() {
    cmdPalette.style.display = "none";
    cmdPalette.setAttribute("aria-hidden", "true");
    document.getElementById("galleryBox").focus();
}

// --- QUẢN LÝ LẮNG NGHE SỰ KIỆN TOÀN CỤC KEYDOWN ---
window.addEventListener("keydown", (e) => {
    // 1. Phím tắt mở hệ thống tìm kiếm lệnh Ctrl + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        cmdPalette.style.display === "none" ? openPalette() : closePalette();
        return;
    }

    // Xử lý khi Command Palette đang mở
    if (cmdPalette.style.display === "flex") {
        if (e.key === "Escape") {
            closePalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndexPalette = (activeIndexPalette + 1) % filteredCommands.length;
            renderPalette();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndexPalette = (activeIndexPalette - 1 + filteredCommands.length) % filteredCommands.length;
            renderPalette();
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands[activeIndexPalette]) {
                filteredCommands[activeIndexPalette].action();
                closePalette();
            }
        }
        return;
    }

    // Xử lý khi đang đứng ở Gallery Ảnh công cộng
    if (document.activeElement === document.getElementById("galleryBox") || document.activeElement === document.body) {
        if (e.key === "ArrowRight") changeImage(currentIndex + 1);
        if (e.key === "ArrowLeft") changeImage(currentIndex - 1);
        if (e.key === " ") {
            e.preventDefault(); // Ngăn chặn hành vi cuộn trang tự động của Space
            toggleSlideshow();
        }
        // Phím số từ 1 - 3 để nhảy nhanh ảnh tương ứng
        if (["1", "2", "3"].includes(e.key)) {
            changeImage(parseInt(e.key) - 1);
        }
    }
});

// Xử lý bộ lọc Search Input ngay trong Command Palette
cmdInput.addEventListener("input", (e) => {
    const kw = e.target.value.toLowerCase().trim();
    filteredCommands = commands.filter(c => c.text.toLowerCase().includes(kw));
    activeIndexPalette = 0;
    renderPalette();
});

playBtn.addEventListener("click", toggleSlideshow);

// Khởi chạy ứng dụng ảnh
changeImage(0);
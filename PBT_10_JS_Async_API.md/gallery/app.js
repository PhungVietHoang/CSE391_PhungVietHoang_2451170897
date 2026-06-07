const photoGrid = document.getElementById("photo-grid");
const loadStatus = document.getElementById("load-status");
const loadTrigger = document.getElementById("load-trigger");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

let page = 1;
let isLoading = false;
let hasMore = true;

async function fetchPhotos(pageNumber) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=20`,
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function renderPhotos(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
      <img data-src="${photo.thumbnailUrl}" alt="${photo.title}" loading="lazy" />
      <p>${photo.title}</p>
    `;

    card.addEventListener("click", () => {
      openLightbox(photo.url);
    });

    fragment.appendChild(card);
  });

  photoGrid.appendChild(fragment);
  observeLazyImages();
}

function showStatus(message) {
  loadStatus.textContent = message;
}

function observeLazyImages() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        io.unobserve(img);
      });
    },
    { rootMargin: "100px" },
  );

  lazyImages.forEach((img) => observer.observe(img));
}

async function loadMorePhotos() {
  if (isLoading || !hasMore) return;
  isLoading = true;
  showStatus("Đang tải ảnh...");

  try {
    const photos = await fetchPhotos(page);
    if (!photos.length) {
      hasMore = false;
      showStatus("Đã tải hết ảnh.");
      observer.unobserve(loadTrigger);
      return;
    }
    renderPhotos(photos);
    page += 1;
    showStatus("Cuộn xuống để tải thêm ảnh.");
  } catch (error) {
    showStatus(`Lỗi: ${error.message}`);
  } finally {
    isLoading = false;
  }
}

function openLightbox(imageUrl) {
  lightboxImage.src = imageUrl;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadMorePhotos();
    }
  },
  { rootMargin: "200px" },
);

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

observer.observe(loadTrigger);
loadMorePhotos();

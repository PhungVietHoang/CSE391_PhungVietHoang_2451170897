const statusText = document.getElementById("status-text");
const elapsedText = document.getElementById("elapsed-text");
const usersBody = document.getElementById("widget-users-body");
const randomBody = document.getElementById("widget-random-body");
const dogsBody = document.getElementById("widget-dogs-body");
const refreshButton = document.getElementById("refresh-all");

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error(`Users API lỗi ${res.status}`);
  return res.json();
}

async function fetchRandomUsers() {
  const res = await fetch("https://randomuser.me/api/?results=4&nat=us");
  if (!res.ok) throw new Error(`Random user lỗi ${res.status}`);
  return res.json();
}

async function fetchDogImages() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random/4");
  if (!res.ok) throw new Error(`Dog API lỗi ${res.status}`);
  return res.json();
}

function renderUsers(data) {
  usersBody.innerHTML = `
    <ul class="items">
      ${data
        .slice(0, 5)
        .map(
          (user) =>
            `<li><strong>${user.name}</strong> — ${user.email}<br><span>${user.company?.name || ""}</span></li>`,
        )
        .join("")}
    </ul>
  `;
}

function renderRandom(data) {
  randomBody.innerHTML = `
    <ul class="items">
      ${data.results
        .map(
          (user) =>
            `<li><strong>${user.name.first} ${user.name.last}</strong> — ${user.email}</li>`,
        )
        .join("")}
    </ul>
  `;
}

function renderDogs(data) {
  dogsBody.innerHTML = `
    <div class="items">
      ${data.message.map((url) => `<img src="${url}" alt="Dog" />`).join("")}
    </div>
  `;
}

function renderWidgetError(element, message) {
  element.innerHTML = `<p class="widget-error">${message}</p>`;
}

function setWidgetLoading() {
  const placeholder = '<p class="widget-status">Đang tải...</p>';
  usersBody.innerHTML = placeholder;
  randomBody.innerHTML = placeholder;
  dogsBody.innerHTML = placeholder;
}

async function loadDashboard() {
  const startTime = Date.now();
  statusText.textContent = "Đang tải tất cả widget...";
  elapsedText.textContent = "";
  setWidgetLoading();

  const results = await Promise.allSettled([
    fetchUsers(),
    fetchRandomUsers(),
    fetchDogImages(),
  ]);

  results.forEach((result, index) => {
    if (index === 0) {
      if (result.status === "fulfilled") renderUsers(result.value);
      else renderWidgetError(usersBody, result.reason.message);
    }
    if (index === 1) {
      if (result.status === "fulfilled") renderRandom(result.value);
      else renderWidgetError(randomBody, result.reason.message);
    }
    if (index === 2) {
      if (result.status === "fulfilled") renderDogs(result.value);
      else renderWidgetError(dogsBody, result.reason.message);
    }
  });

  const elapsed = Date.now() - startTime;
  statusText.textContent = "Hoàn thành tải dữ liệu.";
  elapsedText.textContent = `Data loaded in ${elapsed} ms`;
}

refreshButton.addEventListener("click", loadDashboard);
loadDashboard();

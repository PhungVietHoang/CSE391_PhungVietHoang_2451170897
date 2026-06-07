const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const weatherCard = document.getElementById("weather-card");
const cityNameEl = document.getElementById("weather-city");
const descriptionEl = document.getElementById("weather-description");
const tempEl = document.getElementById("weather-temp");
const windEl = document.getElementById("weather-wind");
const timezoneEl = document.getElementById("weather-timezone");
const timeEl = document.getElementById("weather-time");
const iconEl = document.getElementById("weather-icon");
const historyList = document.getElementById("history-list");

const STORAGE_KEY = "weather_search_history";
const MAX_HISTORY = 5;

function setStatus(message, type = "info") {
  statusEl.textContent = message;
  statusEl.className = type === "error" ? "status error" : "status";
}

function showWeatherCard() {
  weatherCard.classList.remove("hidden");
}

function hideWeatherCard() {
  weatherCard.classList.add("hidden");
}

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

function loadHistory() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function updateHistory(city) {
  const normalized = city.trim();
  if (!normalized) return;
  const history = loadHistory();
  const next = [
    normalized,
    ...history.filter(
      (item) => item.toLowerCase() !== normalized.toLowerCase(),
    ),
  ].slice(0, MAX_HISTORY);
  saveHistory(next);
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyList.innerHTML = history
    .map(
      (city) =>
        `<li><button type="button" data-city="${city}">${city}</button></li>`,
    )
    .join("");
}

async function geocode(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocode lỗi HTTP ${response.status}`);
  const data = await response.json();
  if (!data.results || data.results.length === 0)
    throw new Error("Không tìm thấy thành phố");
  return data.results[0];
}

async function fetchWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather lỗi HTTP ${response.status}`);
  const data = await response.json();
  return data.current_weather;
}

function renderWeather(city, location, weather) {
  const icon = getWeatherIcon(weather.weathercode);
  cityNameEl.textContent = `${city}, ${location.country}`;
  descriptionEl.textContent = `Mã thời tiết: ${weather.weathercode}`;
  tempEl.textContent = `${weather.temperature.toFixed(1)}°C`;
  windEl.textContent = `${weather.windspeed.toFixed(1)} km/h`;
  timezoneEl.textContent = `${location.timezone || "GMT"}`;
  timeEl.textContent = weather.time;
  iconEl.textContent = icon;
  showWeatherCard();
}

async function handleSearch(city) {
  try {
    setStatus("Đang tải...", "info");
    hideWeatherCard();
    const location = await geocode(city);
    const weather = await fetchWeather(location.latitude, location.longitude);
    renderWeather(city, location, weather);
    updateHistory(city);
    setStatus("Tải thời tiết thành công.");
  } catch (error) {
    setStatus(error.message || "Có lỗi xảy ra", "error");
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  handleSearch(city);
});

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-city]");
  if (!button) return;
  handleSearch(button.dataset.city);
});

renderHistory();

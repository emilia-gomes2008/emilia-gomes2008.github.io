const CHANNEL_ID = "UCPpGQAg59YTHUbtHxdqZmIQ"; // @ibexis
const SHARED_VIDEO_ID = "9gX6ZWROc9o"; // solo script/voice/animation/edit example
const FALLBACK_LATEST_ID = SHARED_VIDEO_ID;

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const CREATIVE = [
  {
    title: "🎞️ Animation",
    description: "Bringing characters and stories to life frame by frame for my videos.",
    source: "latest",
  },
  {
    title: "🎤 Voice Acting",
    description: "Performing and recording voices for characters and narration.",
    source: "shared",
  },
  {
    title: "✂️ Editing",
    description: "Cutting, pacing, and polishing footage into a finished video.",
    source: "shared",
  },
  {
    title: "📝 Scripting",
    description: "Writing the stories, jokes, and dialogue behind my content.",
    source: "latest",
  },
];

let latestLongFormIdPromise = null;

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function getLatestLongFormId() {
  if (!latestLongFormIdPromise) {
    latestLongFormIdPromise = (async () => {
      for (const buildProxyUrl of CORS_PROXIES) {
        try {
          const res = await fetchWithTimeout(buildProxyUrl(FEED_URL), 6000);
          if (!res.ok) continue;
          const xmlText = await res.text();
          const doc = new DOMParser().parseFromString(xmlText, "text/xml");
          const entries = Array.from(doc.getElementsByTagName("entry"));
          for (const entry of entries) {
            const link = entry.getElementsByTagName("link")[0];
            const href = link ? link.getAttribute("href") : "";
            if (href && !href.includes("/shorts/")) {
              const videoId = entry.getElementsByTagName("yt:videoId")[0];
              if (videoId) return videoId.textContent;
            }
          }
        } catch (e) {
          // try next proxy
        }
      }
      return FALLBACK_LATEST_ID;
    })();
  }
  return latestLongFormIdPromise;
}

function embedMarkup(videoId) {
  return `
    <div class="video-embed">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}"
        title="Emília's video example"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>`;
}

function renderCreative() {
  const container = document.getElementById("creative-list");
  if (!container) return;

  container.innerHTML = CREATIVE.map(
    (item, i) => `
    <button type="button" class="card creative-card" data-index="${i}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </button>`
  ).join("");

  container.querySelectorAll(".creative-card").forEach((card) => {
    card.addEventListener("click", () => openModal(CREATIVE[Number(card.dataset.index)]));
  });
}

async function openModal(item) {
  const overlay = document.getElementById("creative-modal");
  const body = document.getElementById("creative-modal-body");
  body.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <h4>Example:</h4>
    <p class="state-msg">Loading video…</p>
  `;
  overlay.classList.add("open");

  const videoId = item.source === "shared" ? SHARED_VIDEO_ID : await getLatestLongFormId();
  if (!overlay.classList.contains("open")) return;
  body.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <h4>Example:</h4>
    ${embedMarkup(videoId)}
  `;
}

function closeModal() {
  document.getElementById("creative-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCreative();
  document.getElementById("creative-modal-close").addEventListener("click", closeModal);
  document.getElementById("creative-modal").addEventListener("click", (e) => {
    if (e.target.id === "creative-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

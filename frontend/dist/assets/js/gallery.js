// Add your photos here: drop the image file into assets/images/gallery/
// then add an entry below with its filename and a caption.
const PHOTOS = [
  { file: "aaaaaaaaaaaaaaaaaa.jpg", caption: "It looks like the fish is screaming and I find it funny." },
  { file: "bite.jpg", caption: "My cat really likes to bite my hand." },
  { file: "cat.jpg", caption: "He's so cute." },
  { file: "fnaf_books.jpg", caption: "I found this at the shopping, had to take a pic." },
  { file: "kitty.jpg", caption: "He looks like that one Megamind meme in here." },
  { file: "phineas.jpg", caption: "He was laying on the car because birds kept pooping on it, so he decided to protect the car." },
  { file: "side_eye.jpg", caption: "He bit me + painted nails photo (they look so good)." },
  { file: "SIR.jpg", caption: "My first Pokémon SIR, also my Chaos Rising chase card." },
  { file: "funny.png", caption: "CSS error while building this page. It was funny." },
];

let currentIndex = 0;

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  if (PHOTOS.length === 0) {
    grid.innerHTML = `<p class="state-msg">No photos yet — check back soon!</p>`;
    return;
  }

  grid.innerHTML = PHOTOS.map(
    (photo, i) => `
    <button type="button" class="gallery-tile" data-index="${i}">
      <img src="../assets/images/gallery/${photo.file}" alt="${photo.caption}" loading="lazy" />
    </button>`
  ).join("");

  grid.querySelectorAll(".gallery-tile").forEach((tile) => {
    tile.addEventListener("click", () => openLightbox(Number(tile.dataset.index)));
  });
}

function renderModal() {
  const photo = PHOTOS[currentIndex];
  const body = document.getElementById("gallery-modal-body");
  body.innerHTML = `
    <img src="../assets/images/gallery/${photo.file}" alt="${photo.caption}" />
    <p>${photo.caption}</p>
    <div class="gallery-thumbs">
      ${PHOTOS.map(
    (p, i) => `
        <button type="button" class="gallery-thumb ${i === currentIndex ? "active" : ""}" data-index="${i}" aria-label="Photo ${i + 1}">
          <img src="../assets/images/gallery/${p.file}" alt="" loading="lazy" />
        </button>`
  ).join("")}
    </div>
  `;

  body.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      currentIndex = Number(thumb.dataset.index);
      renderModal();
    });
  });

  body.querySelector(".gallery-thumb.active")?.scrollIntoView({ block: "nearest", inline: "center" });
}

function openLightbox(index) {
  currentIndex = index;
  renderModal();
  document.getElementById("gallery-modal").classList.add("open");
}

function closeLightbox() {
  document.getElementById("gallery-modal").classList.remove("open");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
  renderModal();
}

function showNext() {
  currentIndex = (currentIndex + 1) % PHOTOS.length;
  renderModal();
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  document.getElementById("gallery-modal-close").addEventListener("click", closeLightbox);
  document.getElementById("gallery-prev").addEventListener("click", showPrev);
  document.getElementById("gallery-next").addEventListener("click", showNext);
  document.getElementById("gallery-modal").addEventListener("click", (e) => {
    if (e.target.id === "gallery-modal") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("gallery-modal").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
});

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
    tile.addEventListener("click", () => openLightbox(PHOTOS[Number(tile.dataset.index)]));
  });
}

function openLightbox(photo) {
  const overlay = document.getElementById("gallery-modal");
  const body = document.getElementById("gallery-modal-body");
  body.innerHTML = `
    <img src="../assets/images/gallery/${photo.file}" alt="${photo.caption}" />
    <p>${photo.caption}</p>
  `;
  overlay.classList.add("open");
}

function closeLightbox() {
  document.getElementById("gallery-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  document.getElementById("gallery-modal-close").addEventListener("click", closeLightbox);
  document.getElementById("gallery-modal").addEventListener("click", (e) => {
    if (e.target.id === "gallery-modal") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

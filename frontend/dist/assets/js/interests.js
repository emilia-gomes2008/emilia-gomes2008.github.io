const PLACEHOLDER_NOTE = "(Haven't written what I like about this yet!)";

// To add a picture for an item: drop the image file into assets/images/interests/
// then set its "image" field to that filename, e.g. image: "freddy.jpg"
const INTERESTS = [
  {
    name: "Gaming",
    icon: "🎮",
    groups: [
      {
        title: null,
        items: [
          { name: "Five Nights at Freddy's", image: "freddy.jpg", note: "I love the lore, despite how convoluted it is." },
          { name: "Bendy and the Ink Machine", image: "ink_demon.png", note: "The first mascot horror I ready dove into, the lore is amazing too, especially after Dark Revival." },
          { name: "Ultrakill", image: "ultrakill.jpg", note: "I'm not a big fan of FPS games but this one, it hits different." },
          { name: "Minecraft", image: "minecraft.png", note: "Calm and relaxing." },
          { name: "Undertale", image: "undertale.png", note: "The story is so heart warming and the character so memorable. My favorite's Papyrus." },
          { name: "Deltarune", image: "deltarune.png", note: "Really excited to what Toby Fox has in store." },
          { name: "Indie games in general", image: "indie.png", note: "I can't list them all." },
          { name: "Sonic the Hedgehog", image: "sonic.png", note: "Sonic fan since I first watched Sonic X as a kid, love the franchise, the characters and even the games." },
          { name: "Pokémon", image: "pkmn.png", note: "I like the TCG, despite how the recent format is going." },
        ],
      },
    ],
  },
  {
    name: "Animation",
    icon: "🎬",
    groups: [
      {
        title: "Indie Animation",
        items: [
          { name: "The Amazing Digital Circus", image: "caine.jpg", note: "Isn't she lovely?\nIsn't she wonderful?" },
          { name: "Murder Drones", image: "n.jpg", note: "I won't fall down, you need me\nWe don't follow crowds, we mold them new\nI'm not done, believe me\nWe won't settle down, we'll make them move\nMake them mine!" },
          { name: "The Gaslight District", image: "tgd.jpg", note: "The visuals are just so interesting, they look so different from every other show. Also the story seems very interesting so far." },
          { name: "Gameoverse", image: "gameoverse.jpg", note: "The concept of worlds being destroyed when the hero beats the villain is so intriguing. It's like a metaphor for people abandoning games after finishing them." },
          { name: "Knights of Guinevere", image: "kg.jpg", note: "Boycot Disney! Let Dana Terrance shine without their restrictions." },
        ],
      },
    ],
  },
];

function renderInterests() {
  const grid = document.getElementById("interests-grid");
  if (!grid) return;

  grid.innerHTML = INTERESTS.map(
    (interest, i) => `
    <button type="button" class="skill-tile" data-index="${i}">
      <span class="skill-icon-fallback" style="font-size:32px">${interest.icon}</span>
      <span>${interest.name}</span>
    </button>`
  ).join("");

  grid.querySelectorAll(".skill-tile").forEach((tile) => {
    tile.addEventListener("click", () => openModal(INTERESTS[Number(tile.dataset.index)]));
  });
}

function openModal(interest) {
  const overlay = document.getElementById("interests-modal");
  const body = document.getElementById("interests-modal-body");
  body.innerHTML = `
    <h3>${interest.name}</h3>
    ${interest.groups
      .map(
        (group) => `
        ${group.title ? `<h4>${group.title}</h4>` : ""}
        <ul class="interest-list">
          ${group.items
            .map(
              (item, i) => `
            <li>
              <button type="button" class="interest-item" data-group="${group.title || ""}" data-item="${i}">
                ${item.image ? `<img class="interest-thumb" src="../assets/images/interests/${item.image}" alt="${item.name}" onerror="this.style.display='none'" />` : ""}
                ${item.name}
              </button>
              <p class="interest-note" hidden>${item.note.replace(/\n/g, "<br>")}</p>
            </li>`
            )
            .join("")}
        </ul>`
      )
      .join("")}
  `;
  overlay.classList.add("open");

  body.querySelectorAll(".interest-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const note = btn.nextElementSibling;
      note.hidden = !note.hidden;
    });
  });
}

function closeModal() {
  document.getElementById("interests-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderInterests();
  document.getElementById("interests-modal-close").addEventListener("click", closeModal);
  document.getElementById("interests-modal").addEventListener("click", (e) => {
    if (e.target.id === "interests-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

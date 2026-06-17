const DEVICON_BASE = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

const SKILLS = [
  {
    name: "HTML",
    icon: `${DEVICON_BASE}/html5/html5-original.svg`,
    description: "I use HTML to structure and mark up content for every website I build, from semantic layouts to accessible forms.",
  },
  {
    name: "CSS",
    icon: `${DEVICON_BASE}/css3/css3-original.svg`,
    description: "I style and lay out pages with CSS, including responsive design, flexbox/grid layouts, and animations.",
  },
  {
    name: "JavaScript",
    icon: `${DEVICON_BASE}/javascript/javascript-original.svg`,
    description: "I write JavaScript for interactive front-ends and to bring logic and behavior to the pages I build.",
  },
  {
    name: "Node.js",
    icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
    description: "I use Node.js to build backend services and APIs that power my full-stack projects.",
  },
  {
    name: "Java",
    icon: `${DEVICON_BASE}/java/java-original.svg`,
    description: "I just used it for the Minecraft mods.",
  },
  {
    name: "C++",
    icon: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
    description: "I use C++ for performance-oriented programming and lower-level projects.",
  },
  {
    name: "Python",
    icon: `${DEVICON_BASE}/python/python-original.svg`,
    description: "I write Python for scripting, automation, and general-purpose development.",
  },
  {
    name: "MySQL",
    icon: `${DEVICON_BASE}/mysql/mysql-original.svg`,
    description: "I design and query relational databases with MySQL for the backend of my full-stack projects.",
  },
  {
    name: "MariaDB",
    icon: `${DEVICON_BASE}/mariadb/mariadb-original.svg`,
    description: "I also work with MariaDB as a MySQL-compatible database for my backend projects.",
  },
  {
    name: "Godot",
    icon: `${DEVICON_BASE}/godot/godot-original.svg`,
    description: "I build 2D and 3D games in Godot using GDScript, from prototypes to small playable projects.",
  },
];

function iconMarkup(skill, size) {
  if (skill.icon) {
    return `<img src="${skill.icon}" alt="${skill.name} logo" width="${size}" height="${size}" />`;
  }
  return `<span class="skill-icon-fallback" style="font-size:${size * 0.5}px">${skill.fallback}</span>`;
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.innerHTML = SKILLS.map(
    (skill, i) => `
    <button type="button" class="skill-tile" data-index="${i}">
      ${iconMarkup(skill, 48)}
      <span>${skill.name}</span>
    </button>`
  ).join("");

  grid.querySelectorAll(".skill-tile").forEach((tile) => {
    tile.addEventListener("click", () => openModal(SKILLS[Number(tile.dataset.index)]));
  });
}

function openModal(skill) {
  const overlay = document.getElementById("skill-modal");
  const body = document.getElementById("skill-modal-body");
  body.innerHTML = `
    ${iconMarkup(skill, 64)}
    <h3>${skill.name}</h3>
    <p>${skill.description}</p>
  `;
  overlay.classList.add("open");
}

function closeModal() {
  document.getElementById("skill-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  document.getElementById("skill-modal-close").addEventListener("click", closeModal);
  document.getElementById("skill-modal").addEventListener("click", (e) => {
    if (e.target.id === "skill-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

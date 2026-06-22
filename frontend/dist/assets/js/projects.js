const GITHUB_USERNAME = "emilia-gomes2008";
const EXCLUDED_REPOS = new Set([`${GITHUB_USERNAME}.github.io`]);

// Add an entry here to override the description shown for a repo,
// using the repo's exact name as the key.
const DESCRIPTION_OVERRIDES = {
  "Fnafdle": "A browser-based guessing game collection set in the Five Nights at Freddy's universe. Inspired by Wordle, FNAFdle Reborn offers multiple game modes - from daily challenges to a fully simulated security office, a 2-player deduction battle, a Mario Party-style online board game and a TCG.",
  "fnaf-api": "A REST API with over 300 characters, over 40 books, and over 60 quotes from the Five Nights at Freddy's universe, hosted on Cloudflare Workers.",
  "chat": "A Youtube live chat overlay I made for a friend. He used it once.",
  "Fnaf-Jumpscares-VS-Code-Extension": "A VS Code extension that randomly scares you with Five Nights at Freddy's jumpscares while you program."
};

const PROJECTS_PER_PAGE = 4;
let allRepos = [];
let currentPage = 0;

function renderRepoCard(repo) {
  return `
        <div class="card project-card">
          <h3>${repo.name}</h3>
          <p>${escapeHtml(DESCRIPTION_OVERRIDES[repo.name] || repo.description || "No description provided.")}</p>
          <div class="repo-meta">
            ${repo.language ? `<span>🔵 ${escapeHtml(repo.language)}</span>` : ""}
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
          </div>
          <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        </div>`;
}

function renderPage() {
  const container = document.getElementById("projects-list");
  const pagination = document.getElementById("projects-pagination");
  const prevBtn = document.getElementById("projects-prev");
  const nextBtn = document.getElementById("projects-next");
  const indicator = document.getElementById("projects-page-indicator");
  if (!container) return;

  const totalPages = Math.ceil(allRepos.length / PROJECTS_PER_PAGE);
  const start = currentPage * PROJECTS_PER_PAGE;
  const pageRepos = allRepos.slice(start, start + PROJECTS_PER_PAGE);

  container.innerHTML = pageRepos.map(renderRepoCard).join("");

  if (totalPages > 1) {
    pagination.hidden = false;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    indicator.textContent = `${currentPage + 1} / ${totalPages}`;
  } else {
    pagination.hidden = true;
  }
}

async function loadProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    allRepos = (await res.json()).filter(
      (repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name)
    );

    if (allRepos.length === 0) {
      container.innerHTML = `<p class="state-msg">No public repositories yet — check back soon!</p>`;
      return;
    }

    currentPage = 0;
    renderPage();

    document.getElementById("projects-prev").addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        renderPage();
      }
    });

    document.getElementById("projects-next").addEventListener("click", () => {
      const totalPages = Math.ceil(allRepos.length / PROJECTS_PER_PAGE);
      if (currentPage < totalPages - 1) {
        currentPage++;
        renderPage();
      }
    });
  } catch (err) {
    container.innerHTML = `<p class="state-msg">Couldn't load projects right now. View them directly on <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>`;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadProjects();

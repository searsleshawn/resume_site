// js/app.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function notFound(route) {
  return `
    <section class="page">
      <h2 class="section-title">Not Found</h2>
      <p>Route <code>${escapeHtml(route)}</code> does not exist.</p>
      <p><a href="#/summary">Go to Summary Data</a></p>
    </section>
  `;
}

function errorPage(route, err) {
  return `
    <section class="page">
      <h2 class="section-title">Page Load Error</h2>
      <p>Failed to load <code>${escapeHtml(route)}</code>.</p>
      <pre style="white-space: pre-wrap;">${escapeHtml(String(err))}</pre>
      <p><a href="#/summary">Go to Summary Data</a></p>
    </section>
  `;
}

const ROUTES = {
  "": "summary",
  "summary": "summary",
  "cv": "cv",
  "mastery": "mastery",
  "communication": "communication",
  "inquiry": "inquiry",
  "print": "print"
};

// function wrapPrint(html) {
//   return `
//     <section class="page print-page">
//       ${html}
//       <p class="print-hint">Print this portfolio: File → Print (Ctrl/Cmd+P)</p>
//     </section>
//   `;
// }

function printButton() {
  const btn = document.getElementById("print-portfolio-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const previousHash = window.location.hash;

    window.location.hash = "#/print";

    setTimeout(() => {
      window.print();

      if (previousHash && previousHash !== "#/print") {
        window.location.hash = previousHash;
      }
    }, 500);
  });
}

async function router() {
  const app = document.getElementById("app");
  if (!app) return;

  const raw = window.location.hash.startsWith("#/")
    ? window.location.hash.slice(2)
    : "";

  const parts = raw.split("/").filter(Boolean);

  const isPrint = parts[0] === "print";
  const routeKey = isPrint ? "print" : (parts[0] || "summary");

  const normalized = ROUTES[routeKey];
  if (!normalized) {
    app.innerHTML = notFound(routeKey);
    return;
  }

  try {
    // Each page module is /js/<route>.js and exports render()
    const mod = await import(`./${normalized}.js`);
    if (typeof mod.render !== "function") {
      throw new Error(`./${normalized}.js must export: export function render() { ... }`);
    }

    const html = mod.render();
    app.innerHTML = html;
    /* VIEWER: run page initializer if it exists */
    if (typeof mod.init === "function") {
      mod.init();
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  } catch (err) {
    app.innerHTML = errorPage(normalized, err);
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  printButton();
  router();
});
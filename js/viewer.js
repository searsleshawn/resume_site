// js/viewer.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Render a tabbed file viewer
 *
 * cfg = {
 *   id: "unique-id",
 *   title: "Viewer Title",
 *   open: true|false,
 *   files: [
 *     { label: "file1.py", url: "/path/file1.py" }
 *   ]
 * }
 */
export function renderViewer(cfg) {
  const { id, title, files, open = false } = cfg;

  if (!id) throw new Error("renderViewer requires id");
  if (!files?.length) throw new Error("renderViewer requires files");

  const buttons = files.map((f, i) => `
    <button
      type="button"
      data-viewer="${escapeHtml(id)}"
      data-url="${escapeHtml(f.url)}"
      aria-pressed="${i === 0 ? "true" : "false"}"
      style="margin:.25rem .35rem .25rem 0;">
      ${escapeHtml(f.label)}
    </button>
  `).join("");

  return `
  <details ${open ? "open" : ""} data-viewer-root="${escapeHtml(id)}">

    <summary><strong>${escapeHtml(title)}</strong></summary>

    <p id="${escapeHtml(id)}-meta" style="margin-top:.5rem;"></p>

    <div>
      ${buttons}
    </div>

    <p style="margin:.5rem 0;">
      <button type="button" data-copy="${escapeHtml(id)}">Copy</button>
    </p>

    <pre><code id="${escapeHtml(id)}-view">Loading…</code></pre>

  </details>
  `;
}


/**
 * Initialize all viewers on the page
 */
export function initViewer(root = document) {
  async function loadFile(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    return await res.text();
  }

  function setActive(buttons, active) {
    buttons.forEach(btn =>
      btn.setAttribute("aria-pressed", btn === active ? "true" : "false")
    );
  }

  const viewers = Array.from(root.querySelectorAll("[data-viewer-root]"));

  viewers.forEach(viewer => {
    const id = viewer.dataset.viewerRoot;

    const buttons = Array.from(
      root.querySelectorAll(`button[data-viewer="${id}"]`)
    );

    const view = root.querySelector(`#${CSS.escape(id)}-view`);
    const meta = root.querySelector(`#${CSS.escape(id)}-meta`);
    const copyBtn = root.querySelector(`button[data-copy="${id}"]`);

    if (!buttons.length || !view) return;

    async function activate(btn) {
      const url = btn.dataset.url;

      setActive(buttons, btn);

      if (meta) meta.textContent = url.split("/").pop();

      view.textContent = "Loading…";

      try {
        view.textContent = await loadFile(url);
      } catch (e) {
        view.textContent = `Could not load file:\n${url}\n\n${String(e)}`;
      }
    }

    buttons.forEach(btn =>
      btn.addEventListener("click", () => activate(btn))
    );

    activate(buttons[0]);

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(view.textContent || "");
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 900);
        } catch {
          copyBtn.textContent = "Copy failed";
          setTimeout(() => (copyBtn.textContent = "Copy"), 900);
        }
      });
    }
  });
}
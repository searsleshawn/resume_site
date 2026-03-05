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
 *   files: [{ label: "file1.py", url: "/path/file1.py" }]
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
  <details ${open === true ? "open" : ""} data-viewer-root="${escapeHtml(id)}">

    <summary><strong>${escapeHtml(title)}</strong></summary>

    <p id="${escapeHtml(id)}-meta" style="margin-top:.5rem;"></p>

    <div>
      ${buttons}
    </div>

    <p style="margin:.5rem 0;">
      <button type="button" data-copy="${escapeHtml(id)}">Copy</button>
    </p>

    <div class="viewer-box">
        <div class="viewer-scroll">
            <pre class="viewer-pre"><code id="${escapeHtml(id)}-view">Loading…</code></pre>
        </div>
    </div>

  </details>
  `;
}

function viewerStyles() {
  if (document.getElementById("viewer-styles")) return;

  const style = document.createElement("style");
  style.id = "viewer-styles";
  style.textContent = `
    .viewer-box {
        width: 70vw;
        max-width: 100%;

        height: 600px;          /* fixed viewer height */
        overflow: auto;         /* scroll inside viewer */

        border: 1px solid rgba(255,255,255,.12);
        border-radius: 10px;
        background: rgba(0,0,0,.18);

        -webkit-overflow-scrolling: touch;
    }

    /* code formatting */
    .viewer-pre {
        margin: 0;
        padding: .75rem;

        white-space: pre;       /* preserve formatting */
        tab-size: 2;

        min-width: max-content; /* allows horizontal scroll */
    }

    .viewer-pre code {
        display: block;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Prevent scroll inside the viewer from scrolling the page.
 * Allows "handoff" to page scroll only when viewer is at its edges.
 */
function attachScrollCapture(box) {
  // Desktop (wheel/trackpad)
  box.addEventListener("wheel", (e) => {
    const delta = e.deltaY;

    const atTop = box.scrollTop <= 0;
    const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight;

    // If viewer can scroll in the wheel direction, consume the event
    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, { passive: false });

  // Touch (mobile/tablet)
  let startY = 0;

  box.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches.length === 1) startY = e.touches[0].clientY;
  }, { passive: true });

  box.addEventListener("touchmove", (e) => {
    if (!e.touches || e.touches.length !== 1) return;

    const currentY = e.touches[0].clientY;
    const delta = startY - currentY; // >0 means swipe up -> scroll down

    const atTop = box.scrollTop <= 0;
    const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight;

    // If viewer can scroll in the swipe direction, consume it
    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, { passive: false });
}

/**
 * Initialize all viewers on the page
 */
export function initViewer(root = document) {
  viewerStyles();

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

    // make viewer behave like its own scroll surface
    const box = viewer.querySelector(".viewer-scroll");
    if (box) attachScrollCapture(box);

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

    // Load first file immediately (keep as-is)
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
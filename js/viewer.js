// js/viewer.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFileType(file) {
  if (file.type) return file.type.toLowerCase();

  const url = file.url || "";
  const clean = url.split("?")[0].split("#")[0];
  const ext = clean.includes(".") ? clean.split(".").pop().toLowerCase() : "";

  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  if (["py", "js", "ts", "java", "c", "cpp", "cs", "rb", "go", "rs", "php", "html", "css", "sql", "xml", "yml", "yaml", "sh"].includes(ext)) return "code";
  if (["txt", "md", "json", "csv", "log"].includes(ext)) return "text";
  if (["xlsx", "xls"].includes(ext)) return "spreadsheet";

  return "unknown";
}

export function renderViewer(cfg) {
  const {
    id,
    title,
    files,
    open = false,
    controls = {}
  } = cfg;

  const {
    openInNewTab = false,
    copy = false,
    download = false
  } = controls;

  if (!id) throw new Error("renderViewer requires id");
  if (!files?.length) throw new Error("renderViewer requires files");

  const buttons = files.length > 1
    ? files.map((f, i) => `
      <button
        type="button"
        data-viewer="${escapeHtml(id)}"
        data-index="${i}"
        aria-pressed="${i === 0 ? "true" : "false"}"
        style="margin:.25rem .35rem .25rem 0;">
        ${escapeHtml(f.label)}
      </button>
    `).join("")
    : "";

  return `
    <details
      ${open ? "open" : ""}
      data-viewer-root="${escapeHtml(id)}">
      <summary><strong>${escapeHtml(title)}</strong></summary>

      <p id="${escapeHtml(id)}-meta" style="margin-top:.5rem;"></p>

      ${buttons ? `<div>${buttons}</div>` : ""}

      ${
        (openInNewTab || download || copy)
          ? `
            <p style="margin:.5rem 0;">
              ${openInNewTab ? `
                <a id="${escapeHtml(id)}-link" href="#" target="_blank" rel="noreferrer">Open in a new tab</a>
              ` : ""}
              ${download ? `
                <a id="${escapeHtml(id)}-download" href="#" download style="${openInNewTab ? "margin-left:.75rem;" : ""}">Download</a>
              ` : ""}
              ${copy ? `
                <button
                  type="button"
                  data-copy="${escapeHtml(id)}"
                  style="${(openInNewTab || download) ? "margin-left:.75rem;" : ""}">
                  Copy
                </button>
              ` : ""}
            </p>
          `
          : ""
      }

      <div class="viewer-frame" id="${escapeHtml(id)}-frame"></div>

      <script type="application/json" id="${escapeHtml(id)}-data">
${JSON.stringify(files).replace(/</g, "\\u003c")}
      </script>
    </details>
  `;
}

function viewerStyles() {
  if (document.getElementById("viewer-styles")) return;

  const style = document.createElement("style");
  style.id = "viewer-styles";
  style.textContent = `
    .viewer-box,
    .pdf-viewer,
    .image-viewer,
    .file-fallback {
      width: 100%;
      max-width: 100%;
      overflow: auto;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      background: rgba(0,0,0,.18);
      -webkit-overflow-scrolling: touch;
    }

    .viewer-box {
      width: 70vw;
      max-width: 100%;
      height: 600px;
      overflow: auto;
    }

    .viewer-scroll {
      min-width: 100%;
    }

    .viewer-pre {
      margin: 0;
      padding: .75rem;
      white-space: pre;
      tab-size: 2;
      min-width: max-content;
    }

    .viewer-pre code {
      display: block;
    }

    .pdf-viewer iframe {
      display: block;
      width: 100%;
      height: clamp(500px, 75vh, 950px);
      border: 0;
    }

    .image-viewer {
      padding: .75rem;
      text-align: center;
    }

    .image-viewer img {
      max-width: 100%;
      height: auto;
      display: inline-block;
      border-radius: 8px;
    }

    .file-fallback {
      padding: 1rem;
    }
  `;
  document.head.appendChild(style);
}

function attachScrollCapture(box) {
  box.addEventListener("wheel", (e) => {
    const delta = e.deltaY;

    const atTop = box.scrollTop <= 0;
    const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight;

    // Only trap wheel if the box can continue scrolling in that direction
    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
      e.stopPropagation();
      e.preventDefault();
      box.scrollTop += delta;
    }
  }, { passive: false });

  let startY = 0;

  box.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches.length === 1) {
      startY = e.touches[0].clientY;
    }
  }, { passive: true });

  box.addEventListener("touchmove", (e) => {
    if (!e.touches || e.touches.length !== 1) return;

    const currentY = e.touches[0].clientY;
    const delta = startY - currentY;

    const atTop = box.scrollTop <= 0;
    const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight;

    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
      e.stopPropagation();
      e.preventDefault();
      box.scrollTop += delta;
      startY = currentY;
    }
  }, { passive: false });
}

export function initViewer(root = document) {
  viewerStyles();

  async function loadText(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
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
    const buttons = Array.from(root.querySelectorAll(`button[data-viewer="${id}"]`));
    const meta = root.querySelector(`#${CSS.escape(id)}-meta`);
    const frame = root.querySelector(`#${CSS.escape(id)}-frame`);
    const link = root.querySelector(`#${CSS.escape(id)}-link`);
    const downloadLink = root.querySelector(`#${CSS.escape(id)}-download`);
    const copyBtn = root.querySelector(`button[data-copy="${id}"]`);
    const dataEl = root.querySelector(`#${CSS.escape(id)}-data`);

    if (!frame || !dataEl) return;

    let files = [];
    try {
      files = JSON.parse(dataEl.textContent);
    } catch {
      frame.innerHTML = `<div class="file-fallback">Could not load viewer data.</div>`;
      return;
    }

    let currentText = "";

    async function activate(index) {
      const file = files[index];
      if (!file) return;

      const type = getFileType(file);
      const filename = (file.url || "").split("/").pop() || file.label;

      if (buttons.length) {
        setActive(buttons, buttons[index]);
      }

      if (meta) meta.textContent = filename;
      if (link) link.href = file.url || "#";
      if (downloadLink) downloadLink.href = file.url || "#";

      currentText = "";

      if (type === "pdf") {
        frame.innerHTML = `
          <div class="pdf-viewer">
            <iframe
              title="${escapeHtml(file.label || filename)}"
              src="${escapeHtml(file.url)}#zoom=page-width"
              loading="lazy">
            </iframe>
          </div>
        `;
        return;
      }

      if (type === "image") {
        frame.innerHTML = `
          <div class="image-viewer">
            <a href="${escapeHtml(file.url)}" target="_blank" rel="noreferrer">
              <img
                src="${escapeHtml(file.url)}"
                alt="${escapeHtml(file.label || filename)}"
                loading="lazy"
              >
            </a>
            <p style="font-size:.85rem; opacity:.75; margin-top:.35rem;">
              Click image to view full resolution
            </p>
          </div>
        `;
        return;
      }

      if (type === "text" || type === "code") {
        frame.innerHTML = `
          <div class="viewer-box">
              <pre class="viewer-pre"><code>Loading…</code></pre>
            </div>
          </div>
        `;

        const box = frame.querySelector(".viewer-box");
        const code = frame.querySelector("code");
        if (box) attachScrollCapture(box);

        try {
          const text = await loadText(file.url);
          currentText = text;
          if (code) code.textContent = text;
        } catch (e) {
          const msg = `Could not load file:\n${file.url}\n\n${String(e)}`;
          currentText = msg;
          if (code) code.textContent = msg;
        }
        return;
      }

      if (type === "spreadsheet") {
        const base = file.url.replace(/\.(xlsx|xls)$/i, "");

        frame.innerHTML = `
          <div class="image-viewer">
            <a href="${escapeHtml(base)}.png" target="_blank" rel="noreferrer">
              <img src="${escapeHtml(base)}.png" alt="${escapeHtml(base)}">
            </a>

            <p style="margin-top:.75rem;">
              <a href="${escapeHtml(file.url)}" target="_blank" rel="noreferrer">
                Download Spreadsheet
              </a>
            </p>
          </div>
        `;
        return;
      }

      frame.innerHTML = `
        <div class="file-fallback">
          <p>Preview is not available for this file type.</p>
          <p><a href="${escapeHtml(file.url)}" target="_blank" rel="noreferrer">Open file</a></p>
        </div>
      `;
    }

    if (buttons.length) {
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const index = Number(btn.dataset.index);
          activate(index);
        });
      });
    }

    activate(0);

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        if (!currentText) {
          copyBtn.textContent = "Nothing to copy";
          setTimeout(() => (copyBtn.textContent = "Copy"), 900);
          return;
        }

        try {
          await navigator.clipboard.writeText(currentText);
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
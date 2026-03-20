// js/viewer.js

/**
 * Escape plain text for safe HTML insertion.
 * Use this when inserting labels, file names, and URLs into template strings.
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Infer a file type from either an explicit `file.type`
 * or the extension from `file.url`.
 */
function getFileType(file) {
  if (file.type) return file.type.toLowerCase();

  const url = file.url || "";
  const clean = url.split("?")[0].split("#")[0];
  const ext = clean.includes(".") ? clean.split(".").pop().toLowerCase() : "";

  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  if (ext === "md") return "markdown";
  if (ext === "html" || ext === "htm") return "html";
  if (["py", "js", "ts", "java", "c", "cpp", "cs", "rb", "go", "rs", "php", "css", "sql", "xml", "yml", "yaml", "sh"].includes(ext)) return "code";
  if (["txt", "json", "csv", "log"].includes(ext)) return "text";
  if (["xlsx", "xls"].includes(ext)) return "spreadsheet";

  return "unknown";
}

/**
 * Convert relative markdown image sources into paths relative to the markdown file.
 *
 * Example:
 *   README at: content/cloudArch/ca4/README-ca4.md
 *   Image in markdown: ![Architecture](ca4-architecture.png)
 *   Final image src:   content/cloudArch/ca4/ca4-architecture.png
 */
function fixMarkdownImages(container, fileUrl) {
  const base = fileUrl.substring(0, fileUrl.lastIndexOf("/"));

  container.querySelectorAll("img").forEach(img => {
    const src = img.getAttribute("src");
    if (!src) return;

    // Leave absolute, root-relative, and data URLs alone.
    if (
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("/") ||
      src.startsWith("data:")
    ) {
      return;
    }

    img.src = `${base}/${src}`;
  });
}

/**
 * Render a single tabbed viewer shell.
 * This only creates the HTML container. Actual loading happens in initViewer().
 */
export function renderViewer(cfg) {
  const {
    id,
    title,
    files,
    open = false,
    controls = {},
    print = null
  } = cfg;

  const {
    openInNewTab = false,
    copy = false,
    download = false
  } = controls;

  if (!id) throw new Error("renderViewer requires id");
  if (!files?.length) throw new Error("renderViewer requires files");

  const buttons = files.length > 1
    ? files.map((file, index) => `
      <button
        type="button"
        data-viewer="${escapeHtml(id)}"
        data-index="${index}"
        aria-pressed="${index === 0 ? "true" : "false"}"
        style="margin:.25rem .35rem .25rem 0;">
        ${escapeHtml(file.label)}
      </button>
    `).join("")
    : "";

  return `
    <details ${open ? "open" : ""} data-viewer-root="${escapeHtml(id)}">
      <summary><strong>${escapeHtml(title)}</strong></summary>

      <p id="${escapeHtml(id)}-meta" style="margin-top:.5rem;"></p>

      ${buttons ? `<div class="viewer-tabs">${buttons}</div>` : ""}

      ${
        (openInNewTab || download || copy)
          ? `
            <p class="viewer-controls" style="margin:.5rem 0;">
              ${openInNewTab ? `
                <a id="${escapeHtml(id)}-link" href="#" target="_blank" rel="noreferrer">
                  Open in a new tab
                </a>
              ` : ""}
              ${download ? `
                <a
                  id="${escapeHtml(id)}-download"
                  href="#"
                  download
                  style="${openInNewTab ? "margin-left:.75rem;" : ""}">
                  Download
                </a>
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
${JSON.stringify({ files, print }).replace(/</g, "\\u003c")}
      </script>
    </details>
  `;
}

/**
 * Convenience wrapper for pages that define a list of viewer-style deliverables.
 */
export function renderDeliverables(items, defaultOpen = false) {
  return items.map(item => {
    if (item.type !== "viewer") return "";

    return renderViewer({
      id: item.id,
      title: item.title,
      files: item.files,
      open: item.open ?? defaultOpen,
      controls: item.controls || {},
      print: item.print || null
    });
  }).join("");
}

/**
 * Inject viewer styles - MOVE into base.css remove this later
 */
function ensureViewerStyles() {
  return;
}

/**
 * Trap wheel / touch scrolling inside the viewer box so long documents
 * can scroll without constantly bubbling to the page.
 */
function attachScrollCapture(box) {
  box.addEventListener("wheel", (e) => {
    const delta = e.deltaY;
    const atTop = box.scrollTop <= 0;
    const atBottom = Math.ceil(box.scrollTop + box.clientHeight) >= box.scrollHeight;

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

/**
 * Load a plain text file from a URL.
 * Used for code, text, and markdown files.
 */
async function loadText(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.text();
}

/**
 * Build the small printable artifact summary used when a file should not
 * render inline during print.
 *
 * This summary is intentionally driven by the viewer-level `print` config
 * rather than per-file metadata, since the artifact itself owns the summary.
 */
function renderPrintSummary({ file, filename, artifactHref, printCfg }) {
  const title = printCfg?.title || file.label || filename;
  const description =
    printCfg?.description ||
    "This artifact is available in the digital portfolio.";
  const highlights = Array.isArray(printCfg?.highlights)
    ? printCfg.highlights
    : [];

  return `
    <div class="print-artifact-summary">
      <p><strong>Artifact:</strong> ${escapeHtml(title)}</p>
      <p>${escapeHtml(description)}</p>
      ${
        highlights.length
          ? `
            <ul>
              ${highlights.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          `
          : ""
      }
      <p class="print-artifact-note">
        Full artifact available digitally online at leshawn.searsconulting.org.
      </p>
    </div>
  `;
}

/**
 * Decide how a file should behave in print.
 *
 * Supported modes:
 * - "render"  => render inline in print
 * - "summary" => show summary block in print
 * - "hide"    => omit from print entirely
 *
 * If no explicit file.print.mode is provided, fall back to defaults by type.
 */
function getPrintMode(file, type) {
  const mode = file?.print?.mode;

  if (mode === "render" || mode === "summary" || mode === "hide") {
    return mode;
  }

  // Default behavior when no explicit print mode is provided.
  if (["pdf", "html", "spreadsheet", "unknown"].includes(type)) {
    return "summary";
  }

  return "render";
}

/**
 * Initialize every viewer inside the given root element.
 * Call this after the page HTML has been rendered into the DOM.
 */
export function initViewer(root = document) {
  ensureViewerStyles();
  const printMode = window.location.hash.startsWith("#/print");

  function setActive(buttons, activeButton) {
    buttons.forEach(btn => {
      btn.setAttribute("aria-pressed", btn === activeButton ? "true" : "false");
    });
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
    let viewerPrint = null;

    try {
      const parsed = JSON.parse(dataEl.textContent);
      files = Array.isArray(parsed?.files) ? parsed.files : [];
      viewerPrint = parsed?.print || null;
    } catch {
      frame.innerHTML = `<div class="file-fallback">Could not load viewer data.</div>`;
      return;
    }

    if (!files.length) {
      frame.innerHTML = `<div class="file-fallback">No files were provided for this artifact.</div>`;
      return;
    }

    if (printMode) {
      viewer.open = true;
    }

    let currentText = "";

    /**
     * Render one selected file into the viewer frame.
     */
    async function activate(index) {
      const file = files[index];
      if (!file) return;

      const type = getFileType(file);
      const filename = (file.url || "").split("/").pop() || file.label;
      const artifactHref = file.artifactUrl || file.url || "#";
      const printCfg = viewerPrint;

      if (buttons.length) {
        setActive(buttons, buttons[index]);
      }

      // Updated to use multiple files for single artifact.
      if (meta) {
        meta.textContent = (artifactHref.split("/").pop()) || file.label || "";
      }
      if (link) link.href = artifactHref;
      if (downloadLink) downloadLink.href = artifactHref;

      currentText = "";

      
      // render, print or hide artifact
      const filePrintMode = getPrintMode(file, type);
      if (printMode) {
        if (filePrintMode === "hide") {
          frame.innerHTML = "";
          return;
        }

        if (filePrintMode === "summary") {
          frame.innerHTML = renderPrintSummary({
            file,
            filename,
            artifactHref,
            printCfg
          });
          return;
        }
      }

      // PDF preview
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

      // HTML preview
      if (type === "html") {
        frame.innerHTML = `
          <div class="html-viewer">
            <iframe
              title="${escapeHtml(file.label || filename)}"
              src="${escapeHtml(file.url)}"
              loading="lazy">
            </iframe>
          </div>
        `;
        return;
      }

      // Image preview
      if (type === "image") {
        frame.innerHTML = `
          <div class="image-viewer">
            <a href="${escapeHtml(file.url)}" target="_blank" rel="noreferrer">
              <img
                src="${escapeHtml(file.url)}"
                alt="${escapeHtml(file.label || filename)}"
                loading="lazy">
            </a>
            <p style="font-size:.85rem; opacity:.75; margin-top:.35rem;">
              Click image to view full resolution
            </p>
          </div>
        `;
        return;
      }

      // Markdown preview
      if (type === "markdown") {
        frame.innerHTML = `
          <div class="viewer-box">
            <div class="markdown-viewer">Loading…</div>
          </div>
        `;

        const box = frame.querySelector(".viewer-box");
        const md = frame.querySelector(".markdown-viewer");
        if (box && !printMode) attachScrollCapture(box);

        try {
          const text = await loadText(file.url);
          currentText = text;

          if (typeof marked === "undefined") {
            md.textContent = "Markdown renderer not loaded.";
            return;
          }

          md.innerHTML = marked.parse(text);
          fixMarkdownImages(md, file.url);
        } catch (e) {
          const msg = `Could not load file:\n${file.url}\n\n${String(e)}`;
          currentText = msg;
          md.textContent = msg;
        }

        return;
      }

      // Plain text / source code preview
      if (type === "text" || type === "code") {
        frame.innerHTML = `
          <div class="viewer-box">
            <pre class="viewer-pre"><code>Loading…</code></pre>
          </div>
        `;

        const box = frame.querySelector(".viewer-box");
        const code = frame.querySelector("code");
        if (box && !printMode) attachScrollCapture(box);

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

      // Spreadsheet preview: show PNG fallback + download link
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

      // Unknown fallback
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
          setTimeout(() => { copyBtn.textContent = "Copy"; }, 900);
          return;
        }

        try {
          await navigator.clipboard.writeText(currentText);
          copyBtn.textContent = "Copied!";
          setTimeout(() => { copyBtn.textContent = "Copy"; }, 900);
        } catch {
          copyBtn.textContent = "Copy failed";
          setTimeout(() => { copyBtn.textContent = "Copy"; }, 900);
        }
      });
    }
  });
}
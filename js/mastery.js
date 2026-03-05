// js/mastery.js
import { renderViewer, initViewer } from "./viewer.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- BMC artifact paths ---
const BMC_BASE = "content/artifacts/bmc";
const BMC_PDF = `${BMC_BASE}/bmc-report.pdf`;

// --- Viewers (real files, no rewriting) ---
const codeViewer = renderViewer({
  id: "bmc-code",
  title: "Model Source Code",
  files: [
    { label: "bmc.py", url: `${BMC_BASE}/bmc.py` },
    { label: "solver.py", url: `${BMC_BASE}/solver.py` },
    { label: "model.py", url: `${BMC_BASE}/model.py` },
    { label: "main.py", url: `${BMC_BASE}/main.py` }
  ]
});

const modelViewer = renderViewer({
  id: "bmc-models",
  title: "Model Inputs",
  files: [
    { label: "cyclicerror.json", url: `${BMC_BASE}/cyclicerror.json` },
    { label: "deadend.json", url: `${BMC_BASE}/deadend.json` },
    { label: "deepchain.json", url: `${BMC_BASE}/deepchain.json` },
    { label: "nondeterministic.json", url: `${BMC_BASE}/nondeterministic.json` },
    { label: "toggle.json", url: `${BMC_BASE}/toggle.json` },
    { label: "trafficlight.json", url: `${BMC_BASE}/trafficlight.json` },
    { label: "unreachable.json", url: `${BMC_BASE}/unreachable.json` },
  ]
});

const masteryData = {
  intro: [
    "This section demonstrates my knowledge and mastery of computer science concepts through advanced problem solving and substantial contributions to software artifacts."
  ],

  // Artifact A: Bounded Model Checker
  advancedProblemArtifact: {
    title: "Artifact A: Bounded Model Checker ✅",
    course: "CS 6315-50 — Automated Verification (Fall 2025)",
    problemStatement: `
      Modern software systems are often modeled as finite-state transition systems where
      correctness properties must hold across all possible executions. Exhaustively exploring
      every possible state quickly becomes computationally infeasible due to state-space
      explosion. Bounded Model Checking (BMC) addresses this challenge by analyzing system
      behavior up to a fixed execution depth using SAT/SMT solving techniques. The problem
      addressed in this project was to design and implement a lightweight BMC tool capable
      of determining whether a target state or safety violation can occur within a bounded
      number of execution steps.`,
    whatIDid: [
      "Designed a lightweight bounded model checker capable of analyzing finite-state transition systems specified in JSON.",
      "Implemented symbolic encodings of system states and transitions using Boolean variables across bounded execution steps.",
      "Integrated the Z3 SMT solver to determine satisfiability of reachability and safety queries.",
      "Implemented counterexample trace extraction to produce concrete execution paths when violations are detected.",
      "Developed multiple model examples to evaluate edge cases including nondeterministic branching, cycles, dead-end states, and deep execution chains."
    ],
    concepts: [
      "Bounded Model Checking and symbolic verification techniques.",
      "SAT/SMT solving using the Z3 theorem prover.",
      "Symbolic encoding of transition systems using Boolean variables.",
      "Finite-state system modeling and execution trace analysis.",
      "Constraint solving and satisfiability checking for reachability and safety properties."
    ],
    evidence: [
        "Execution traces demonstrating reachable target states and counterexample paths.",
        "Example transition systems including cyclic error propagation, dead-end states, and deep execution chains.",
        "Visualization of state-transition graphs and solver results.",
        "SAT/UNSAT outputs produced by the solver validating reachability and safety queries."

    ],
    links: [
      // Optional public links later (must be public if used)
      // { label: "GitHub Repository", url: "https://..." }
    ]
  },

  // Artifact B: Field Service Management System Design
  softwareArtifact: {
    title: "Artifact B: Field Service Management System Design 🚧",
    artifactType: "TBD (Design doc / documentation / code excerpt)",
    summary: "TBD: 3–6 sentences summarizing the software artifact and why it is significant.",
    myContribution: [
      "TBD: Clear bullet list describing what I built/owned."
    ],
    engineeringHighlights: [
      "TBD: architecture, testing, performance, scalability, security, etc."
    ],
    evidence: [
      "TBD: code excerpts, design diagrams, test results, screenshots."
    ],
    links: [
      // Optional public links later
    ]
  }
};

export function render() {
  const a = masteryData.advancedProblemArtifact;
  const b = masteryData.softwareArtifact;

  return `
    <section class="page">
      <h2 class="section-title">3. Knowledge & Mastery of Computer Science Concepts</h2>

      ${masteryData.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <hr />

      <h3>${escapeHtml(a.title)}</h3>
      <p><strong>Course:</strong> ${escapeHtml(a.course)}</p>

      <h4>Problem Statement</h4>
      <p>${escapeHtml(a.problemStatement)}</p>

      <h4>What I Did</h4>
      <ul>${a.whatIDid.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Computer Science Concepts Demonstrated</h4>
      <ul>${a.concepts.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Evidence</h4>

      <details open>
        <summary><strong>Bounded Model Checker Report </strong></summary>
        <p><a href="${escapeHtml(BMC_PDF)}" target="_blank" rel="noreferrer">Open report in a new tab</a></p>
        <iframe
          src="${escapeHtml(BMC_PDF)}#zoom=page-width"
          title="Bounded Model Checker Report"
          width="250%"
          height="1000"
          loading="lazy"
          style="border:1px solid rgba(255,255,255,.12); border-radius:10px;">
        </iframe>
      </details>

      ${codeViewer}
      ${modelViewer}

      ${a.links.length ? `
        <h4>Supplemental Public Links</h4>
        <ul>
          ${a.links.map(l => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`).join("")}
        </ul>
      ` : ""}

      <hr />

      <h3>${escapeHtml(b.title)}</h3>
      <p><strong>Artifact Type:</strong> ${escapeHtml(b.artifactType)}</p>

      <h4>Summary</h4>
      <p>${escapeHtml(b.summary)}</p>

      <h4>My Contribution</h4>
      <ul>${b.myContribution.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Engineering Highlights</h4>
      <ul>${b.engineeringHighlights.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Evidence to Include in PDF</h4>
      <ul>${b.evidence.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      ${b.links.length ? `
        <h4>Supplemental Public Links</h4>
        <ul>
          ${b.links.map(l => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}

export function init() {
  const app = document.getElementById("app");
  initViewer(app);
}
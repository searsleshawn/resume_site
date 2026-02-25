// js/mastery.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const masteryData = {
  intro: [
    "This section demonstrates my knowledge and mastery of computer science concepts through advanced problem solving and substantial contributions to software artifacts."
  ],

  // Requirement A: apply concepts to solve advanced problems (1 artifact required)
  advancedProblemArtifact: {
    title: "Artifact A: Advanced Problem Solving (TBD)",
    course: "TBD (Course / Semester)",
    problemStatement: "TBD: 3–6 sentences describing the problem being solved.",
    whatIDid: [
      "TBD: What I implemented / designed / proved / evaluated."
    ],
    concepts: [
      "TBD: key CS concepts applied (e.g., algorithms, distributed systems, ML, verification)."
    ],
    evidence: [
      "TBD: include excerpted code, figures, or results in the PDF version."
    ],
    links: [
      // Optional public links later (must be public if used)
      // { label: "GitHub Repository", url: "https://..." }
    ]
  },

  // Requirement B: contribute substantially to significant software artifacts (1 artifact required)
  softwareArtifact: {
    title: "Artifact B: Significant Software Contribution (TBD)",
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

      <h4>Evidence to Include in PDF</h4>
      <ul>${a.evidence.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

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
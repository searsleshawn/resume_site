// js/communication.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const communicationData = {
  intro: [
    "This section demonstrates my ability to communicate computer science concepts in an effective professional manner through written and/or oral technical communication."
  ],

  // 1 artifact required (project report or presentation)
  artifact: {
    title: "Artifact: Technical Communication (TBD)",
    type: "TBD (Written Report / Presentation / Publication)",
    context: "TBD (Course / Project / Conference / Semester)",
    purpose: "TBD: 2–4 sentences describing the audience and communication goal.",
    myContribution: "TBD: 1–3 sentences explaining my role and what I personally authored/presented.",
    keyTopics: [
      "TBD: Topic 1 (e.g., system architecture, ML evaluation, security findings)",
      "TBD: Topic 2",
      "TBD: Topic 3"
    ],
    communicationStrengths: [
      "TBD: Clear explanation of problem statement and constraints.",
      "TBD: Effective use of figures/tables/code excerpts.",
      "TBD: Organized structure and professional tone."
    ],
    evidence: [
      "TBD: Include excerpted pages/slides in the PDF.",
      "TBD: Include a brief narrative that explains what the artifact shows."
    ],
    links: [
      // Optional public links later (must be public if used)
      // { label: "Public Slides", url: "https://..." }
    ]
  }
};

export function render() {
  const a = communicationData.artifact;

  return `
    <section class="page">
      <h2 class="section-title">4. Communication Skills in Computer Science</h2>

      ${communicationData.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <hr />

      <h3>${escapeHtml(a.title)}</h3>
      <p><strong>Artifact Type:</strong> ${escapeHtml(a.type)}</p>
      <p><strong>Context:</strong> ${escapeHtml(a.context)}</p>

      <h4>Purpose & Audience</h4>
      <p>${escapeHtml(a.purpose)}</p>

      <h4>My Contribution</h4>
      <p>${escapeHtml(a.myContribution)}</p>

      <h4>Key Topics Communicated</h4>
      <ul>${a.keyTopics.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Communication Strengths Demonstrated</h4>
      <ul>${a.communicationStrengths.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Evidence to Include in PDF</h4>
      <ul>${a.evidence.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      ${a.links.length ? `
        <h4>Supplemental Public Links</h4>
        <ul>
          ${a.links.map(l => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}
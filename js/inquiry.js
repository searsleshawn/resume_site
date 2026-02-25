// js/inquiry.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const inquiryData = {
  intro: [
    "This section demonstrates my ability to conduct independent inquiry in computer science, including defining a problem, selecting an appropriate methodology, performing the investigation, and documenting outcomes and conclusions."
  ],

  // 1 artifact required (must include problem statement, design/research methodology, reports, software artifacts)
  artifact: {
    title: "Artifact: Independent Inquiry (TBD)",
    context: "TBD (Course / Independent Study / Research Project / Semester)",

    problemStatement: "TBD: 3–6 sentences describing the research question or technical problem and why it matters.",

    methodology: [
      "TBD: Research/design methodology step 1 (e.g., data collection, modeling, evaluation plan).",
      "TBD: Methodology step 2 (e.g., experiment setup, tools used, baselines).",
      "TBD: Methodology step 3 (e.g., analysis approach, validation, limitations)."
    ],

    workPerformed: [
      "TBD: Work performed item 1 (what you actually did during the inquiry).",
      "TBD: Work performed item 2.",
      "TBD: Work performed item 3."
    ],

    outcomes: [
      "TBD: Outcome/result 1 (key finding).",
      "TBD: Outcome/result 2.",
      "TBD: Outcome/result 3."
    ],

    conclusions: [
      "TBD: Conclusion 1 (what the results imply).",
      "TBD: Conclusion 2 (limitations and next steps)."
    ],

    requiredComponentsChecklist: [
      "Problem statement included.",
      "Design and research methodology included.",
      "Project report(s) included.",
      "Software artifacts included (code excerpts, design docs, diagrams, test results)."
    ],

    evidence: [
      "TBD: Include excerpted report pages in the PDF.",
      "TBD: Include code excerpts or figures in the PDF.",
      "TBD: Include a short narrative explaining what each excerpt demonstrates."
    ],

    links: [
      // Optional public links later (must be public if used)
      // { label: "Public Repository", url: "https://..." }
    ]
  }
};

export function render() {
  const a = inquiryData.artifact;

  return `
    <section class="page">
      <h2 class="section-title">5. Conduct Independent Inquiry in Computer Science</h2>

      ${inquiryData.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <hr />

      <h3>${escapeHtml(a.title)}</h3>
      <p><strong>Context:</strong> ${escapeHtml(a.context)}</p>

      <h4>Problem Statement</h4>
      <p>${escapeHtml(a.problemStatement)}</p>

      <h4>Methodology</h4>
      <ol>${a.methodology.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ol>

      <h4>Work Performed</h4>
      <ul>${a.workPerformed.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Outcomes</h4>
      <ul>${a.outcomes.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Conclusions</h4>
      <ul>${a.conclusions.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Required Components Checklist</h4>
      <ul>${a.requiredComponentsChecklist.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

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
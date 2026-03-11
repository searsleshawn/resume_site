// js/communication.js
import { renderViewer, initViewer, renderDeliverables } from "./viewer.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const CLOUD_ARCH_BASE = "/content/artifacts/cloudArch";

const communicationData = {
  intro: [
    "This section demonstrates my ability to communicate complex computer science concepts through formal technical writing, architecture diagrams, deployment documentation, and oral presentation. The selected artifact comes from my cloud architecture project sequence, where I documented the evolution of a distributed event-processing system from manual deployment to a secure multi-hybrid edge-to-cloud architecture."
  ],

  // 1 artifact required (project report or presentation)
  artifact: {
    title: "Artifact: Cloud Architecture Documentation and Presentation",
    type: "Technical Documentation, Architecture Diagrams, and Oral Presentation",
    context: "CS 5288 / Cloud Architecture Project Sequence (CA0–CA4)",

    purpose: "This artifact was created to communicate the design, implementation, and evolution of a distributed cloud-based event-processing pipeline. The intended audience included the course instructor and technically informed reviewers who needed to understand the architecture, deployment strategy, security controls, observability design, and resilience decisions. The final stage also required a formal presentation and interview-style explanation of the completed architecture and its engineering tradeoffs.",

    myContribution: "I authored and organized the technical documentation, architecture explanations, deployment narratives, and visual system diagrams across the CA0–CA4 sequence. I also presented and explained the final architecture during the concluding project interview, where I discussed system design decisions, site responsibilities, secure communication paths, and the progression from earlier project stages.",

    keyTopics: [
      "Distributed event-processing architecture",
      "Infrastructure as Code and deployment automation",
      "Docker Swarm orchestration and service placement",
      "Observability, logging, and production operations",
      "Secure hybrid edge-to-cloud connectivity",
      "System evolution across multiple architectural stages"
    ],

    communicationStrengths: [
      "Clear written explanation of complex distributed system behavior.",
      "Strong use of diagrams to communicate topology, service roles, and system evolution.",
      "Professional documentation of deployment steps, validation, recovery procedures, and operational workflows.",
      "Ability to explain technical tradeoffs such as tunneling, restricted ingress, and service isolation.",
      "Effective oral communication demonstrated through final presentation and project interview."
    ],

    // evidence: [
    //   "CA4 README documenting the final multi-hybrid edge-to-cloud architecture, bastion-based SSH tunneling model, deployment strategy, observability, and resilience workflow.",
    //   "CA3 README showing production-style observability, scaling, security hardening, and resilience documentation.",
    //   "CA2 README demonstrating declarative orchestration, automation flow, validation evidence, and structured technical reporting.",
    //   "CA1 and CA0 documentation showing early-stage infrastructure explanation and the progression toward a more mature architecture.",
    //   "Architecture diagrams illustrating both the final CA4 topology and the CA0–CA4 architectural evolution."
    // ],

    deliverables: [
      {
        id: "cloudarch-final-docs",
        title: "Architecture Documentation",
        type: "viewer",
        open: true,
        controls: {
          openInNewTab: false,
          copy: true,
          download: true
        },
        files: [
          { label: "CA4", url: `${CLOUD_ARCH_BASE}/ca4/README-ca4.md` },
          { label: "CA3", url: `${CLOUD_ARCH_BASE}/ca3/README-ca3.md` },
          { label: "CA2", url: `${CLOUD_ARCH_BASE}/ca2/README-ca2.md` },
          { label: "CA1", url: `${CLOUD_ARCH_BASE}/ca1/README-ca1.md` },
          { label: "CA0", url: `${CLOUD_ARCH_BASE}/ca0/README-ca0.md` }
        ]
      },
      // {
      //   id: "cloudarch-diagrams",
      //   title: "Architecture Diagrams",
      //   type: "viewer",
      //   open: false,
      //   controls: {
      //     openInNewTab: true,
      //     download: true
      //   },
      //   files: [
      //     { label: "ca4-architecture.png", url: `${CLOUD_ARCH_BASE}/ca4/ca4-diagram.png` },
      //   ]
      // }
    ],
    links: [
      // Optional public links later (must be public if used)
      // { label: "Public Slides", url: "https://..." }
    ]
  }
};

export function init() {
  const app = document.getElementById("app");
  initViewer(app);
}

export function render() {
  const a = communicationData.artifact;

  return `
    <section class="page">
      <h2 class="section-title">4. Communication Skills in Computer Science ✅</h2>

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


      <h4>Deliverables</h4>
      ${renderDeliverables(a.deliverables, false)}

      ${a.links.length ? `
        <h4>Supplemental Public Links</h4>
        <ul>
          ${a.links.map(l => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noreferrer">${escapeHtml(l.label)}</a></li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}


      // <h4>Evidence to Include in PDF</h4>
      // <ul>${a.evidence.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
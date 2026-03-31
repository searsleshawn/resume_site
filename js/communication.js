// js/communication.js
import { initViewer, renderDeliverables } from "./viewer.js";

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
    "This section demonstrates my ability to communicate complex distributed systems design through architecture documentation, deployment documentation, and technical explanation of engineering decisions. The selected artifact documents the design and evolution of a distributed transaction-processing pipeline developed through a multi-stage cloud architecture project sequence.",
    "Across CA0-CA4, I designed and documented the progression of the system from a manually deployed AWS architecture to a fully automated hybrid edge-to-cloud infrastructure using Terraform, Ansible, and Docker Swarm. Each stage required clear documentation of architecture decisions, deployment processes, security controls, observability strategy, and reliability improvements."
  ],

  // 1 artifact required (project report or presentation)
  artifact: {
    title: "Cloud Architecture Design Documentation and Technical Presentation",
    context: "CS 5288 - Cloud Architecture Project Sequence (CA0-CA4)",

    purpose: [
      "This artifact documents the design and evolution of a distributed event-processing architecture created to simulate financial transaction processing across multiple services. The documentation explains how infrastructure automation, container orchestration, security controls, and observability were progressively introduced to improve reliability, deployment consistency, and operational maturity.",
      "The documentation and presentations were created for multiple technical audiences including peers during live architecture discussions, peer design reviews, and formal evaluation by the course instructor. These discussions required clearly explaining architecture decisions, deployment approaches, service communication patterns, and the engineering tradeoffs involved as the system evolved from a basic deployment into a more production-style distributed architecture."
    ],

    myContribution: {
      intro: "I designed the distributed system architecture and authored the technical documentation describing its evolution across five architectural stages. This included:",

      list: [
        "Designing the initial AWS deployment of Kafka, MongoDB, and processing services",
        "Implementing Infrastructure-as-Code using Terraform",
        "Automating configuration and deployment workflows using Ansible",
        "Designing Docker Swarm orchestration for containerized services",
        "Implementing observability using Prometheus, Grafana, and Loki",
        "Designing resilience features including auto-restart and failure recovery",
        "Designing a hybrid edge-to-cloud architecture using secure bastion tunneling",
        "Creating architecture diagrams documenting system evolution"
      ],

      outro: "I also presented the final architecture, explaining infrastructure decisions, security design, deployment strategies, and how each architectural stage improved system reliability and maintainability.",
    },
    keyTopics: [
      "Distributed event-processing architecture",
      "Infrastructure as Code using Terraform and Ansible",
      "Docker Swarm orchestration and service placement",
      "Secure service networking and isolation",
      "Observability, logging, and production operations",
      "Resilience engineering and failure recovery design",
      "Hybrid edge-to-cloud connectivity",
      "System evolution across multiple architectural stages"
    ],

    communicationStrengths: [
      "Clear technical documentation of complex distributed architectures",
      "Ability to explain infrastructure automation workflows",
      "Effective use of diagrams to communicate system topology and evolution",
      "Ability to communicate engineering tradeoffs and design decisions",
      "Professional documentation of deployment procedures and operational workflows",
      "Ability to present complex infrastructure systems to a technical audience"
    ],
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
          { label: "CA0", url: `${CLOUD_ARCH_BASE}/ca0/README-ca0.md` },
          { label: "CA1", url: `${CLOUD_ARCH_BASE}/ca1/README-ca1.md` },
          { label: "CA2", url: `${CLOUD_ARCH_BASE}/ca2/README-ca2.md` },
          { label: "CA3", url: `${CLOUD_ARCH_BASE}/ca3/README-ca3.md` },
          { label: "CA4", url: `${CLOUD_ARCH_BASE}/ca4/README-ca4.md` }
        ]
      },
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
      <h2 class="section-title">4. Communication Skills in Computer Science</h2>

      ${communicationData.intro.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <hr />

      <h3>${escapeHtml(a.title)}</h3>
      <p><strong>Context:</strong> ${escapeHtml(a.context)}</p>

      <h4>Purpose & Audience</h4>
      ${a.purpose.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <h4>My Contribution</h4>

      <p>${escapeHtml(a.myContribution.intro)}</p>

      <ul>
      ${a.myContribution.list.map(b => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>

      <p>${escapeHtml(a.myContribution.outro)}</p>

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
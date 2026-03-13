// js/mastery.js
import { initViewer, renderDeliverables } from "./viewer.js";

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

// --- FSM artifact paths ---
const FSM_BASE = "content/artifacts/FSM";

const masteryData = {
  intro: [
    "This section demonstrates my knowledge and mastery of computer science concepts through advanced problem solving and substantial contributions to software artifacts."
  ],

  advancedProblemArtifact: {
    title: "Bounded Model Checker ✅",
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
    deliverables: [
      {
        id: "bmc-report",
        title: "Final Report",
        type: "viewer",
        open: true,
        controls: {
          openInNewTab: true,
          download: true
        },
        files: [
          { label: "bmc-report.pdf", url: BMC_PDF }
        ]
      },
      {
        id: "bmc-code",
        title: "Model Source Code",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: false,
          copy: true
        },
        files: [
          { label: "bmc.py", url: `${BMC_BASE}/bmc.py` },
          { label: "solver.py", url: `${BMC_BASE}/solver.py` },
          { label: "model.py", url: `${BMC_BASE}/model.py` },
          { label: "main.py", url: `${BMC_BASE}/main.py` }
        ]
      },
      {
        id: "bmc-models",
        title: "Model Inputs",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: false,
          copy: true
        },
        files: [
          { label: "cyclicerror.json", url: `${BMC_BASE}/cyclicerror.json` },
          { label: "deadend.json", url: `${BMC_BASE}/deadend.json` },
          { label: "deepchain.json", url: `${BMC_BASE}/deepchain.json` },
          { label: "nondeterministic.json", url: `${BMC_BASE}/nondeterministic.json` },
          { label: "toggle.json", url: `${BMC_BASE}/toggle.json` },
          { label: "trafficlight.json", url: `${BMC_BASE}/trafficlight.json` },
          { label: "unreachable.json", url: `${BMC_BASE}/unreachable.json` }
        ]
      }
    ],
    links: []
  },

  softwareArtifact: {
    title: "Field Service Management System Design ✅",
    artifactType: "Systems Engineering Design Documentation",

    summary: "This artifact presents the full systems engineering design for a Field Service Management (FSM) software platform intended to support organizations managing distributed field technicians. The project demonstrates the complete lifecycle of a software system including requirements engineering, architecture design, security planning, testing strategy, and deployment planning. The system focuses on improving operational efficiency through automated scheduling, real-time technician tracking, equipment management, and integration with enterprise systems such as CRM and ERP platforms. The documentation illustrates how complex software systems are designed using structured engineering practices, traceability, and security-focused architecture.",

    myContribution: [
      "Designed the full system architecture and system engineering documentation for a Field Service Management platform.",
      "Developed requirements specifications and traceability mappings linking stakeholder requirements to system functionality.",
      "Produced UML and SysML design artifacts including activity diagrams, class diagrams, and component diagrams.",
      "Designed security architecture including encryption strategies, authentication mechanisms, and secure API communication.",
      "Developed system testing strategy including unit, integration, system, and user acceptance testing.",
      "Created integration and deployment plans for enterprise environments including external system integrations."
    ],

    engineeringHighlights: [
      "Full systems engineering lifecycle including requirements, design, testing, and deployment planning.",
      "Architecture modeling using UML and SysML diagrams.",
      "Traceability matrix linking requirements to system design and validation.",
      "Security-first design incorporating encryption, RBAC, secure APIs, and compliance considerations.",
      "Integration architecture supporting CRM, ERP, and external service APIs.",
      "Testing strategy including unit testing, integration testing, system testing, and user acceptance testing.",
      "Deployment planning and operational considerations for enterprise environments."
    ],

    deliverables: [
      {
        id: "fsm-security-planning",
        title: "Security Planning",
        type: "viewer",
        open: true,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "Concept of Operations (CONOPS / OPSCON)", url: `${FSM_BASE}/Security Planning/Field Service Management Software - CONOPS_OPSCON.pdf` },
          { label: "Systems Engineering Management Plan (SEMP)", url: `${FSM_BASE}/Security Planning/Field Service Management Software - SEMP.pdf` },
        ]
      },
      {
        id: "fsm-engineering-requirements",
        title: "Engineering Requirements",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "System Requirements Document (SRD)", url: `${FSM_BASE}/Engineering Requirements/System Requirements Document (SRD).pdf` },
          { label: "FSM - Traceability Matrix", url: `${FSM_BASE}/Engineering Requirements/FSM - Traceability Matrix.xlsx` }
        ]
      },
      {
        id: "fsm-system-design",
        title: "System Design",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "System Design Document", url: `${FSM_BASE}/System Design/System Design.pdf` },
          { label: "Activity Diagram", url: `${FSM_BASE}/System Design/Activity Diagram.png` },
          { label: "Class Diagram", url: `${FSM_BASE}/System Design/Class Diagram.png` },
          { label: "Component Diagram", url: `${FSM_BASE}/System Design/Component Diagram.png` },
          { label: "SysML BDD", url: `${FSM_BASE}/System Design/SysML-BDD.png` },
          { label: "SysML IBD", url: `${FSM_BASE}/System Design/SysML-IBD.png` },
          { label: "Use Case Diagram", url: `${FSM_BASE}/System Design/Use Case Diagram.png` }
        ]
      },
      {
        id: "fsm-testing-strategy",
        title: "Testing Strategy",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "Testing Plan.pdf", url: `${FSM_BASE}/Testing Plan.pdf` }
        ]
      },
      {
        id: "fsm-cryptography",
        title: "Cryptographic Architecture",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "Cryptographic Architecture", url: `${FSM_BASE}/Cryptography.pdf` }
        ]
      },
      {
        id: "fsm-integration-deployment",
        title: "Integration and Deployment",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true
        },
        files: [
          { label: "Integration and Deployment Plan.pdf", url: `${FSM_BASE}/Integration and Deployment Plan.pdf` }
        ]
      }
    ],
    links: []
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

      <h4>Summary</h4>
      <p>${escapeHtml(a.problemStatement)}</p>

      <h4>My Contribution</h4>
      <ul>${a.whatIDid.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Computer Science Concepts Demonstrated</h4>
      <ul>${a.concepts.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Deliverables</h4>
      ${renderDeliverables(a.deliverables, false)}

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

      <h4>Deliverables</h4>
      ${renderDeliverables(b.deliverables, false)}

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
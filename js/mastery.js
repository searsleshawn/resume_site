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

// --- FSM artifact paths ---
const FSM_BASE = "content/artifacts/FSM";

const masteryData = {
  intro: [
    "This section demonstrates my knowledge and mastery of computer science concepts through advanced problem solving and substantial contributions to software artifacts."
  ],

  advancedProblemArtifact: {
    title: "Bounded Model Checker",
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
          { label: "Bounded Model Checker", url: `${BMC_BASE}/bmc-report.html`, artifactUrl: `${BMC_BASE}/bmc-report.pdf`, print: {mode: "summary"}  }
        ],
        print: {
          title: "Bounded Model Checker Final Report",
          description: "This report documents the design and evaluation of a lightweight bounded model checker for finite-state transition systems. It explains the problem formulation, symbolic encoding strategy, solver integration, and interpretation of verification results.",
          highlights: [
            "Defined bounded reachability and safety checking for finite-state models",
            "Documented symbolic state and transition encodings using Boolean constraints",
            "Explained how Z3 was used to detect satisfiable error traces",
            "Presented evaluation across multiple system behaviors and edge cases"
          ]
        }
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
          { label: "bmc.py", url: `${BMC_BASE}/bmc.py`, print: {mode: "summary"} },
          { label: "solver.py", url: `${BMC_BASE}/solver.py`, print: {mode: "hide"} },
          { label: "model.py", url: `${BMC_BASE}/model.py`, print: {mode: "hide"} },
          { label: "main.py", url: `${BMC_BASE}/main.py`, print: {mode: "hide"} }
        ],
        print: {
          title: "Bounded Model Checker Implementation",
          description: "This artifact contains the Python implementation of the bounded model checker, including model parsing, bounded symbolic encoding, SMT query construction, and counterexample extraction.",
          highlights: [
            "Separated system modeling, solver interaction, and execution control into modular components",
            "Encoded bounded execution paths for satisfiability checking",
            "Integrated solver results with trace reconstruction for debugging and analysis"
          ]
        }
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
          { label: "cyclicerror.json", url: `${BMC_BASE}/cyclicerror.json`, print: {mode: "summary"} },
          { label: "deadend.json", url: `${BMC_BASE}/deadend.json`, print: {mode: "hide"} },
          { label: "deepchain.json", url: `${BMC_BASE}/deepchain.json`, print: {mode: "hide"} },
          { label: "nondeterministic.json", url: `${BMC_BASE}/nondeterministic.json`, print: {mode: "hide"} },
          { label: "toggle.json", url: `${BMC_BASE}/toggle.json`, print: {mode: "hide"} },
          { label: "trafficlight.json", url: `${BMC_BASE}/trafficlight.json`, print: {mode: "hide"} },
          { label: "unreachable.json", url: `${BMC_BASE}/unreachable.json`, print: {mode: "hide"} }
        ],
        print: {
          title: "Bounded Model Checker Test Models",
          description: "This artifact contains multiple JSON-defined transition systems used to validate the bounded model checker against representative verification scenarios.",
          highlights: [
            "Included cyclic, dead-end, deep-chain, and unreachable-state models",
            "Tested nondeterministic branching and safety-violation discovery",
            "Used varied model structures to verify solver correctness across edge cases"
          ]
        }
      }
    ],
    links: []
  },

  softwareArtifact: {
    title: "Field Service Management System Design",
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
          { label: "Concept of Operations (CONOPS / OPSCON)", url: `${FSM_BASE}/Security Planning/Field Service Management Software - CONOPS_OPSCON.pdf`, print: {mode: "summary"} },
          { label: "Systems Engineering Management Plan (SEMP)", url: `${FSM_BASE}/Security Planning/Field Service Management Software - SEMP.pdf`, print: {mode: "hide"} },
        ],
        print: {
          title: "FSM Security Planning Documentation",
          description: "These planning documents define the operational context, stakeholder needs, management structure, and security-oriented engineering approach for the Field Service Management system.",
          highlights: [
            "Established mission context, stakeholder roles, and operational objectives",
            "Outlined engineering planning and project governance considerations",
            "Connected system planning to secure development and operational control"
          ]
        }
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
          { label: "System Requirements Document (SRD)", url: `${FSM_BASE}/Engineering Requirements/System Requirements Document (SRD).pdf`, print: {mode: "summary"} },
          { label: "FSM - Traceability Matrix", url: `${FSM_BASE}/Engineering Requirements/FSM - Traceability Matrix.xlsx`, print: {mode: "hide"} }
        ],
        print: {
          title: "FSM Requirements and Traceability",
          description: "This artifact captures the formal system requirements and the traceability structure linking stakeholder expectations to design and validation elements.",
          highlights: [
            "Defined functional and non-functional requirements for the platform",
            "Mapped requirements to engineering artifacts and validation concerns",
            "Demonstrated structured requirements management across the system lifecycle"
          ]
        }
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
          { label: "System Design Document", url: `${FSM_BASE}/System Design/System Design.pdf`, print: {mode: "summary"} },
          { label: "Activity Diagram", url: `${FSM_BASE}/System Design/Activity Diagram.png` },
          { label: "Class Diagram", url: `${FSM_BASE}/System Design/Class Diagram.png` },
          { label: "Component Diagram", url: `${FSM_BASE}/System Design/Component Diagram.png` },
          { label: "SysML BDD", url: `${FSM_BASE}/System Design/SysML-BDD.png`, print: {mode: "summary"} },
          { label: "SysML IBD", url: `${FSM_BASE}/System Design/SysML-IBD.png`, print: {mode: "summary"} },
          { label: "Use Case Diagram", url: `${FSM_BASE}/System Design/Use Case Diagram.png` }
        ],
        print: {
          title: "FSM System Design Artifacts",
          description: "This artifact presents the architectural and behavioral design of the Field Service Management platform through structured engineering diagrams and supporting design documentation.",
          highlights: [
            "Modeled system behavior, structure, and component responsibilities",
            "Used UML and SysML representations to communicate design decisions",
            "Captured interactions between users, services, and platform subsystems"
          ]
        }
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
          { label: "Testing Plan.pdf", url: `${FSM_BASE}/Testing Plan.pdf`, print: {mode: "summary"} }
        ],
        print: {
          title: "Field Service Management Testing Strategy",
          description: "This artifact documents the verification and validation strategy for the Field Service Management platform, covering testing across unit, integration, system, and user acceptance levels.",
          highlights: [
            "Defined layered testing strategy across development stages",
            "Connected validation planning to system requirements",
            "Demonstrated verification planning for enterprise software delivery"
          ]
        }
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
          { label: "Cryptographic Architecture", url: `${FSM_BASE}/Cryptography.pdf`, print: {mode: "summary"} }
        ],
        print: {
          title: "Field Service Management Cryptographic Architecture",
          description: "This artifact outlines the cryptographic design of the Field Service Management platform, including secure communication, protection of system data, and security-focused architectural decisions.",
          highlights: [
            "Planned encryption for sensitive data and communications",
            "Addressed secure API interaction and authentication support",
            "Integrated security architecture into the broader system design"
          ]
        }
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
          { label: "Integration and Deployment Plan.pdf", url: `${FSM_BASE}/Integration and Deployment Plan.pdf`, print: {mode: "summary"} }
        ],
        print: {
          title: "Field Service Management Integration and Deployment Planning",
          description: "This artifact documents how the Field Service Management platform would integrate with enterprise systems and how it would be deployed in an operational environment.",
          highlights: [
            "Planned system integration with external enterprise platforms",
            "Documented deployment considerations for operational rollout",
            "Addressed implementation readiness beyond core design"
          ]
        }
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
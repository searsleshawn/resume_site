// js/inquiry.js
import { initViewer, renderDeliverables } from "./viewer.js";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- Inquiry artifact paths ---
const XAI_BASE = "content/artifacts/xai";

const inquiryData = {
  intro: [
    "This section demonstrates my ability to conduct independent inquiry in computer science through a Responsible AI and Explainable AI (XAI) investigation. The work documents how I defined a technical and ethical problem, selected analytical and modeling methods, evaluated results, and drew conclusions about fairness, bias, and model behavior."
  ],

  artifact: {
    title: "Independent Inquiry into Bias, Fairness, and Explainability in Machine Learning Systems",
    context: "Responsible AI / Explainable AI coursework sequence, M.S. in Computer Science, Vanderbilt University",
    role: "Independent investigator and developer responsible for data preparation, modeling, fairness analysis, and interpretability evaluation.",

    problemStatement: [
      `This inquiry examined whether demographic, workplace, and geographic patterns in the Mental Health in Tech survey dataset could introduce bias into predictive machine learning systems. The central question was not only whether a model could predict treatment-seeking behavior, but whether it would do so in ways that reflect or amplify disparities related to gender, age, employment context, or country.`,

      `This problem matters because models trained on socially skewed data can appear technically effective while still producing ethically harmful outcomes. My goal was to independently analyze the dataset, build and evaluate predictive models, and apply explainability techniques to understand how bias emerges and how it should be interpreted within a responsible AI framework.`
    ],

    methodology: [
      "<strong>Data Preparation:</strong> Cleaned the dataset by removing unusable fields, handling missing values, normalizing gender data, and grouping age and country features.",
      
      "<strong>Exploratory Analysis:</strong> Performed EDA to identify imbalance, representation issues, and sensitive predictors.",

      "<strong>Fairness Measurement:</strong> Applied statistical parity difference and disparate impact metrics to evaluate protected groups.",

      "<strong>Model Development:</strong> Built a Random Forest pipeline including preprocessing, train/test evaluation, confusion matrix analysis, and feature importance.",

      "<strong>Subgroup Evaluation:</strong> Compared model accuracy across gender and age groups.",

      "<strong>Explainability Analysis:</strong> Used PDPs, IV/WOE, quantile error analysis, and GAM interpretation.",

      "<strong>Ethical Interpretation:</strong> Connected technical findings to fairness, accountability, transparency, and responsible deployment."
    ],

    workPerformed: [
      "Investigated the 2014 Mental Health in Tech dataset to identify variables that could encode demographic or cultural bias.",
      "Created cleaned analysis datasets and transformed features for bias analysis and model training.",
      "Measured disparities across sensitive attributes including gender, age, self-employment, remote work status, company type, benefits access, and country grouping.",
      "Built and evaluated predictive models to assess both overall performance and subgroup performance differences.",
      "Generated explainability artifacts to determine how feature combinations influenced predictions.",
      "Documented findings across multiple reports and connected results to Responsible AI principles through an ethical framework."
    ],

    outcomes: [
      "Demographic and contextual variables influenced both treatment patterns and model behavior, showing the dataset was not neutral from a fairness perspective.",
      "Bias analysis revealed disparities across gender, age, workplace, and country variables.",
      "Model performance varied across demographic groups, particularly across gender and age subgroups.",
      "Feature importance and explainability analysis showed demographic and contextual variables strongly influenced predictions, suggesting the model learned socially skewed patterns rather than purely need-based signals.",
      "The inquiry showed explainability alone is insufficient; technical findings must be paired with ethical evaluation to determine whether a model should be trusted."
    ],

    conclusions: [
      "Machine learning systems trained on socially imbalanced data can reproduce and amplify disparities even when overall accuracy appears strong. Bias detection and explainability should therefore be treated as core evaluation components rather than optional additions.",
      "Responsible AI requires more than accuracy. Fairness analysis, subgroup evaluation, interpretability, and governance are necessary to determine whether predictive systems are suitable for real-world deployment. Future work would explore mitigation techniques, broader fairness metrics, and alternative modeling approaches designed for equitable outcomes."
    ],

    deliverables: [
      {
        id: "xai-building-ethical-ai-framework",
        title: "Theoretical framework to building ethical AI beliefs",
        type: "viewer",
        open: true,
        controls: {
          download: true,
          copy: true
        },
        files: [
          { label: "Building Ethical AI", url: `${XAI_BASE}/ethical_framework.md`}
        ]
      },
      {
        id: "xai-bias-reporting",
        title: "Bias Analysis Reports",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true,
          download: true
        },
        files: [
          { label: "Identifying Biases", url: `${XAI_BASE}/report-assignment 2.html`, artifactUrl: `${XAI_BASE}/report-assignment 2.pdf`},
          { label: "Proving Biases through Machine Learning", url: `${XAI_BASE}/report-assignment 3.html`, artifactUrl: `${XAI_BASE}/report-assignment 3.pdf` }
        ]
      },
      {
        id: "xai-bias-discovery",
        title: "Statistical Analysis of Bias",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true,
          download: true
        },
        files: [
          { label: "Interpreting Bias with Statistical Analysis", url: `${XAI_BASE}/Discovering_Bias_in_Data.html`, artifactUrl: `${XAI_BASE}/Discovering_Bias_in_Data.pdf` },
          { label: "RAIdata.csv", url: `${XAI_BASE}/RAIdata.csv` },
          { label: "survey.csv", url: `${XAI_BASE}/survey.csv` }
        ]
      },
      {
        id: "xai-final-explainability",
        title: "XAI Prototype and Ethical Framework",
        type: "viewer",
        open: false,
        controls: {
          openInNewTab: true,
          download: true
        },
        files: [
          { label: "XAI_Prototype_Final", url: `${XAI_BASE}/XAI_Prototype_Final.html`, artifactUrl: `${XAI_BASE}/XAI_Prototype_Final.pdf` }
        ],
        print: {
          mode: "summary",
          title: "XAI Prototype and Ethical Framework",
          description: "This artifact documents my fairness and explainability analysis using interpretable modeling, bias evaluation, and an ethical framework for responsible machine learning.",
          highlights: [
            "Evaluated statistical bias and model behavior",
            "Applied explainability techniques to interpret predictions",
            "Developed an ethical framework to contextualize findings"
          ]
        }
      }
    ],

    links: []
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
      <p><strong>Role:</strong> ${escapeHtml(a.role)}</p>

      <h4>Problem Statement</h4>
      ${a.problemStatement.map(p => `<p>${escapeHtml(p)}</p>`).join("")}

      <h4>Methodology</h4>
      <ol>${a.methodology.map(x => `<li class="method-step">${x}</li>`).join("")}</ol>

      <h4>Work Performed</h4>
      <ul>${a.workPerformed.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Outcomes</h4>
      <ul>${a.outcomes.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>

      <h4>Conclusions</h4>
      <ul>${a.conclusions.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>


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

export function init() {
  const app = document.getElementById("app");
  initViewer(app);
}
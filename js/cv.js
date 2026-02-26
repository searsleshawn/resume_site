// js/cv.js

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const cvData = {
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Vanderbilt University",
      location: "Nashville, TN",
      dates: "August 2024 – Expected May 2026"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Middle Tennessee State University",
      location: "Murfreesboro, TN",
      dates: "Graduated May 2023"
    }
  ],

  employment: [
    {
      title: "IT Technician",
      organization: "Knoxville Utilities Board",
      dates: "October 2023 – May 2024",
      description: [
        "Provided technical support for residential networking and device connectivity.",
        "Diagnosed and resolved performance and infrastructure issues.",
        "Collaborated with Network Operations Center to maintain system reliability."
      ]
    },
    {
      title: "Infantryman",
      organization: "United States Army",
      dates: "August 2014 – December 2017",
      description: [
        "Led and participated in structured training and operational exercises.",
        "Operated effectively within multi-level command environments.",
        "Demonstrated adaptability, leadership, and strategic coordination."
      ]
    }
  ],

  skills: {
    languages: ["Java", "Python", "C++", "JavaScript"],
    frameworks: ["Spring Boot", "R2DBC", "React", "Node.js"],
    systems: ["Linux", "Docker", "Nginx", "AWS"],
    areas: [
      "Distributed Systems",
      "Digital Forensics",
      "Machine Learning",
      "Cloud Infrastructure"
    ]
  },

  honors: [
    "GI Bill Scholar",
    "Veteran of the United States Army"
  ]
};

export function render() {
  const e = cvData.education;
  const jobs = cvData.employment;
  const s = cvData.skills;

  return `
    <section class="page">
      <h2 class="section-title">2. Curriculum Vitae</h2>

      <h3>Education</h3>
      ${e.map(ed => `
        <div class="cv-block">
          <strong>${escapeHtml(ed.degree)}</strong><br />
          ${escapeHtml(ed.institution)}, ${escapeHtml(ed.location)}<br />
          <em>${escapeHtml(ed.dates)}</em>
        </div>
      `).join("")}

      <h3>Professional Employment</h3>
      ${jobs.map(job => `
        <div class="cv-block">
          <strong>${escapeHtml(job.title)}</strong> – ${escapeHtml(job.organization)}<br />
          <em>${escapeHtml(job.dates)}</em>
          <ul>
            ${job.description.map(d => `<li>${escapeHtml(d)}</li>`).join("")}
          </ul>
        </div>
      `).join("")}

      <h3>Technical Skills</h3>
      <p><strong>Programming Languages:</strong> ${s.languages.join(", ")}</p>
      <p><strong>Frameworks & Tools:</strong> ${s.frameworks.join(", ")}</p>
      <p><strong>Systems & Infrastructure:</strong> ${s.systems.join(", ")}</p>
      <p><strong>Areas of Focus:</strong> ${s.areas.join(", ")}</p>

      <h3>Honors & Service</h3>
      <ul>
        ${cvData.honors.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
      </ul>
    </section>
  `;
}
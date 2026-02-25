// js/summary.js

const portfolio = {
  personal: {
    name: "Le'Shawn Sears",
    dateEntered: "August 2024",
    status: "Part-time",
    support: "GI Bill",
    advisor: "Dr. Peng (Dana) Zhang",
  },
  goals: [
    "TBD: Write 2–4 sentences about my professional goals."
  ],
  achievements: [
    "TBD: Achievement 1",
    "TBD: Achievement 2",
    "TBD: Achievement 3",
  ],
  interests: [
    "Distributed Systems & Cloud Infrastructure",
    "Security & Digital Forensics",
    "Machine Learning & Responsible AI",
    "Full-Stack Systems Engineering",
  ],
  courses: [
    { course: "CS #### – Course Name", semester: "Fall 2024", instructor: "Instructor", grade: "A / In Progress / Planned" },
    { course: "CS #### – Course Name", semester: "Fall 2024", instructor: "Instructor", grade: "A / In Progress / Planned" },
    { course: "CS #### – Course Name", semester: "Fall 2024", instructor: "Instructor", grade: "A / In Progress / Planned" },
  ],
};

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// IMPORTANT: the router expects every page file to export render()
export function render() {
  const s = portfolio;

  const rows = [
    ["Name", s.personal.name],
    ["Date Entered Program", s.personal.dateEntered],
    ["Status", s.personal.status],
    ["Principal Source of Support", s.personal.support],
    ["Academic Advisor", s.personal.advisor],
  ];

  const infoTable = `
    <table class="kv-table" aria-label="Personal information">
      <tbody>
        ${rows.map(([k, v]) => `
          <tr>
            <th scope="row">${escapeHtml(k)}</th>
            <td>${escapeHtml(v)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  const coursesTable = `
    <table class="courses-table" aria-label="Courses and grades">
      <thead>
        <tr>
          <th>Course</th>
          <th>Semester</th>
          <th>Instructor</th>
          <th>Grade / Status</th>
        </tr>
      </thead>
      <tbody>
        ${s.courses.map(c => `
          <tr>
            <td>${escapeHtml(c.course)}</td>
            <td>${escapeHtml(c.semester)}</td>
            <td>${escapeHtml(c.instructor)}</td>
            <td>${escapeHtml(c.grade)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  return `
    <section class="page">
      <h2 class="section-title">1. Summary Data</h2>

      <h3>Personal Information</h3>
      ${infoTable}

      <h3>Courses and Grades</h3>
      ${coursesTable}

      <h3>Professional Goals</h3>
      <ul>${s.goals.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul>

      <h3>Achievements (Academic Year)</h3>
      <ul>${s.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>

      <h3>Computer Science Topic Interests</h3>
      <ul>${s.interests.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    </section>
  `;
}
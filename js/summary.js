// js/summary.js

const portfolio = {
  personal: {
    name: "Le'Shawn Sears",
    dateEntered: "August 2024",
    status: "Part-time",
    support: "Scholarship, GI Bill",
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
    { course: "CS 5278-50 – Principles of Software Engineering", semester: "Fall 2024", instructor: "Artin Sedighi", grade: "A+" },
    { course: "CS 5279-50 – Software Engineering Project", semester: "Fall 2024", instructor: "Yu Sun", grade: "A" },
    { course: "CS 6387-50 – Topics in Software Engineering: Cybersecurity", semester: "Fall 2024", instructor: "Charles Easttom", grade: "A" },
    { course: "CS 5262-50 – Foundation of Machine Learning", semester: "Spring 2025", instructor: "Peng Zhang", grade: "A+" },
    { course: "CS 8395-50 – Special Topics: Microservices", semester: "Spring 2025", instructor: "Darren Pulsipher", grade: "A" },
    { course: "CS 5288-50 – Web-based System Architecture", semester: "Summer 2025", instructor: "Tamas Kecskes", grade: "A" },
    { course: "CS 5891-50 – Special Topics: Responsible AI", semester: "Summer 2025", instructor: "Artin Sedighi", grade: "A+" },
    { course: "CS 5287-50 – Principles of Cloud Computing", semester: "Fall 2025", instructor: "Darren Pulsipher", grade: "A" },
    { course: "CS 6315-50 – Automated Verification", semester: "Fall 2025", instructor: "Artin Sedighi", grade: "A+" },
    { course: "CS 5260-01 – Artifical Intelligence", semester: "Spring 2026", instructor: "Ronald Hedgecock", grade: "In Progress" },
    { course: "CS 8395-51 – Special Topics: Digital Forensics", semester: "Spring 2026", instructor: "Charles Easttom", grade: "In Progress" }
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
import React, { useState } from "react";
import grades from "../../data/grades.json";
import "./Grades.css";

const PASS_MARK = "P";

function gradeClass(grade) {
  if (grade === PASS_MARK) return "grade-pass";
  if (grade >= 8.5) return "grade-high";
  if (grade >= 7) return "grade-mid";
  return "grade-low";
}

function formatGrade(grade) {
  return grade === PASS_MARK ? "Pass" : grade.toFixed(1);
}

function Grades() {
  const [showTranscript, setShowTranscript] = useState(false);
  const [openSemesters, setOpenSemesters] = useState([]);

  const toggleSemester = (number) => {
    setOpenSemesters((current) =>
      current.includes(number)
        ? current.filter((open) => open !== number)
        : [...current, number]
    );
  };

  return (
    <section className="grades-section">
      <h3 className="section-title">Full Grades</h3>
      <button
        type="button"
        className="grades-toggle"
        aria-expanded={showTranscript}
        aria-controls="grades-panel"
        onClick={() => setShowTranscript((open) => !open)}
      >
        <span className={`chevron ${showTranscript ? "chevron-open" : ""}`} aria-hidden="true">
          ▸
        </span>
        <span className="grades-toggle-label">
          {showTranscript ? "Hide transcript" : "Show transcript"}
        </span>
        <span className="grades-overall">
          Overall <strong>{grades.overallGPA.toFixed(2)}</strong>
        </span>
      </button>

      {showTranscript && (
        <div id="grades-panel" className="grades-panel">
          {grades.semesters.map((semester) => {
            const isOpen = openSemesters.includes(semester.number);
            const panelId = `semester-${semester.number}-courses`;
            return (
              <div className="semester-card" key={semester.number}>
                <button
                  type="button"
                  className="semester-header"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleSemester(semester.number)}
                >
                  <span className={`chevron ${isOpen ? "chevron-open" : ""}`} aria-hidden="true">
                    ▸
                  </span>
                  <span className="semester-name">Semester {semester.number}</span>
                  <span className={`semester-gpa ${gradeClass(semester.gpa)}`}>
                    {semester.gpa.toFixed(2)}
                  </span>
                </button>
                {isOpen && (
                  <ul id={panelId} className="course-list">
                    {semester.courses.map((course) => (
                      <li className="course-row" key={course.title}>
                        <span className="course-details">
                          <span className="course-title">{course.title}</span>
                          <span className="course-period">{course.period}</span>
                        </span>
                        <span className={`course-grade ${gradeClass(course.grade)}`}>
                          {formatGrade(course.grade)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Grades;

import React from "react";
import ProjectList from "./components/ProjectList";
import "./App.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function GPAGauge({ value, max = 10 }) {
  const percent = Math.min((value / max) * 100, 100);
  // Use a more vibrant color for the filled path
  const vibrantColor = percent > 85 ? '#04d47d' : percent > 70 ? '#47e6c1' : percent > 50 ? '#f7b267' : '#e76f51';
  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={percent}
        text={`${value.toFixed(2)}`}
        maxValue={100}
        styles={buildStyles({
          pathColor: vibrantColor,
          textColor: '#8db38b',
          trailColor: '#232527',
          backgroundColor: '#181a1b',
          textSize: '1.2em',
        })}
      />
      <div style={{ textAlign: 'center', color: '#bdbea9', fontSize: '0.8em', marginTop: 2 }}>GPA</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <a
        href={process.env.PUBLIC_URL + "/cv.pdf"}
        target="_blank"
        rel="noopener noreferrer"
        className="cv-download-btn cv-download-btn-fixed"
      >
        <span role="img" aria-label="CV" style={{ marginRight: 8 }}>📄</span>
        Get my CV
      </a>
      <div className="app-container">
        <header className="profile-section">
          <img
            src={process.env.PUBLIC_URL + "/profile.jpg"}
            alt="Emmanouil Raftopoulos"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-intro">
              <span role="img" aria-label="wave" className="wave-emoji">👋</span>
              <span className="profile-tagline">Hi, I'm Emmanouil Raftopoulos</span>
            </div>
            <h2>Electrical & Computer Engineering Student</h2>
            <ul className="bio-list">
              <li><span className="bio-icon" role="img" aria-label="location">📍</span> Volos, Greece</li>
              <li><span className="bio-icon" role="img" aria-label="age">🎂</span> 21 years old</li>
              <li><span className="bio-icon" role="img" aria-label="university">🎓</span> 3rd year at University of Thessaly</li>
              <li className="gpa-gauge-list"><GPAGauge value={8.82} max={10} /></li>
            </ul>
            <p className="bio-desc">
              I'm passionate about technology and always eager to learn something new. I love building creative solutions and enjoy exploring the ever-evolving world of engineering and software development.
            </p>
            <a
              href={process.env.PUBLIC_URL + "/cv.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-download-btn cv-download-btn-mobile"
            >
              <span role="img" aria-label="CV" style={{ marginRight: 8 }}>📄</span>
              Get my CV
            </a>
          </div>
        </header>
        {/* Skills Section Start */}
        <section className="skills-section">
          <h3 className="skills-title">Skills</h3>
          <div className="skills-grid">
            <div className="skill-card">
              <span className="skill-icon" role="img" aria-label="Programming">💻</span>
              <div className="skill-label">Programming</div>
              <ul className="skill-list">
                <li>C/C++</li>
                <li>Python</li>
                <li>ESP32/Arduino/STM32</li>
                <li>Dart/Flutter</li>
                <li>React</li>
                <li>PHP</li>
              </ul>
            </div>
            <div className="skill-card">
              <span className="skill-icon" role="img" aria-label="Languages">🌐</span>
              <div className="skill-label">Languages</div>
              <ul className="skill-list">
                <li>Greek (native)</li>
                <li>English (fluent C2)</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Skills Section End */}
        <main>
          <ProjectList />
        </main>
        {/* Footer Start */}
        <footer className="footer">
          <div className="footer-social">
            <a href="http://www.linkedin.com/in/manolis-raftopoulos" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v4.69z"/></svg>
            </a>
            <a href="https://github.com/MANRAF04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://instagram.com/m_raftopoulos" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="16.5" cy="7.5" r="1.2" fill="currentColor"/></svg>
            </a>
            <a href="mailto:stedion70@gmail.com" aria-label="Email">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="5,8 12,14 19,8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <div className="footer-signature">
            <img src={process.env.PUBLIC_URL + "/sign.gif"} alt="Signature" style={{ height: 48 }} />
          </div>
        </footer>
        {/* Footer End */}
      </div>
    </div>
  );
}

export default App;
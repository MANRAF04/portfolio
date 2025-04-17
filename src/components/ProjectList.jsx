import React from "react";
import projects from "../data/projects.json";

const ProjectList = () => (
  <div>
    <h2>Projects</h2>
    <ul>
      {projects.map((project, idx) => (
        <li key={idx}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectList;
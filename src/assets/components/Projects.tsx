import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    { id: 1, title: 'University Event Registration Dashboard', description: 'A University Event Registration Dashboard is a centralized web-based platform that automates the process of organizing and attending campus activities. It serves as a digital bridge between event organizers and students to enhance coordination and participation.', link: ' https://mindarosit-gab.github.io/MG_LAB4_Mindaro/' },
    { id: 2, title: 'Student Book Request', description: 'A Student Book Request system is a specialized module within a school portal that allows students to formally ask for library materials, textbooks, or specific learning resources. It simplifies the flow between student needs and inventory management.', link: 'https://mindarosit-gab.github.io/MG_LAB6_Mindaro/' },
    { id: 3, title: 'UNI-PORTAL', description: 'Access your personalized dashboard to track your degree progress, view upcoming campus events, and connect with your academic advisors. Stay updated with the latest university announcements and deadlines.', link: ' https://mindarosit-gab.github.io/MG_Lab5_Mindaro/' }
  ];

  return (
    <section id="projects" className="container py-5">
      <h2 className="mb-4">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <a href={project.link} className="card-link text-decoration-none" target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

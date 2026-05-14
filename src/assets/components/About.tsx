import React from 'react';
import specialImage from './Images/special-image.jpg';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
        <img 
          src={specialImage} 
          alt="Jean Gabrielle Mindaro" 
          style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #bb86fc', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }} 
        />
        <div>
          <h2 style={{ marginBottom: '0.5rem', color: '#bb86fc' }}>Jean Gabrielle Mindaro</h2>
          <h5 style={{ marginBottom: '1.5rem', color: '#e0e0e0', letterSpacing: '1px' }}>DEVELOPER & MULTIMEDIA DESIGNER</h5>
          
          <p style={{ maxWidth: '750px', margin: '0 auto 1rem', fontSize: '1.1rem' }}>
            I build functional digital experiences using <strong>Java, React, and TypeScript</strong>. I focus on creating solid web applications starting from clean <strong>HTML</strong> structures and finishing with responsive <strong>CSS</strong> layouts.
          </p>

          <p style={{ maxWidth: '750px', margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
            I also bring a creative skill set to the table, using <strong>Adobe Photoshop</strong> for professional-grade <strong>photo and video editing</strong>. This allows me to handle both the coding and the high-quality visual content needed for modern projects.
          </p>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Java', 'React', 'TypeScript', 'HTML', 'CSS', 'Adobe Photoshop', 'Video Editing'].map((skill) => (
              <span key={skill} style={{ 
                padding: '7px 15px', 
                background: '#1e1e1e', 
                color: '#bb86fc', 
                borderRadius: '4px', 
                fontSize: '0.85rem', 
                fontWeight: '600',
                border: '1px solid #333'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

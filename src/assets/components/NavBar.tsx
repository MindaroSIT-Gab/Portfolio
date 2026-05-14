import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioNavbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-primary w-100 mb-5 shadow-sm">
      <header className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/">Portfolio</Link>
        <div className="d-flex gap-3">
          
          <Link className="text-white text-decoration-none" to="/about">About</Link>
          <Link className="text-white text-decoration-none" to="/projects">Projects</Link>
          <Link className="text-white text-decoration-none" to="/contacts">Contacts</Link>
        </div>
      </header>
    </nav>
  );
};

export default PortfolioNavbar;

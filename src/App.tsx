import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PortfolioNavbar from "./assets/components/NavBar";
import About from "./assets/components/About";
import Projects from "./assets/components/Projects";
import SecretBunker from "./assets/components/SecretBunker";
import Contacts from "./assets/components/Contacts";
import "./App.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <div className="container mt-5 pt-5">
    <h1>Welcome to my Portfolio</h1>
    <p>Please select a section from the navbar.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router basename="/Portfolio">
      <ScrollToTop />
      <PortfolioNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/secretbunker" element={<SecretBunker />} />
      </Routes>
    </Router>
  );
};

export default App;

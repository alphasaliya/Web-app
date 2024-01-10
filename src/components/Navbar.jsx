import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isNavLinkActive = (path) => path === location.pathname;

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        
          <img src="logo.jpg" alt="Logo" className="navbarLogo" />
          <div>
            <h1>Worthy</h1>
            <h2>Olympus on The Earth</h2>
          </div>
       
      </nav>
    </footer>
  );
}

export default Navbar;

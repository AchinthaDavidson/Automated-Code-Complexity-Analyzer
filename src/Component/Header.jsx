// Header.js
import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header className="header">
        <nav className="nav">
          <div className="logo">My Logo</div>
          <div
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle Menu"
          >
            ☰
          </div>
          <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
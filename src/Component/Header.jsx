// Header.js
import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';
import logo from "../assect/MicrosoftTeams-image (1).png"
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header className="header">
        <nav className="nav">
          <div className="logo"> <img src={logo} style={{
            height:"100px"
          }}/></div>
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
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/about">ABOUT</a>
            </li>
           
            <li>
              <a href="/contact">CONTACT US</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
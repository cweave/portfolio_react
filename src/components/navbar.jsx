import React, { useState } from 'react';
import Hamburger from './hamburger';

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo' role='img' aria-label='CW in a circle' title='Christa Weaver'></div>
        <div className='menu-icon' onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`navbar__navigation  ${showNavbar && "active"}`}>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#about-christa'>About</a></li>
            <li><a href='#projects'>Projects</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
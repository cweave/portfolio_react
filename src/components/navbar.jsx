import React from 'react';


const NavBar = () => {
  return (
    <nav>
      <div className='nav-bar'>
        <div className='nav-bar__logo' role='img' aria-label='CW in a circle' title='Christa Weaver'></div>
        <ul className='nav-bar__navigation'>
          <li><a href='#'>Home</a></li>
          <li><a href='#about-christa'>About</a></li>
          <li><a href='#projects'>Projects</a></li>
          <li><a href='#contact'>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
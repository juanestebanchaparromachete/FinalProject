import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const Navbar = () => (
  <header id="mainHeader">
    <Link className="navbar-brand" id="oi" to='/challenges'>Alprecio-Retos</Link>
    <input type="checkbox" id="toggle"/>
    <label htmlFor="toggle" id="toggle-btn"></label>
    <div className="nav-icon"></div>
    <nav data-state="close">
      <ul>
        <li className="nav-item">
          <Link className="navbarText " id="projectLink" to='/challenges'>Retos</Link>
        </li>
        <li className="nav-item">
          <Link className="navbarText" id="optLink" to='/publish'>Publicar</Link>
        </li>
        {/*<li><a href="#">Home</a></li>*/}
        {/*<li><a href="#">About</a></li>*/}
        {/*<li><a href="#">Services</a></li>*/}
        {/*<li><a href="#">Contact</a></li>*/}
      </ul>
    </nav>
  </header>
);

export default Navbar;
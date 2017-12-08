import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

const Navbar = () => (
  <nav className="navbar navbar-expand-md bg-dark navbar-dark">
    {/*<div className="container">*/}
      <Link className="navbar-brand" id="oi" to='/projects'>Alprecio-Retos</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        {/*<div className="text-grey navBartext" style={{marginTop: '5px'}}>*/}
          {/*<AccountsUIWrapper id="hol"/>*/}
        {/*</div>*/}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="navbarText " id="projectLink" to='/challenges'>Retos</Link>
          </li>
          <li className="nav-item">
            <Link className="navbarText" id="optLink" to='/publish'>Publicar</Link>
          </li>
        </ul>
      </div>
    {/*</div>*/}
  </nav>
);

export default Navbar;
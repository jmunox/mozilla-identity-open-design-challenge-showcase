import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import * as css from './AppMenu.scss';

const AppMenu = () => (
  <>
  <nav className="navbar is-fixed-top is-primary">
  <div className="container px-6">
    <div className="navbar-brand">
      <a className="navbar-item">
        <div className='title has-text-white'>Designing the Mozilla brand identity.</div>
      </a>
    </div>
    <div id="navbarMenuHeroA" className="navbar-menu">
      <div className="navbar-end">
      <ListItemLink label="Home" to="/" />
        <a className="navbar-item is-active">
          Home
        </a>
        <a className="navbar-item">
          About
        </a>
        <span className="navbar-item">
          <a className="button is-primary is-inverted">
            <span className="icon">
              <i class="fab fa-github"></i>
            </span>
            <span>Source</span>
          </a>
        </span>
      </div>
    </div>
  </div>
</nav>

  <nav className={css.main}>
    [App Menu]
    <ul>
      
      <ListItemLink label="About" to="/about" />
    </ul>
  </nav>
  </>
);

const ListItemLink = ({ label, to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to} {...rest}>
          {label}
        </Link>
      </li>
    )}
  />
);

export default AppMenu;

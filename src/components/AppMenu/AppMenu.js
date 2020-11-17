import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import classNames from 'classnames';

import * as css from './AppMenu.scss';

export default view(() => {
  document.body.className = 'has-navbar-fixed-top has-background-grey-lighter';
  return (
    <>
      <nav className='navbar is-fixed-top is-primary level px-6'>
        <div className='level-left'>
          <div className='level-item'>
            <nav className='breadcrumb is-large' aria-label='breadcrumbs'>
              <ul>
                <ListItemLink className=' has-text-white' label='Showcases' to='/' />
                <ListItemLink className=' has-text-white' label='Designing the Mozilla brand identity' to='/' />
                <ListItemLink className=' has-text-white is-hidden-desktop' label='About' to='/about' />
              </ul>
            </nav>
          </div>
        </div>
        <div className='level-right px-6'>
            <Link className={classNames('level-item has-text-white is-hidden-touch', css.about)} to='/about'>
            About</Link>
        </div>
      </nav>
    </>
)});

const ListItemLink = ({ label, to, ...rest }) => (
  <Route
    exact
    path={to}
    children={({ match }) => (
      <li className={match ? 'is-active' : ''}>
        <Link to={to} {...rest}>
          {label}
        </Link>
      </li>
    )}
  />
);

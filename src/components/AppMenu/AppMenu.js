import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import { view } from 'react-easy-state';
import classNames from 'classnames';

import * as css from './AppMenu.scss';

export default view(() => {
  document.body.className = 'has-navbar-fixed-top '; //has-background-grey-lighter
  return (
    <>
      <nav className='navbar is-fixed-top is-black level is-mobile px-4'>
        <div className='level-left'>
          <div className='level-item'>
            <nav className='breadcrumb' aria-label='breadcrumbs'>
              <ul>
                <ListItemLink className=' has-text-light' label='Designing the Mozilla brand identity' to='/home' />
                <ListItemLink className=' has-text-light is-hidden-desktop' label='About' to='/about' />
              </ul>
            </nav>
          </div>
        </div>
        <div className='level-right is-hidden-touch'>
            <Link className={classNames('level-item has-text-light', css.about)} to='/about'>
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

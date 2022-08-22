import * as React from 'react';
import { view } from 'react-easy-state';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Plot1 from './Plot1';
import Plot2 from './Plot2';
import Plot3 from './Plot3';
import PlotOverview from './PlotOverview';

import * as css from './Plots.scss';


export default view((props) => {
  
  
  return (
      <>
      <div className='column is-full'>
        <nav className='tabs'>
              <ul>
                <li><NavLink exact to='/home' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Overview</NavLink></li>
                <li><NavLink to='/home/calendar' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Calendar view</NavLink></li>
                <li><NavLink to='/home/time-distribution' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Time distribution</NavLink></li>
                <li><NavLink to='/home/3' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>3</NavLink></li>
              </ul>
          </nav>
          </div>
          <div className={classNames('column is-full has-text-centered px-6', css.plotArea)}>
            <Switch>
            <Route path="/home/calendar">
              <Plot1 searchQuery={props.searchQuery}/>
            </Route>
            <Route path="/home/time-distribution">
              <Plot2 searchQuery={props.searchQuery} />
            </Route>
            <Route path="/home/3">
              <Plot3 searchQuery={props.searchQuery} />
            </Route>
            <Route>
              <PlotOverview searchQuery={props.searchQuery}/>
            </Route>
          </Switch>
      </div>
      </>
)
});
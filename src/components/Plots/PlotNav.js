import * as React from 'react';
import { view } from 'react-easy-state';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Plot1 from './Plot1';
import Plot2 from './Plot2';
import Plot3 from './Plot3';
import PlotSimpleOverview from './PlotOverview';
import PlotCompleteOverview from './PlotCompleteOverview';
import PlotSocialMaterialOverview from './PlotSocialMaterialOverview';


import PlotOverview2 from './PlotOverviewCopy';


import * as css from './Plots.scss';


export default view((props) => {
  
  
  return (
      <>
      <div className='column is-full'>
        <nav className='tabs'>
              <ul>
                <li><NavLink exact to='/home' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Overview</NavLink></li>
                <li><NavLink to='/home/paths' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Overview with paths</NavLink></li>
                <li><NavLink to='/home/time-distribution' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Time distribution</NavLink></li>
                <li><NavLink to='/home/simple-overview' activeClassName='has-text-info' activeStyle={{ textDecoration: 'underline' }}>Simple Overview</NavLink></li>
              </ul>
          </nav>
          </div>
          <div className={classNames('column is-full has-text-centered px-6', css.plotArea)}>
            <Switch>
            <Route path="/home/paths">
              <PlotCompleteOverview searchQuery={props.searchQuery}/>
            </Route>
            <Route path="/home/time-distribution">
              <Plot2 searchQuery={props.searchQuery} />
            </Route>
            <Route path="/home/simple-overview">
              <PlotSimpleOverview searchQuery={props.searchQuery} />
            </Route>
            <Route>
              <PlotSocialMaterialOverview searchQuery={props.searchQuery}/>
            </Route>
          </Switch>
      </div>
      </>
)
});
import * as React from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppMenu from 'components/AppMenu/AppMenu';
import Home from 'components/Home/Home';

const About = React.lazy(() => import('./components/About/About'));

const withSuspense = Component => {
  return props => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

const RouteWithDate = ({match}) => {
  return(
      <Home dateHeader={match.params.header} />
  );
};

const RouteWithPlotId = ({match}) => {
  return(
      <Home plotId={match.params.plot} />
  );
};

//<Route path="/home/date/:header" component={RouteWithDate} />
        //<Route path="/home/plot/:plot" component={RouteWithPlotId} />

export default () => {
  return (
    <Router>
        <AppMenu/>
        <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={withSuspense(About)} />
        <Redirect from="/" to="/home" />
        </Switch>
    </Router>
  );
};
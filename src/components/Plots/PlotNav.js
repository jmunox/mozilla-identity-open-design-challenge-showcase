import * as React from 'react';
import { view } from 'react-easy-state';
import { Route, Switch } from "react-router";
import Plot1 from './Plot1';
import Plot2 from './Plot2';
import Plot3 from './Plot3';


export default view((props) => {
    return (
        <Switch>
        <Route path="/home/plot/1">
          <Plot1 searchQuery={props.searchQuery}/>
        </Route>
        <Route path="/home/plot/2">
          <Plot2 searchQuery={props.searchQuery} />
        </Route>
        <Route path="/home/plot/3">
          <Plot3 searchQuery={props.searchQuery} />
        </Route>
        <Route>
          <Plot1 searchQuery={props.searchQuery} />
        </Route>
      </Switch>
)
});
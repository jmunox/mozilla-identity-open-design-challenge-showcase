import * as React from 'react';
import { view } from 'react-easy-state';
import { VegaLite } from 'react-vega';
import eventStore from 'stores/eventStore';
  
const isEmpty = (value) => {
  if (value) {
      if (value.trim().length>1) return false;
      else return true;
  }
  else return true;
}

//stacked_area_stream
//https://vega.github.io/editor/#/examples/vega-lite/stacked_area_stream

  export default view((props) => {
      
    const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch } = eventStore;
    console.log(isEmpty(props.searchQuery))

      let data2 = {
        "values": [
          {"date": "Sun, 01 Jan 2012 23:00:00", "price": 150},
          {"date": "Sun, 02 Jan 2012 00:00:00", "price": 100},
          {"date": "Sun, 02 Jan 2012 01:00:00", "price": 170},
          {"date": "Sun, 02 Jan 2012 02:00:00", "price": 165},
          {"date": "Sun, 02 Jan 2012 03:00:00", "price": 200}
        ]}


      const spec = {
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "view": {"fill": "white"},
          "width": 800,
          "height": 300,
          "mark": "area",
          "encoding": {
            "x": {
              "field": "date",
              "type": "temporal",
              "timeUnit": "yearmonthdate",
              "axis": {"domain": false, "tickSize": 0}
            },
            "y": {
              "aggregate": "count",
              "field": "content",
              "type": "quantitative",
              "axis": null,
              "stack": 'center'
            },
            "color": {"type": "nominal", "field": "event_type"}
          }
    }

      return (
              !isLoading ? 
            <VegaLite spec={spec} /> : <div></div>
      
        
      )
  });
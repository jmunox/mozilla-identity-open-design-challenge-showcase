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

  export default view((props) => {
      
    const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch } = eventStore;

      let data2 = {
        "values": [
          {"date": "Sun, 01 Jan 2012 23:00:00", "price": 150},
          {"date": "Sun, 02 Jan 2012 00:00:00", "price": 100},
          {"date": "Sun, 02 Jan 2012 01:00:00", "price": 170},
          {"date": "Sun, 02 Jan 2012 02:00:00", "price": 165},
          {"date": "Sun, 02 Jan 2012 03:00:00", "price": 200}
        ]}

      const spec2 = 
    {   
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems,
            "transform": [
              {
                "type": "countpattern",
                "signal": "xlogo",
                "field": "content",
                "pattern": /dino|the eye|protocol|connector|button|flik|impossible|wireframe/,
              }
          ]
        },
        "width": 800,
        "height": 400,
        "mark": "area",
        "selection": {"brush": {"type": "interval", "encodings": ["x"]}},
        "encoding": {
          "x": {
            "field": "date",
            "type": "temporal",
            "timeUnit": "yearmonthdate",
            "axis": {"title": ""}
          },
          "y": {
            "aggregate": "count",
            "field": "content",
            "type": "quantitative",
            "axis": {"title": "# posts", "tickCount": 3, "grid": false}
          },
          "color": {"type": "nominal", "field": "logo"}
        }
      };

      const spec3 = {
        "description": "",
        "width": 300,
        "height": 40,
        "data": {
          "values": isEmpty(props.searchQuery) ? items : visibleItems,
        },
        "selection": {
          "grid": {
            "type": "interval", "bind": "scales"
          }},
        "mark": "area",
        "encoding": {
          "x": {
            "field": "date",
            "type": "temporal",
            "timeUnit": "yearmonthdate",
            "title": "Date",
            "axis": {"grid": false}
          },
          "y": {
            "aggregate": "count",
            "field": "content",
            "type": "quantitative",
            "title": "",
            "scale": {"domain": [0, 200]},
            "axis": {"grid": false}
          },
          "color": {
            "field": "event_type",
            "type": "nominal",
            "legend": null
          },
          "row": {
            "field": "event_type",
            "type": "nominal",
            "title": "Platofrm",
            "header": {
              "labelAngle": 0,
              'labelAlign': 'left',
            },
          },
        },
        "view": {"fill": "white"},
      }
      

      return (
              !isLoading ? 
            <VegaLite spec={spec3} /> : <div></div>
      
        
      )
  });
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
    console.log(isEmpty(props.searchQuery))

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
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "width": 600,
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
            "field": "*",
            "type": "quantitative",
            "axis": {"title": "# posts", "tickCount": 3, "grid": false}
          },
          "color": {"type": "nominal", "field": "event_type"}
        }
      };

      const spec = {
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "width": 800,
        "height": 400,
        "view": {"fill": "white"},
        "encoding": {
          "x": {
            "field": "date",
            "type": "temporal",
            "timeUnit": "yearmonthdate",
            "scale": {"domain": {"selection": "brush"}},
            "axis": {"title": ""}
          }
        },
        "layer": [
        {
          "mark": "area",
          "selection": {
            "brush": {"type": "interval", "encodings": ["x"]},
          },
          "encoding": {
            "y": {
              "aggregate": "count",
              "field": "content",
              "type": "quantitative",
              "scale": {"domain": [0, 400]},
              "axis": {"title": "# posts"}
            },
            "color": {"type": "nominal", "field": "event_type"}
          }
        },
        {
          "mark": "point",
          "encoding": {
            "y": {
              "field": "name",
              "type": "nominal",
              "axis": {
                "title": "",
                "offset": 5,
                "ticks": false,
                "minExtent": 10,
                "domain": false
              }
            },
            "size": {
              "field": "contentLength",
              "type": "quantitative",
              "scale": {"domain": [0, 1000400]}
            },
            "color": {
              "value": "blue"
            },
            "tooltip": {"field": "content", "type": "nominal"}
          }
        }
      ]
    }

      return (
              !isLoading ? 
            <VegaLite spec={spec} /> : <div></div>
      
        
      )
  });
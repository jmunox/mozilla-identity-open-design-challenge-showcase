import React, {useEffect} from 'react';
import { view } from 'react-easy-state';
import embed from 'vega-embed';
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

    useEffect(() => {
      const result =  embed('#vis', spec2);
      //vegaEmbed('#vis', spec);
  }, [isLoading]);

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
        <div id='vis'></div>
      )
  });
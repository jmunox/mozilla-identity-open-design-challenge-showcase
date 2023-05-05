import React, {useEffect} from 'react';
import { view } from 'react-easy-state';
import eventStore from 'stores/eventStore';
import embed from 'vega-embed';
//import { Vega, createClassFromSpec } from 'react-vega';
  
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
    const result =  embed('#vis', spec);
    //vegaEmbed('#vis', spec);
    //const result = <Vega spec={spec} onSignalHover={handleSignals}></Vega>
}, [isLoading]);

    console.log(isEmpty(props.searchQuery))
    
    // how to see what has been selected https://github.com/vega/react-vega/issues/76
    //function handleSignals(...args){
    //  console.log(args[1]._vgsid_[0]); // Inverse engeneering
    //}
    //const signalListeners = { "select": handleSignals };
    // https://github.com/vega/react-vega/issues/76
    // https://github.com/vega/vega-lite/issues/2790
    //https://github.com/vega/vega-lite/issues/1830
    //https://github.com/vega/react-vega/blob/master/CHANGELOG.md#-migration-guide

      const spec2 = 
    {   
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "width": "100%",
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
        "$schema": 'https://vega.github.io/schema/vega-lite/v5.json',
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "view": {"fill": "white"},
        "vconcat" : [
        {
        "layer": [
          {
            "mark": {
              "type": "area",
              "interpolate": "linear",
              "tension": 1,
              "strokeCap": "round"
            },
            "width": 3000,
            "height": 250,
            "transform": [
              {"filter": {"selection": "brush"}}
            ],
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
                "scale": {"domain": [0, 350]},
                "axis": {"title": "# posts"}
              },
              "color": {
                "condition": {
                  "selection": "platform",
                  "field": "event_type",
                  "type": "nominal",
                  "legend": null
                  },
                "value": "lightgrey",
              }
            }
          },
          {
          "mark": {
            "type": "circle",
            "opacity": 0.8,
            "strokeWidth": 0.8,
            "stroke": "black",
            "tooltip": true
          },
          "width": 3000,
          "height": 250,
          "transform": [
            {"filter": {"selection": "brush"}}
          ],
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
              "scale": {"domain": [0, 350]},
            },
            "size": {
              "aggregate": "distinct",
              "field": "name",
              "type": "quantitative",
              "title": "Count of individuals",
              "scale": {"domain": [0, 300]}
            },
            "color": {
              "condition": {
                "selection": "platform",
                "field": "event_type",
                "type": "nominal",
                "legend": null
                },
              "value": "lightgrey",
            }
          }
        }
      ]
      },
      {"hconcat": [
          {
            "mark": "area",
            "height": 60,
            "width": 3000,
            "selection": {
              "brush": {"type": "interval", "encodings": ["x"]},
            },
            "encoding": {
              "x": {
                "field": "date",
                "type": "temporal",
                "timeUnit": "yearmonthdate",
                "axis": {"title": "Filter by date"}
              },
              "y": {
                "aggregate": "count",
                "field": "content",
                "type": "quantitative",
                "scale": {"domain": [0, 350]},
                "axis": {"title": ""}
              },
              "color": {
                "condition": {
                  "selection": "platform",
                  "field": "event_type",
                  "type": "nominal"
                  },
                "value": "lightgrey",
              }
            }
          },
          {
            "selection": {
              "platform": {
              "type": "single",
              "fields": ["event_type"],
              }
            },
            "mark": "rect",
            "encoding": {
              "y": {"field": "event_type", "type": "ordinal", "axis": {"title": "Filter by Platform"}},
              "color": {
                "condition": {
                  "selection": "platform",
                  "field": "event_type",
                  "type": "nominal"
                  },
                "value": "lightgrey",
              }
            }
          }
    ]}
    ]
    }

      return ( 
              <div id='vis'></div>
      )
  });

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

//stacked_area_stream
//https://vega.github.io/editor/#/examples/vega-lite/stacked_area_stream

  export default view((props) => {
      
    const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch } = eventStore;
  
    useEffect(() => {
      const result =  embed('#vis', spec2);
      //vegaEmbed('#vis', spec);
  }, [isLoading]);


      const spec = {
        "$schema": 'https://vega.github.io/schema/vega-lite/v4.json',
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "view": {"fill": "white"},
          "width": 400,
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

    const spec2 = {
      "$schema": 'https://vega.github.io/schema/vega-lite/v4.json',
      "data": {
          "values": isEmpty(props.searchQuery) ? items : visibleItems
      },
      "selection": {
        "grid": {
          "type": "interval", "bind": "scales"
        },
      },
      "view": {"fill": "white"},
      "padding": 5,
      "vconcat": [
        {
      "hconcat": [
        {
          "mark": {type :"bar", "tooltip": true},
          "transform": [
            {"filter": {"selection": "brush"}}
          ],
          "width": 200,
          "height": 250,
          "encoding": {
            "x": {
              "timeUnit": "yearmonth",
              "field": "date",
              "type": "ordinal",
              "title": "Month-year", 
            },
            "y": {
              "aggregate": "count",
              "type": "quantitative",
              "title": "Count of records"
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
          "mark": {type :"bar", "tooltip": true},
          "transform": [
            {"filter": {"selection": "brush"}}
          ],
          "width": 200,
          "height": 250,
          "encoding": {
            "x": {
              "timeUnit": "yearmonth",
              "field": "date",
              "type": "ordinal",
              "title": "Month-year"
            },
            "y": {
              "field": "contentLength",
              "type": "quantitative",
              "title": "Lenght of message/post (characters)"
            },
            "color": {
              "condition": {
                "selection": "platform",
                "field": "event_type",
                "type": "nominal",
                },
              "value": "lightgrey",
            }
          }
        },
        { 
          "mark": {type :"bar", "tooltip": true},
          "transform": [
            {"filter": {"selection": "brush"}}
          ],
          "width": 200,
          "height": 250,
          "encoding": {
            "x": {
              "timeUnit": "yearmonth",
              "field": "date",
              "type": "ordinal",
              "title": "Month-year"
            },
            "y": {
              "aggregate": "distinct",
              "field": "name",
              "type": "quantitative",
              "title": "Count of individuals"
            },
            "color": {
              "condition": {
                "selection": "platform",
                "field": "event_type",
                "type": "nominal",
                },
              "value": "lightgrey",
            }
          }
        }
      ]},
      {"hconcat": [
        {
        "mark": {type :"bar", "tooltip": true},
        "selection": {
          "brush": {"type": "interval", "encodings": ["x"]}
        },
        "width": 500,
        "height": 200,
        "encoding": {
          "x": {
            "timeUnit": "hours",
            "field": "date",
            "type": "ordinal",
            "title": "Time of the day (UTC)"
          },
          "y": {
            "aggregate": "count",
            "type": "quantitative",
            "title": "Count of records"
          },
          "color": {
            "condition": {
              "selection": "platform",
              "field": "event_type",
              "type": "nominal",
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
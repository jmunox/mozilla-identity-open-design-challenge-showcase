import * as React from 'react';
import { view } from 'react-easy-state';
import { VegaLite } from 'react-vega-lite';
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
        "layer": [
        {
          "width": 600,
          "height": 400,
          "mark": "area",
          "selection": {"brush": {"type": "interval", "encodings": ["x"]}},
          "encoding": {
            "x": {
              "field": "date",
              "type": "temporal",
              "timeUnit": "yearmonthdate",
              "scale": {"domain": {"selection": "brush"}},
              "axis": {"title": ""}
            },
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
          "width": 600,
          "height": 400,
          "mark": "point",
          "encoding": {
            "x": {
              "field": "date",
              "type": "temporal",
              "scale": {"domain": {"selection": "brush"}},
              "axis": {"title": ""}
            },
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

    const spec3 = {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "description": "A violin plot example showing distributions for pengiun body mass.",
      "width": 500,
      "padding": 5,
    
      "config": {
        "axisBand": {
          "bandPosition": 1,
          "tickExtra": true,
          "tickOffset": 0
        }
      },
    
      "signals": [
        { "name": "plotWidth", "value": 60 },
        { "name": "height", "update": "(plotWidth + 10) * 3"},
        { "name": "trim", "value": true,
          "bind": {"input": "checkbox"} },
        { "name": "bandwidth", "value": 0,
          "bind": {"input": "range", "min": 0, "max": 200, "step": 1} }
      ],
    
      "data": [
        {
          "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
          "name": "penguins",
          "transform": [
            {
              "type": "filter",
              "expr": "datum.Species != null && datum['Body Mass (g)'] != null"
            }
          ]
        },
        {
          "name": "density",
          "source": "penguins",
          "transform": [
            {
              "type": "kde",
              "field": "Body Mass (g)",
              "groupby": ["event_type"],
              "bandwidth": {"signal": "bandwidth"},
              "extent": {"signal": "trim ? null : [2000, 6500]"}
            }
          ]
        },
        {
          "name": "stats",
          "source": "penguins",
          "transform": [
            {
              "type": "aggregate",
              "groupby": ["Species"],
              "fields": ["Body Mass (g)", "Body Mass (g)", "Body Mass (g)"],
              "ops": ["q1", "median", "q3"],
              "as": ["q1", "median", "q3"]
            }
          ]
        }
      ],
    
      "scales": [
        {
          "name": "layout",
          "type": "band",
          "range": "height",
          "domain": {"data": "penguins", "field": "Species"}
        },
        {
          "name": "xscale",
          "type": "linear",
          "range": "width", "round": true,
          "domain": {"data": "penguins", "field": "Body Mass (g)"},
          "domainMin": 2000,
          "zero": false, "nice": true
        },
        {
          "name": "hscale",
          "type": "linear",
          "range": [0, {"signal": "plotWidth"}],
          "domain": {"data": "density", "field": "density"}
        },
        {
          "name": "color",
          "type": "ordinal",
          "domain": {"data": "penguins", "field": "Species"},
          "range": "category"
        }
      ],
    
      "axes": [
        {"orient": "bottom", "scale": "xscale", "zindex": 1},
        {"orient": "left", "scale": "layout", "tickCount": 5, "zindex": 1}
      ],
    
      "marks": [
        {
          "type": "group",
          "from": {
            "facet": {
              "data": "density",
              "name": "violin",
              "groupby": "Species"
            }
          },
    
          "encode": {
            "enter": {
              "yc": {"scale": "layout", "field": "Species", "band": 0.5},
              "height": {"signal": "plotWidth"},
              "width": {"signal": "width"}
            }
          },
    
          "data": [
            {
              "name": "summary",
              "source": "stats",
              "transform": [
                {
                  "type": "filter",
                  "expr": "datum.Species === parent.Species"
                }
              ]
            }
          ],
    
          "marks": [
            {
              "type": "area",
              "from": {"data": "violin"},
              "encode": {
                "enter": {
                  "fill": {"scale": "color", "field": {"parent": "Species"}}
                },
                "update": {
                  "x": {"scale": "xscale", "field": "value"},
                  "yc": {"signal": "plotWidth / 2"},
                  "height": {"scale": "hscale", "field": "density"}
                }
              }
            },
            {
              "type": "rect",
              "from": {"data": "summary"},
              "encode": {
                "enter": {
                  "fill": {"value": "black"},
                  "height": {"value": 2}
                },
                "update": {
                  "x": {"scale": "xscale", "field": "q1"},
                  "x2": {"scale": "xscale", "field": "q3"},
                  "yc": {"signal": "plotWidth / 2"}
                }
              }
            },
            {
              "type": "rect",
              "from": {"data": "summary"},
              "encode": {
                "enter": {
                  "fill": {"value": "black"},
                  "width": {"value": 2},
                  "height": {"value": 8}
                },
                "update": {
                  "x": {"scale": "xscale", "field": "median"},
                  "yc": {"signal": "plotWidth / 2"}
                }
              }
            }
          ]
        }
      ]
    }

      return (
              !isLoading ? 
            <VegaLite spec={spec} /> : <div></div>
      
        
      )
  });
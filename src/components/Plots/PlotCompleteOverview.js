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


      const spec = {
        "$schema": 'https://vega.github.io/schema/vega-lite/v4.17.0.json',
        "data": {
            "values": isEmpty(props.searchQuery) ? items : visibleItems
        },
        "view": {"fill": "white"},
        "spacing": 20,
        "config": {"view": {"continuousWidth": 400, "continuousHeight": 300}},
        "vconcat": [
          {
            "vconcat": [
              {
                "hconcat": [
                  {
                    "layer": [
                      {
                        "mark": "area",
                        "encoding": {
                          "color": {
                            "condition": {
                              "field": "event_type",
                              "scale": {
                                "domain": [
                                  "Discourse",
                                  "GitHub open issue",
                                  "Google Docs",
                                  "Mozilla Blog",
                                  "Telegram chat",
                                  "Vydio conference + etherpad"
                                ],
                                "range": [
                                  "#4c78a8",
                                  "#f58518",
                                  "#e45756",
                                  "#72b7b2",
                                  "#54a24b",
                                  "#eeca3b"
                                ]
                              },
                              "title": "",
                              "type": "nominal",
                              "selection": "selector241"
                            },
                            "value": "grey"
                          },
                          "x": {
                            "axis": {"orient": "top"},
                            "field": "date",
                            "timeUnit": "yearmonthdate",
                            "title": "",
                            "type": "temporal"
                          },
                          "y": {
                            "aggregate": "distinct",
                            "axis": {
                              "domain": false,
                              "offset": 5,
                              "orient": "left",
                              "ticks": false,
                              "title": "# of people"
                            },
                            "field": "name",
                            "stack": "zero",
                            "type": "quantitative"
                          }
                        },
                        "height": 250,
                        "transform": [{"filter": {"selection": "selector239"}}],
                        "width": 600
                      },
                      {
                        "mark": {
                          "type": "circle",
                          "stroke": "white",
                          "strokeOpacity": 0.3,
                          "strokeWidth": 2
                        },
                        "encoding": {
                          "color": {
                            "condition": {
                              "field": "event_type",
                              "scale": {
                                "domain": [
                                  "Discourse",
                                  "GitHub open issue",
                                  "Google Docs",
                                  "Mozilla Blog",
                                  "Telegram chat",
                                  "Vydio conference + etherpad"
                                ],
                                "range": [
                                  "#4c78a8",
                                  "#f58518",
                                  "#e45756",
                                  "#72b7b2",
                                  "#54a24b",
                                  "#eeca3b"
                                ]
                              },
                              "title": "",
                              "type": "nominal",
                              "selection": "selector241"
                            },
                            "value": "grey"
                          },
                          "size": {
                            "field": "contentLength",
                            "title": "Length of message (# chars)",
                            "type": "quantitative"
                          },
                          "tooltip": [
                            {
                              "field": "date",
                              "timeUnit": "yearmonthdate",
                              "type": "temporal"
                            },
                            {"field": "name", "type": "nominal"},
                            {"field": "source", "type": "nominal"},
                            {"field": "content", "type": "nominal"}
                          ],
                          "x": {
                            "field": "date",
                            "timeUnit": "yearmonthdate",
                            "title": "",
                            "type": "temporal"
                          },
                          "y": {
                            "axis": {
                              "domain": false,
                              "labels": false,
                              "offset": 5,
                              "orient": "left",
                              "ticks": false,
                              "title": ""
                            },
                            "field": "name",
                            "sort": {
                              "field": "name",
                              "op": "count",
                              "order": "descending"
                            },
                            "type": "nominal"
                          }
                        },
                        "height": 250,
                        "transform": [{"filter": {"selection": "selector239"}}],
                        "width": 600
                      },
                      {
                        "layer": [
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 3.5
                            },
                            "encoding": {
                              "color": {"value": "#FF334F"},
                              "shape": {"value": "diamond"},
                              "tooltip": [
                                {
                                  "field": "date",
                                  "timeUnit": "yearmonthdate",
                                  "type": "temporal"
                                },
                                {"field": "name", "type": "nominal"},
                                {"field": "source", "type": "nominal"},
                                {"field": "content", "type": "nominal"}
                              ],
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "offset": 5,
                                  "orient": "right",
                                  "ticks": false,
                                  "title": ""
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "order": "ascending"
                                },
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {"filter": "indexof(lower(datum.match), \"dino\")>-1"},
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 3.5
                            },
                            "encoding": {
                              "color": {"value": "#00265a"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {"filter": "indexof(lower(datum.match), \"proto\")>-1"},
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 2.5
                            },
                            "encoding": {
                              "color": {"value": "#FFCE33"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"the-eye\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 2.5
                            },
                            "encoding": {
                              "color": {"value": "grey"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"dino-2\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1.5
                            },
                            "encoding": {
                              "color": {"value": "#F333FF"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"wireframe\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1.25
                            },
                            "encoding": {
                              "color": {"value": "#33FFC7"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"impossible\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1
                            },
                            "encoding": {
                              "color": {"value": "#FF5733"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"button\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 0.5
                            },
                            "encoding": {
                              "color": {"value": "#A34896"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"connector\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 0.75
                            },
                            "encoding": {
                              "color": {"value": "#4B0564"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "name",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"connector\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "mark": "bar",
                    "encoding": {
                      "color": {
                        "condition": {
                          "field": "event_type",
                          "scale": {
                            "domain": [
                              "Discourse",
                              "GitHub open issue",
                              "Google Docs",
                              "Mozilla Blog",
                              "Telegram chat",
                              "Vydio conference + etherpad"
                            ],
                            "range": [
                              "#4c78a8",
                              "#f58518",
                              "#e45756",
                              "#72b7b2",
                              "#54a24b",
                              "#eeca3b"
                            ]
                          },
                          "title": "",
                          "type": "nominal",
                          "selection": "selector241"
                        },
                        "value": "grey"
                      },
                      "x": {
                        "aggregate": "count",
                        "axis": {
                          "domain": false,
                          "orient": "top",
                          "ticks": false,
                          "title": "# of interactions per person"
                        },
                        "field": "content",
                        "type": "quantitative"
                      },
                      "y": {
                        "axis": {
                          "domain": false,
                          "offset": 5,
                          "orient": "right",
                          "ticks": false,
                          "title": ""
                        },
                        "field": "name",
                        "sort": {
                          "field": "name",
                          "op": "count",
                          "order": "descending"
                        },
                        "type": "nominal"
                      }
                    },
                    "height": 250,
                    "transform": [{"filter": {"selection": "selector239"}}],
                    "width": 150
                  }
                ]
              },
              {
                "hconcat": [
                  {
                    "layer": [
                      {
                        "mark": "area",
                        "encoding": {
                          "color": {
                            "condition": {
                              "field": "event_type",
                              "scale": {
                                "domain": [
                                  "Discourse",
                                  "GitHub open issue",
                                  "Google Docs",
                                  "Mozilla Blog",
                                  "Telegram chat",
                                  "Vydio conference + etherpad"
                                ],
                                "range": [
                                  "#4c78a8",
                                  "#f58518",
                                  "#e45756",
                                  "#72b7b2",
                                  "#54a24b",
                                  "#eeca3b"
                                ]
                              },
                              "title": "",
                              "type": "nominal",
                              "selection": "selector241"
                            },
                            "value": "grey"
                          },
                          "x": {
                            "axis": {"labels": false},
                            "field": "date",
                            "timeUnit": "yearmonthdate",
                            "title": "",
                            "type": "temporal"
                          },
                          "y": {
                            "aggregate": "count",
                            "axis": {
                              "domain": false,
                              "offset": 5,
                              "orient": "left",
                              "ticks": false,
                              "title": "# of interactions per day"
                            },
                            "field": "content",
                            "sort": "descending",
                            "stack": "zero",
                            "type": "quantitative"
                          }
                        },
                        "height": 250,
                        "transform": [{"filter": {"selection": "selector239"}}],
                        "width": 600
                      },
                      {
                        "layer": [
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 3.5
                            },
                            "encoding": {
                              "color": {"value": "#FF334F"},
                              "shape": {"value": "diamond"},
                              "tooltip": [
                                {
                                  "field": "date",
                                  "timeUnit": "yearmonthdate",
                                  "type": "temporal"
                                },
                                {"field": "name", "type": "nominal"},
                                {"field": "source", "type": "nominal"},
                                {"field": "content", "type": "nominal"}
                              ],
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "descending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {"filter": "indexof(lower(datum.match), \"dino\")>-1"},
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 3.5
                            },
                            "encoding": {
                              "color": {"value": "#00265a"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {"filter": "indexof(lower(datum.match), \"proto\")>-1"},
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 2.5
                            },
                            "encoding": {
                              "color": {"value": "#FFCE33"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"the-eye\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 2.5
                            },
                            "encoding": {
                              "color": {"value": "grey"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"dino-2\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1.5
                            },
                            "encoding": {
                              "color": {"value": "#F333FF"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"wireframe\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1.25
                            },
                            "encoding": {
                              "color": {"value": "#33FFC7"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"impossible\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 1
                            },
                            "encoding": {
                              "color": {"value": "#FF5733"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"button\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 0.5
                            },
                            "encoding": {
                              "color": {"value": "#A34896"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"connector\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          },
                          {
                            "mark": {
                              "type": "line",
                              "interpolate": "monotone",
                              "point": true,
                              "strokeOpacity": 0.15,
                              "strokeWidth": 0.75
                            },
                            "encoding": {
                              "color": {"value": "#4B0564"},
                              "shape": {"value": "diamond"},
                              "x": {
                                "field": "date",
                                "timeUnit": "yearmonthdate",
                                "title": "",
                                "type": "temporal"
                              },
                              "y": {
                                "axis": {
                                  "domain": false,
                                  "labels": false,
                                  "offset": 5,
                                  "ticks": false
                                },
                                "field": "source",
                                "sort": {
                                  "field": "yearmonthdate(date):T",
                                  "op": "count",
                                  "order": "ascending"
                                },
                                "title": "",
                                "type": "nominal"
                              }
                            },
                            "height": 250,
                            "transform": [
                              {
                                "filter": "indexof(lower(datum.match), \"connector\")>-1"
                              },
                              {"filter": {"selection": "selector239"}}
                            ],
                            "width": 600
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "mark": "bar",
                    "encoding": {
                      "color": {
                        "condition": {
                          "field": "event_type",
                          "scale": {
                            "domain": [
                              "Discourse",
                              "GitHub open issue",
                              "Google Docs",
                              "Mozilla Blog",
                              "Telegram chat",
                              "Vydio conference + etherpad"
                            ],
                            "range": [
                              "#4c78a8",
                              "#f58518",
                              "#e45756",
                              "#72b7b2",
                              "#54a24b",
                              "#eeca3b"
                            ]
                          },
                          "title": "",
                          "type": "nominal",
                          "selection": "selector241"
                        },
                        "value": "grey"
                      },
                      "x": {
                        "aggregate": "count",
                        "axis": {
                          "domain": false,
                          "orient": "bottom",
                          "ticks": false,
                          "title": "# of interactions per source"
                        },
                        "field": "content",
                        "title": "",
                        "type": "quantitative"
                      },
                      "y": {
                        "axis": {
                          "domain": false,
                          "offset": 5,
                          "orient": "right",
                          "ticks": false,
                          "title": ""
                        },
                        "field": "source",
                        "sort": {
                          "field": "source",
                          "op": "count",
                          "order": "descending"
                        },
                        "type": "nominal"
                      }
                    },
                    "height": 250,
                    "transform": [{"filter": {"selection": "selector239"}}],
                    "width": 150
                  }
                ]
              }
            ],
            "spacing": 0
          },
          {
            "hconcat": [
              {
                "layer": [
                  {
                    "mark": {"type": "tick", "color": "gray"},
                    "encoding": {
                      "x": {
                        "field": "date",
                        "timeUnit": "yearmonthdate",
                        "title": "",
                        "type": "temporal"
                      }
                    },
                    "height": 50,
                    "selection": {
                      "selector239": {
                        "type": "interval",
                        "encodings": ["x"],
                        "empty": "all"
                      }
                    },
                    "width": 600
                  },
                  {
                    "mark": "tick",
                    "encoding": {
                      "color": {
                        "condition": {
                          "field": "event_type",
                          "scale": {
                            "domain": [
                              "Discourse",
                              "GitHub open issue",
                              "Google Docs",
                              "Mozilla Blog",
                              "Telegram chat",
                              "Vydio conference + etherpad"
                            ],
                            "range": [
                              "#4c78a8",
                              "#f58518",
                              "#e45756",
                              "#72b7b2",
                              "#54a24b",
                              "#eeca3b"
                            ]
                          },
                          "title": "",
                          "type": "nominal",
                          "selection": "selector239"
                        },
                        "value": "grey"
                      },
                      "x": {
                        "field": "date",
                        "timeUnit": "yearmonthdate",
                        "title": "",
                        "type": "temporal"
                      }
                    },
                    "height": 50,
                    "transform": [{"filter": {"selection": "selector239"}}],
                    "width": 600
                  }
                ]
              },
              {
                "mark": "rect",
                "encoding": {
                  "color": {
                    "condition": {
                      "field": "event_type",
                      "scale": {
                        "domain": [
                          "Discourse",
                          "GitHub open issue",
                          "Google Docs",
                          "Mozilla Blog",
                          "Telegram chat",
                          "Vydio conference + etherpad"
                        ],
                        "range": [
                          "#4c78a8",
                          "#f58518",
                          "#e45756",
                          "#72b7b2",
                          "#54a24b",
                          "#eeca3b"
                        ]
                      },
                      "title": "",
                      "type": "nominal",
                      "selection": "selector241"
                    },
                    "value": "grey"
                  },
                  "y": {
                    "axis": {"orient": "right", "title": "Filter by platform"},
                    "field": "event_type",
                    "type": "nominal"
                  }
                },
                "selection": {
                  "selector241": {
                    "type": "multi",
                    "fields": ["event_type"],
                    "resolve": "union"
                  }
                }
              }
            ]
          }
        ]
    }

      return ( 
              <div id='vis'></div>
      )
  });

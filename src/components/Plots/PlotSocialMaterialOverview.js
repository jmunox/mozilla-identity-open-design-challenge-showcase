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
                              "selection": "selector004"
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
                        "transform": [{"filter": {"selection": "selector002"}}],
                        "width": 800
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
                              "selection": "selector004"
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
                        "transform": [{"filter": {"selection": "selector002"}}],
                        "width": 800
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
                          "selection": "selector004"
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
                    "transform": [{"filter": {"selection": "selector002"}}],
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
                              "selection": "selector004"
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
                        "transform": [{"filter": {"selection": "selector002"}}],
                        "width": 800
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
                          "selection": "selector004"
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
                    "transform": [{"filter": {"selection": "selector002"}}],
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
                      "selector002": {
                        "type": "interval",
                        "encodings": ["x"],
                        "empty": "all"
                      }
                    },
                    "width": 800
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
                          "selection": "selector002"
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
                    "transform": [{"filter": {"selection": "selector002"}}],
                    "width": 800
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
                      "selection": "selector004"
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
                  "selector004": {
                    "type": "multi",
                    "fields": ["event_type"],
                    "resolve": "union"
                  }
                }
              }
            ]
          }
        ],
    }

      return ( 
              <div id='vis'></div>
      )
  });

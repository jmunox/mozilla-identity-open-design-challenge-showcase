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
      const result =  embed('#vis', spec3);
      console.log(result)
      //vegaEmbed('#vis', spec);
  }, [isLoading]);

    const spec = {
      "width": 1000,
      "height": 325,
      "padding": "strict",
      "data": [
        {
          "name": "mozilla",
          "values": isEmpty(props.searchQuery) ? items : visibleItems,
          "transform": [
            {"type": "formula", "as": "hour", "expr": "hours(datum.date)"},
            {
              "type": "formula",
              "as": "day",
              "expr": "datetime((month(datum.date)+1) + '/' + date(datum.date) + '/2001')"
            },
            {
              "type": "bin",
              "field": "hour",
              "extent": [0, 24],
              "step": 1,
              "output": {"start": "bin_hour"}
            },
            {
              "type": "aggregate",
              "field": "name",
              "ops": "distinct",
              "extent": [0, 500],
              "output": {"start": "bin_name"}
            },
            {
              "type": "bin",
              "field": "contentLength",
              "min": 0,
              "max": 30000,
              "step": 50,
              "output": {"start": "bin_dist"}
            }
          ]
        },
        {
          "name": "times",
          "source": "mozilla",
          "transform": [
            {"type": "filter", "test": "(minDay == maxDay || (datum.day >= minDay && datum.day <= maxDay)) && (minDist == maxDist || (datum.contentLength >= minDist && datum.contentLength <= maxDist)) && (minDelay == maxDelay || (datum.name >= minDelay && datum.name <= maxDelay))"},
            {
              "type": "aggregate",
              "groupby": ["bin_hour"],
              "summarize": {"name": ["count"]}
            }
          ]
        },
        {
          "name": "name",
          "source": "mozilla",
          "transform": [
            {"type": "filter", "test": "(minDay == maxDay || (datum.day >= minDay && datum.day <= maxDay)) && (minDist == maxDist || (datum.contentLength >= minDist && datum.contentLength <= maxDist)) && (minTime == maxTime || (datum.hour >= minTime && datum.hour <= maxTime)) && datum.bin_name <= 140"},
            {
              "type": "aggregate",
              "groupby": ["bin_name"],
              "summarize": {"name": ["count"]}
            }
          ]
        },
        {
          "name": "contentLength",
          "source": "mozilla",
          "transform": [
            {"type": "filter", "test": "(minDay == maxDay || (datum.day >= minDay && datum.day <= maxDay)) && (minDelay == maxDelay || (datum.name >= minDelay && datum.name <= maxDelay)) && (minTime == maxTime || (datum.hour >= minTime && datum.hour <= maxTime)) && datum.bin_dist <= 2000"},
            {
              "type": "aggregate",
              "groupby": ["bin_dist"],
              "summarize": {"name": ["count"]}
            }
          ]
        },
        {
          "name": "date",
          "source": "mozilla",
          "transform": [
            {"type": "filter", "test": "(minDist == maxDist || (datum.contentLength >= minDist && datum.contentLength <= maxDist)) && (minDelay == maxDelay || (datum.name >= minDelay && datum.name <= maxDelay)) && (minTime == maxTime || (datum.hour >= minTime && datum.hour <= maxTime)) && datum.day < datetime('4/1/2001')"},
            {
              "type": "aggregate",
              "groupby": ["day"],
              "summarize": {"name": ["count"]}
            }
          ]
        }
      ],
    
      "signals": [
        {
          "name": "scope",
          "init": {"width": 0},
          "streams": [
            {"type": "mousedown", "expr": "eventGroup()"}
          ]
        },
        {
          "name": "timesStart",
          "init": -1,
          "streams": [{
            "type": "@timesGroup:mousedown",
            "expr": "eventX(scope)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {
          "name": "timesEnd",
          "init": -1,
          "streams": [{
            "type": "@timesGroup:mousedown, [@timesGroup:mousedown, window:mouseup] > window:mousemove",
            "expr": "clamp(eventX(scope), 0, scope.width)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {"name": "minTime", "expr": "max(min(timesStart, timesEnd), 0)"},
        {"name": "maxTime", "expr": "min(max(timesStart, timesEnd), 24)"},
    
        {
          "name": "nameStart",
          "init": -1,
          "streams": [{
            "type": "@nameGroup:mousedown",
            "expr": "eventX(scope)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {
          "name": "nameEnd",
          "init": -1,
          "streams": [{
            "type": "@nameGroup:mousedown, [@nameGroup:mousedown, window:mouseup] > window:mousemove",
            "expr": "clamp(eventX(scope), 0, scope.width)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {"name": "minDelay", "expr": "max(min(nameStart, nameEnd), -60)"},
        {"name": "maxDelay", "expr": "min(max(nameStart, nameEnd), 140)"},
    
        {
          "name": "distStart",
          "init": -1,
          "streams": [{
            "type": "@distGroup:mousedown",
            "expr": "eventX(scope)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {
          "name": "distEnd",
          "init": -1,
          "streams": [{
            "type": "@distGroup:mousedown, [@distGroup:mousedown, window:mouseup] > window:mousemove",
            "expr": "clamp(eventX(scope), 0, scope.width)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {"name": "minDist", "expr": "max(min(distStart, distEnd), 0)"},
        {"name": "maxDist", "expr": "min(max(distStart, distEnd), 2000)"},
    
        {
          "name": "dayStart",
          "streams": [{
            "type": "@dayGroup:mousedown",
            "expr": "eventX(scope)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {
          "name": "dayEnd",
          "streams": [{
            "type": "@dayGroup:mousedown, [@dayGroup:mousedown, window:mouseup] > window:mousemove",
            "expr": "clamp(eventX(scope), 0, scope.width)",
            "scale": {"scope": "scope", "name": "x", "invert": true}
          }]
        },
        {"name": "minDay", "expr": "max(min(dayStart, dayEnd), datetime('Jan 1 2001'))"},
        {"name": "maxDay", "expr": "min(max(dayStart, dayEnd), datetime('Mar 31 2021')) || datetime('Mar 31 2021')"}
      ],
    
      "marks": [
        {
          "name": "timesGroup",
          "type": "group",
    
          "properties": {
            "update": {
              "x": {"value": 0},
              "width": {"value": 250},
              "y": {"value": 0},
              "height": {"value": 100},
              "fill": {"value": "#fff"}
            }
          },
    
          "scales": [
            {
              "name": "x",
              "type": "linear",
              "range": "width",
              "domain": [0, 24]
            },
            {
              "name": "y",
              "type": "linear",
              "range": "height",
              "domain": {"data": "times", "field": "count_name"}
            }
          ],
    
          "axes": [{"type": "x", "scale": "x"}],
    
          "marks": [
            {
              "type": "rect",
              "from": {"data": "times"},
              "properties": {
                "update": {
                  "x": {"scale": "x", "field": "bin_hour"},
                  "width": {"value": 9.5},
                  "y": {"scale": "y", "field": "count_name"},
                  "y2": {"scale": "y", "value": 0},
                  "fill": [
                    {
                      "test": "timesStart == timesEnd || inrange(datum.bin_hour, timesStart, timesEnd)",
                      "value": "steelblue"
                    },
                    {"value": "#bbb"}
                  ]
                }
              }
            },
            {
              "type": "text",
              "properties": {
                "enter": {
                  "x": {"value": 0},
                  "y": {"value": -10},
                  "text": {"value": "Time of Day"},
                  "fill": {"value": "black"},
                  "fontSize": {"value": 14},
                  "fontWeight": {"value": "bold"}
                }
              }
            },
    
            {
              "type": "rect",
              "properties": {
                "enter": {
                  "fill": {"value": "grey"},
                  "fillOpacity": {"value": 0.2}
                },
                "update": {
                  "x": {"scale": "x", "signal": "timesStart"},
                  "x2": {"scale": "x", "signal": "timesEnd"},
                  "y": {"value": 0},
                  "y2": {"field": {"group": "height"}}
                }
              }
            }
          ]
        },
    
        {
          "name": "nameGroup",
          "type": "group",
    
          "properties": {
            "update": {
              "x": {"value": 290},
              "width": {"value": 210},
              "y": {"value": 0},
              "height": {"value": 100},
              "fill": {"value": "#fff"}
            }
          },
    
          "scales": [
            {
              "name": "x",
              "type": "linear",
              "range": "width",
              "domain": [-60, 140]
            },
            {
              "name": "y",
              "type": "linear",
              "range": "height",
              "domain": {"data": "name", "field": "count_name"}
            }
          ],
    
          "axes": [{"type": "x", "scale": "x"}],
    
          "marks": [
            {
              "type": "rect",
              "from": {"data": "name"},
              "properties": {
                "update": {
                  "x": {"scale": "x", "field": "bin_name"},
                  "width": {"value": 9.5},
                  "y": {"scale": "y", "field": "count_name"},
                  "y2": {"scale": "y", "value": 0},
                  "fill": [
                    {
                      "test": "nameStart == nameEnd || inrange(datum.bin_name, nameStart, nameEnd)",
                      "value": "steelblue"
                    },
                    {"value": "#bbb"}
                  ]
                }
              }
            },
            {
              "type": "text",
              "properties": {
                "enter": {
                  "x": {"value": 0},
                  "y": {"value": -10},
                  "text": {"value": "Delay (min.)"},
                  "fill": {"value": "black"},
                  "fontSize": {"value": 14},
                  "fontWeight": {"value": "bold"}
                }
              }
            },
            {
              "type": "rect",
              "properties": {
                "enter": {
                  "fill": {"value": "grey"},
                  "fillOpacity": {"value": 0.2}
                },
                "update": {
                  "x": {"scale": "x", "signal": "nameStart"},
                  "x2": {"scale": "x", "signal": "nameEnd"},
                  "y": {"value": 0},
                  "y2": {"field": {"group": "height"}}
                }
              }
            }
          ]
        },
    
        {
          "name": "distGroup",
          "type": "group",
    
          "properties": {
            "update": {
              "x": {"value": 540},
              "width": {"value": 420},
              "y": {"value": 0},
              "height": {"value": 100},
              "fill": {"value": "#fff"}
            }
          },
    
          "scales": [
            {
              "name": "x",
              "type": "linear",
              "range": "width",
              "domain": [0, 2000]
            },
            {
              "name": "y",
              "type": "linear",
              "range": "height",
              "domain": {"data": "contentLength", "field": "count_name"}
            }
          ],
    
          "axes": [{"type": "x", "scale": "x"}],
    
          "marks": [
            {
              "type": "rect",
              "from": {"data": "contentLength"},
              "properties": {
                "update": {
                  "x": {"scale": "x", "field": "bin_dist"},
                  "width": {"value": 9.5},
                  "y": {"scale": "y", "field": "count_name"},
                  "y2": {"scale": "y", "value": 0},
                  "fill": [
                    {
                      "test": "distStart == distEnd || inrange(datum.bin_dist, distStart, distEnd)",
                      "value": "steelblue"
                    },
                    {"value": "#bbb"}
                  ]
                }
              }
            },
            {
              "type": "text",
              "properties": {
                "enter": {
                  "x": {"value": 0},
                  "y": {"value": -10},
                  "text": {"value": "Distance (mi.)"},
                  "fill": {"value": "black"},
                  "fontSize": {"value": 14},
                  "fontWeight": {"value": "bold"}
                }
              }
            },
            {
              "type": "rect",
              "properties": {
                "enter": {
                  "fill": {"value": "grey"},
                  "fillOpacity": {"value": 0.2}
                },
                "update": {
                  "x": {"scale": "x", "signal": "distStart"},
                  "x2": {"scale": "x", "signal": "distEnd"},
                  "y": {"value": 0},
                  "y2": {"field": {"group": "height"}}
                }
              }
            }
          ]
        },
    
        {
          "name": "dayGroup",
          "type": "group",
    
          "properties": {
            "update": {
              "x": {"value": 0},
              "width": {"value": 920},
              "y": {"value": 150},
              "height": {"value": 100},
              "fill": {"value": "#fff"}
            }
          },
    
          "scales": [
            {
              "name": "x",
              "type": "time",
              "range": "width",
              "domain": {"data": "date", "field": "day"}
            },
            {
              "name": "y",
              "type": "linear",
              "range": "height",
              "domain": {"data": "date", "field": "count_name"}
            }
          ],
    
          "axes": [{"type": "x", "scale": "x"}],
    
          "marks": [
            {
              "type": "rect",
              "from": {"data": "date"},
              "properties": {
                "update": {
                  "x": {"scale": "x", "field": "day"},
                  "width": {"value": 9.5},
                  "y": {"scale": "y", "field": "count_name"},
                  "y2": {"scale": "y", "value": 0},
                  "fill": [
                    {
                      "test": "!dayStart || time(dayStart) == time(dayEnd) || inrange(datum.day, dayStart, dayEnd)",
                      "value": "steelblue"
                    },
                    {"value": "#bbb"}
                  ]
                }
              }
            },
            {
              "type": "text",
              "properties": {
                "enter": {
                  "x": {"value": 0},
                  "y": {"value": 0},
                  "text": {"value": "Date"},
                  "fill": {"value": "black"},
                  "fontSize": {"value": 14},
                  "fontWeight": {"value": "bold"}
                }
              }
            },
            {
              "type": "rect",
              "properties": {
                "enter": {
                  "fill": {"value": "grey"},
                  "fillOpacity": {"value": 0.2}
                },
                "update": {
                  "x": {"scale": "x", "signal": "dayStart"},
                  "x2": {"scale": "x", "signal": "dayEnd"},
                  "y": {"value": 0},
                  "y2": {"field": {"group": "height"}}
                }
              }
            }
          ]
        }
      ]
    }
    

    const spec3 = {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "description": "A calendar visualization of daily changes to the S&P 500 since 2000.",
      "padding": 5,
    
      "signals": [
        {"name": "step", "value": 16},
        {"name": "offset", "value": 10},
        {"name": "width", "update": "step * 52 + offset * 11"},
        {"name": "height", "update": "step * 5"},
        {
          "name": "scheme", "value": "pinkyellowgreen",
          "bind": {
            "input": "select",
            "options": [
              "pinkyellowgreen",
              "blueorange",
              "brownbluegreen",
              "purplegreen",
              "purpleorange",
              "redblue",
              "redgrey",
              "redyellowblue",
              "redyellowgreen",
              "spectral"
            ]
          }
        }
      ],
    
      "data": [
        {
          "name": "mozilla",
          "values": isEmpty(props.searchQuery) ? items : visibleItems,
          "transform": [
            {
              "type": "window",
              "sort": {"field": "date", "order": "ascending"},
              "ops": ["lag"],
              "fields": ["contentLength"],
              "as": ["prev"]
            },
            {
              "type": "formula",
              "expr": "datum.prev ? (datum.contentLength - datum.prev) / datum.prev : 0",
              "as": "value"
            },
            {
              "type": "formula",
              "expr": "year(datum.date)",
              "as": "year"
            },
            {
              "type": "timeunit", "field": "date",
              "units": ["year", "week"],
              "as": ["w0", "w1"]
            },
            {"type": "formula", "expr": "timeOffset('day', datum.w0)", "as": "w0"},
            {
              "type": "timeunit", "field": "date",
              "units": ["day"],
              "as": [["d0"], ["d1"]]
            }
          ]
        }
      ],
    
      "scales": [
        {
          "name": "y",
          "type": "band",
          "domain": {"data": "mozilla", "field": "d0", "sort": true},
          "range": {"step": {"signal": "step"}}
        },
        {
          "name": "color",
          "type": "linear",
          "clamp": true,
          "range": {"scheme": {"signal": "scheme"}},
          "domain": [-0.06, 0, 0.06]
        }
      ],
    
      "legends": [
        {
          "fill": "color",
          "title": "Daily Change, S&P 500",
          "titleFontSize": 12,
          "titleOrient": "left",
          "titlePadding": 20,
          "offset": 15,
          "orient": "top",
          "type": "gradient",
          "direction": "horizontal",
          "gradientLength": 250,
          "gradientThickness": 10,
          "format": "%"
        }
      ],
    
      "layout": {
        "columns": 1,
        "padding": 15
      },
    
      "marks": [
        {
          "type": "group",
    
          "from": {
            "facet": {
              "data": "mozilla",
              "name": "values",
              "groupby": "year"
            }
          },
    
          "sort": {
            "field": "datum.year",
            "order": "descending"
          },
    
          "data": [
            {
              "name": "max",
              "source": "values",
              "transform": [
                {"type": "aggregate", "ops": ["max"], "fields": ["date"]}
              ]
            },
            {
              "name": "weeks",
              "transform": [
                {"type": "sequence", "start": 0, "stop": 53, "as": "weeknum"},
                {"type": "formula", "expr": "datetime(parent.year, 0, 1 + datum.weeknum * 7)", "as": "date"},
                {"type": "timeunit", "units": ["year", "week"], "field": "date", "as": ["w0", "w1"]},
                {"type": "formula", "expr": "timeOffset('day', datum.w0)", "as": "w0"},
                {"type": "filter", "expr": "datum.date < data('max')[0].max_date"}
              ]
            }
          ],
    
          "scales": [
            {
              "name": "x",
              "type": "band",
              "domain": {"data": "weeks", "field": "w0", "sort": true},
              "range": {"step": {"signal": "step"}}
            }
          ],
    
          "axes": [
            {
              "orient": "left", "scale": "y",
              "ticks": false, "domain": false, "labelPadding": 8,
              "format": "%a", "formatType": "time",
              "title": {"signal": "parent.year"},
              "titleAngle": 0, "titleAlign": "right",
              "titleX": -8, "titleY": -2,  "titleFontSize": 10
            },
            {
              "orient": "top", "scale": "x",
              "ticks": false, "domain": false,
              "format": "%b", "formatType": "time",
              "labelAlign": "left",
              "encode": {
                "labels": {
                  "update": {
                    "x": {
                      "scale": "x", "field": "value", "band": 0,
                      "offset": {"signal": "month(datum.value) * offset"}
                    },
                    "opacity": {"signal": "date(datum.value) < 8 ? 1 : 0"}
                  }
                }
              }
            }
          ],
    
          "marks": [
            {
              "type": "rect",
              "from": {"data": "values"},
              "encode": {
                "enter": {
                  "x": {"scale": "x", "field": "w0", "offset": {"signal": "month(datum.date) * offset"}},
                  "width": {"scale": "x", "band": 1, "offset": -1},
                  "y": {"scale": "y", "field": "d0"},
                  "height": {"scale": "y", "band": 1, "offset": -1},
                  "cornerRadius": {"value": 2},
                  "tooltip": {"signal": "timeFormat(datum.date, '%a %b %d, %Y') + '\\n' + format(datum.value, '+.2%')"}
                },
                "update": {
                  "fill": {"scale": "color", "field": "value"}
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
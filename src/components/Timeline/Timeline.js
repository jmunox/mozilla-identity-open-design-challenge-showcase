import React, { useState, useEffect } from 'react';
import { store, view } from 'react-easy-state';
import classNames from 'classnames';
import { useDebounce } from 'utils/Hook';
import TimelineItem from './TimelineItem';

import * as css from './Timeline.scss';

import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

/* 
* Timeline visualization based on https://github.com/arunghosh/react-time-line
* Original: https://github.com/arunghosh/react-time-line/blob/master/src/Timeline.jsx
* Adapted to use Bulma cards
*/
export default view(({ items, format = 'HH:mm:ss', scroll }) => {

    const activities = getFormattedData(items, format);
    const dates = Object.keys(activities);
    return (
      <div className={classNames(/*css.tile, css.isAncestor,*/css.columns, css.isDesktop, css.timeLineCtnr)} >
        <div className={classNames(/*css.tile, css.isParent, css.isVertical*/ css.column, css.isThreeQuarters)}>
        {dates.map( (d, index) => (
          <div className={classNames(/*css.tile, css.is11*/)}>
          <ul id={d.toLowerCase().replace(/ /g, '-')} className={classNames(css.timeLine, css.pb5)} key={d}>
            <li className={classNames(css.subtitle, css.timeLabel)}>
            <span>{d}</span>
          </li>
            {activities[d] &&
              activities[d].map(({time, item, key}) => (
                <li id={time} className={classNames(css.media, css.pb2)} key={key}>
                  <i className={css.fa} />
                  <div className={classNames(css.timeLineItem)}>
                  <div className={classNames(css.timeLineHeader)}>              
                    <TimelineItem item={item} key={key} />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {scroll && (dates.length-1)===index && document.getElementById(scroll) && document.getElementById(useDebounce(scroll, 1000)).scrollIntoView({ behavior: 'smooth', block: 'start' }) }
          </div>
          ))}
        </div>
      </div>
    )
  });

  /**
 * Converts array of events in to object having date as the key and list of
 * event for that date as the value
 *
 * @param {Array} items Array of events in the form of ts and text
 * @returns {Object} return object with key as date and values array in events for that date
 */
function getFormattedData(items, format = 'HH:mm:ss') {
  const activities = {};
  items.forEach((item, index) => {
    const date = dayjs(item.date).utc()
    const dateStr = date.format('DD MMM YYYY');
    const list = activities[dateStr] || [];
    list.push({
      time: date.format(),
      item: item,
      key: index,
    });
    activities[dateStr] = list;
  });
  return activities;
}
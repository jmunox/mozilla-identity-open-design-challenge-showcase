import * as React from 'react'
import { view } from 'react-easy-state'
import moment from 'moment';
import classNames from 'classnames'
import TimelineItem from './TimelineItem'

import * as css from './Timeline.scss'

/* 
* Timeline visualization based on https://github.com/arunghosh/react-time-line
* Original: https://github.com/arunghosh/react-time-line/blob/master/src/Timeline.jsx
* Adapted to use Bulma cards
*/

export default view(({items, format="hh:mm"}) => {

    const activities = getFormattedData(items, format);
    const dates = Object.keys(activities);
  
     //     
    return (
      <div className={classNames(css.container, css.timeLineCtnr)} >
        <div className={classNames(css.mozColumns)}>
        {dates.map(d => (
          <ul id={d} className={classNames(css.column, css.isFourFifths, css.timeLine)} key={d}>
            <li className={classNames(css.subtitle, css.timeLabel)}>
            <span>{d}</span>
          </li>
            {activities[d] &&
              activities[d].map(({time, event, key}) => (
                <li className={classNames(css.media)} key={key}>
                  <i className={css.fa} />
                  <div className={classNames(css.timeLineItem)}>
                  <div className={classNames(css.timeLineHeader)}>              
                    <TimelineItem event={event} key={key} />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          ))}
        </div>
      </div>
    )
  })

  /**
 * Converts array of events in to object having date as the key and list of
 * event for that date as the value
 *
 * @param {Array} items Array of events in the form of ts and text
 * @returns {Object} return object with key as date and values array in events for that date
 */
function getFormattedData(items, format="hh:mm") {
  const activities = {};
  items.forEach((item, index) => {
    const date = moment(item.date);
    const dateStr = date.format("DD MMM YYYY");
    const list = activities[dateStr] || [];
    list.push({
      time: date.format(format),
      event: item,
      key: index,
    });
    activities[dateStr] = list;
  });
  return activities;
}
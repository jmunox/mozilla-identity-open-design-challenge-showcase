import React, { useState, useEffect } from 'react';
import { view } from 'react-easy-state';
import classNames from 'classnames';
import { useDebounce } from 'utils/Hook';
import TimelineItem from './TimelineItem';
import ProgressIcon from './ProgressIcon';

import * as css from './Timeline.scss';

import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

/* 
* Timeline visualization based on https://github.com/arunghosh/react-time-line
* Original: https://github.com/arunghosh/react-time-line/blob/master/src/Timeline.jsx
* Adapted to use Bulma cards
* To add: https://codesandbox.io/s/framer-motion-viewport-scroll-and-svg-path-animation-mwi35?from-embed
*/
export default view(({ items, format = 'HH:mm:ss', scroll }) => {

    const activities = getFormattedData(items, format);
    const dates = Object.keys(activities);
    return (
      <div className='container py-3'>
        <div className={classNames('columns is-desktop', css.timeLineCtnr)} >
        <div className='column is-four-fifths-desktop'>
        {dates.map( (d, index) => (
          <div>
          <ul id={d.toLowerCase().replace(/ /g, '-')} className={classNames(css.timeLine, 'pb-6')} key={d}>
            <li className={classNames('subtitle pb-6', css.timeLabel)}>
            <span>{d}</span>
          </li>
            {activities[d] &&
              activities[d].map(({time, item, key}) => (
                <li id={time} className='media pb-6' key={key}>
                  <i className={css.fa} />
                  <div className={classNames(css.timeLineItem)}>
                  <div className={classNames(css.timeLineHeader)}>              
                    <TimelineItem item={item} key={key} />
                    </div>
                  </div>
                </li>
              ))}
            <li className=''>
            <span></span>
          </li>
          </ul>
          {scroll && (dates.length-1)===index && document.getElementById(scroll) && document.getElementById(useDebounce(scroll, 1000)).scrollIntoView({ behavior: 'smooth', block: 'start' }) }
          </div>
          ))}
        </div>
        <ProgressIcon/>
        <ScrollToTopButton></ScrollToTopButton>
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

/** 
 * https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
*/
const ScrollToTopButton = view(() => {

  const [visibility, setVisibility] = useState('is-hidden');

  useEffect(() => {
    const scrollHandler = () => {
    (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? setVisibility('is-block') : setVisibility ('is-hidden');
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  function scrollToTopFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return(
    <React.Fragment>
      <button className={classNames('button is-primary', css.scrollTopButton,  visibility)} onclick={scrollToTopFunction} title="Go to top"><i class="fas fa-chevron-up"></i>&nbsp;Top</button>
    </React.Fragment>
  );
});
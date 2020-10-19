import React, { useEffect, useRef, useCallback } from 'react'
import { store, view } from 'react-easy-state'
import eventStore from 'stores/eventStore'
import classNames from 'classnames'

import Timeline from 'components/Timeline/Timeline';

import * as css from './Home.scss'

const counter = store({
  num: 1,
  increment: () => counter.num++
})

export default view(() => {
  const { isLoading, items, /*create, remove,*/ fetchScrollItems } = eventStore
  //console.log(counter.num)
  useEffect(() => {
    fetchScrollItems(counter.num)
  }, [counter.num]);

  // implement infinite scrolling with intersection observer
let bottomBoundaryRef = useRef(null);
const scrollObserver = useCallback(
  node => {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          counter.increment();
        }
      });
    }).observe(node);
  },
  [counter.increment]
);
useEffect(() => {
  if (bottomBoundaryRef.current) {
    scrollObserver(bottomBoundaryRef.current);
  }
}, [scrollObserver, bottomBoundaryRef]);

  return (
    <div className={css.container}>
      <div className={css.title}>Designing the Mozilla Identity.</div>
      <Timeline items={items} />
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
      { isLoading && (<span>Loading...</span>)}
    </div>
  )
})

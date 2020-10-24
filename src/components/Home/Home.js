import React, { useState, useEffect, useRef, useCallback } from 'react';
import { store, view } from 'react-easy-state';
import eventStore from 'stores/eventStore';
import classNames from 'classnames';
import memoize from 'fast-memoize';
import { useDebounce } from 'utils/Hook';

import Timeline from 'components/Timeline/Timeline';

import * as css from './Home.scss';

const isEmpty = (value) => {
  if (value) {
      if (value.trim().length>1) return false;
      else return true;
  }
  else return true;
}

export default view((props) => {
  document.body.className = css.hasNavbarFixedTop; //['has-navbar-fixed-top']
  const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch } = eventStore;
  //counter for loading data while scrolling
  const counter = store({
    num: 0,
    increment: () => counter.num++,
    reset: () => counter.num = 0,
    timer: null
  });

  //counter for loading data while scrolling
  const search = store({
    query: '',
  });
  const fastSearch = memoize(fetchAndSearch);
  const debouncedText = useDebounce(search.query, 1000);
  
  function lazyLoading() {
    limitedFetch({limit: 10**counter.num});
    counter.increment();
  };

  // useEffect(() => {
 //   limitedFetch({limit: 10**counter.num});
 // }, [counter.num]); //

  useEffect(() => {
    if(!isEmpty(debouncedText)) 
      fastSearch({searchQuery: debouncedText});
    else if(!props.header || props.header === 'home' || props.header === 'undefined') {
      limitedFetch({limit: 10**counter.num});
    } else if(props.header)  {
      fetch()
      /*if(counter.timer===null) counter.timer = setInterval(lazyLoading, 500);
      if(counter.num>6) {
        clearInterval(counter.timer);
      }*/
    }

  },[counter.num, debouncedText]);
 
  
/*
// working search
  const onSearch = debounce(event => {
    search.query = event.target.value
    if(!isEmpty(search.query)) fastSearch({searchQuery: search.query})
  }, 250) 
 */

  // implement infinite scrolling with intersection observer
let bottomBoundaryRef = useRef(null);
const scrollObserver = useCallback(
  node => {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          if (!isLoading && !isSearching && isEmpty(search.query)) {
            counter.increment();
          }
          
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
    <div id='home' className={css.container}>
      <nav className={classNames(css.navbar, css.isFixedTop)} role='navigation' aria-label='main navigation'>
      <div className={css.navbarBrand}>
      <div class={classNames(css.navbarItem, css.field)}>
        <div class={css.control}>
          <input class={classNames(css.input, css.isBlack)} 
          type='text'
          placeholder='Search'
          value={search.query}
          onChange={event => (search.query = event.target.value)}
          />
        </div>
      </div>
        <div className={css.navbarEnd}>
        <div className={classNames(css.navbarItem, css.field)}>
          About
        </div>
        </div>
      </div>
    </nav>
      <div className={css.title}>Designing the Mozilla brand identity.</div>
      <div className=''>
    <p>
    {
      !isSearching && !isEmpty(search.query) && !visibleItems.length ? <div className={css.subtitle} aria-label='No matching data found for {search.query}' >No matching data found for {search.query}</div> :
      isSearching && !isEmpty(search.query) ? <div className={css.subtitle} aria-label='... Searching for {search.query}' >Searching for: {search.query}</div> :
      !isSearching && !isEmpty(debouncedText) && visibleItems.length ? <div className={css.subtitle} aria-label='{visibleItems.length} matching results for {search.query}' >{visibleItems.length} matching results for {search.query}</div> : 
     <br/>
     }
    </p>
</div>
      <Timeline items={visibleItems} scroll={props.header ? props.header : null} />
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
      { (isLoading && !isSearching) && (<span aria-label='Loading more data' >Loading...</span>)}
    </div>
  )
})

const ResultsHeader = ({id, source, event}) => {
  //return()
};

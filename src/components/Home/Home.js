import React, { useState, useEffect, useRef, useCallback } from 'react';
import { store, view } from 'react-easy-state';
import { NavLink } from 'react-router-dom';
import eventStore from 'stores/eventStore';
import classNames from 'classnames';
import memoize from 'fast-memoize';
import { useDebounce } from 'utils/Hook';
import PlotNav from 'components/Plots/PlotNav';

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
  const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch, fetchAll } = eventStore;
  //counter for loading data while scrolling
  const counter = store({
    num: 0,
    increment: () => counter.num++,
    reset: () => counter.num = 0,
    timer: null,
    firstLoad: false
  });

  const { path } = props.match;

  const search = store({
    query: '',
    date: props.dateHeader,
  });
  const fastSearch = memoize(fetchAndSearch);
  let debouncedText = useDebounce(search.query, 1000);
  
  function lazyLoading() {
    limitedFetch({limit: 10**counter.num});
    counter.increment();
  };

  // useEffect(() => {
 //   limitedFetch({limit: 10**counter.num});
 // }, [counter.num]); //

  useEffect(() => {
    if(!counter.firstLoad){
      fetchAll();
      counter.firstLoad = true;
    }
    if(!isEmpty(debouncedText)) {
      fastSearch({searchQuery: debouncedText});
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      search.date = null;
    } else if(props.dateHeader && props.dateHeader !== 'home' && props.dateHeader !== 'null'  && props.dateHeader !== 'undefined')  {
        search.date = props.dateHeader;
      //fetch();
      if(counter.timer===null) counter.timer = setInterval(lazyLoading, 500);
      if(counter.num>6) clearInterval(counter.timer);
    } else limitedFetch({limit: 10**counter.num});
    
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
    <>
  <section className='hero is-primary'>
    <div className='hero-head is-fixed-top has-background-primary'>
    <div className=''>  
    
    <div className='container px-6'>
    <div className='control'>
          <input className={classNames('input is-black', css.searchBar)} 
          type='text'
          placeholder='Search'
          value={search.query}
          onChange={event => (search.query = event.target.value)}
          />
        </div>
      
    <p className='mt-3'>
    {
      !isSearching && !isEmpty(search.query) && !visibleItems.length ? <div className='subtitle' aria-label='No matching data found for {search.query}' >No matching data found for {search.query}</div> :
      isSearching && !isEmpty(search.query) ? <div className='subtitle' aria-label='... Searching for {search.query}' >Searching for: {search.query}</div> :
      !isSearching && !isEmpty(debouncedText) && visibleItems.length ? <div className='subtitle' aria-label='{visibleItems.length} matching results for {debouncedText}' >{visibleItems.length} matching results for {debouncedText}</div> : <div className='pb-5'/> 
    }
     {<progress className={classNames('progress is-info is-small mb-5', (!isLoading)? 'is-hidden' : '')} max='100'>30%</progress>}
    </p>
  </div>
  </div>
  </div>

  <div className='hero-body'>
    <div className='container has-text-centered px-6'>
    <PlotNav searchQuery={debouncedText}/>
    </div>
  </div>
  <div className='hero-foot'>
    <nav className='tabs'>
      <div className='container'>
        <ul>
        <li><NavLink exact to={`${path}`} activeClassName='button is-info'>Overview</NavLink></li>
          <li><NavLink to={`${path}/plot/1`} activeClassName='button is-info'>Plot 1</NavLink></li>
          <li><NavLink to={`${path}/plot/2`} activeClassName='button is-info'>Plot 2</NavLink></li>
          <li><NavLink to={`${path}/plot/3`} activeClassName='button is-info'>Plot 3</NavLink></li>
          <li><a>Plot 4</a></li>
          <li><a>Plot 5</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>
    <div id='home' className='container is-fullhd'>

      <Timeline items={visibleItems} scroll={search.date ? search.date.toLowerCase() : null} />
      <section className='section'>
      <div className='container px-6 ml-3'>
      <div id='page-bottom-boundary' style={{ border: '1px solid #00d1b2' }} ref={bottomBoundaryRef}></div>
      { (isLoading && !isSearching) && (
      <div>
      <span className='subtitle' aria-label='Loading more data' >Loading more data...</span>
      <progress className={classNames('progress is-info is-small mb-5', (!isLoading)? 'is-hidden' : '')} max='100'>30%</progress>
      </div>
      )}

      </div>
      </section>
    </div>
    </>
    
  )
});


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { store, view } from 'react-easy-state';
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
    <section className='container pt-3'>
      <div className=''>
        <div className='columns is-multiline'>  
          <div className='column is-full px-4'>
          <div className='control has-icons-left'>
                <input className={classNames('input is-black is-medium', css.searchBar)} 
                type='text'
                placeholder='Search'
                value={search.query}
                onChange={event => (search.query = event.target.value)}
                />
                <span class="icon is-left is-medium">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
              </div>
          {
            !isSearching && !isEmpty(search.query) && !visibleItems.length ? <div className='mt-3' aria-label={`No matching data found for ${search.query}`} >No matching data found for {search.query}</div> :
            isSearching && !isEmpty(search.query) ? <div className='mt-3' aria-label={`... Searching for ${search.query}`} >Searching for: {search.query}</div> :
            !isSearching && !isEmpty(debouncedText) && visibleItems.length ? <div className='mt-3' aria-label={`${visibleItems.length} matching results for ${debouncedText}`} >{visibleItems.length} matching results for {debouncedText}</div> : <div className=''/> 
          }
          {<progress className={classNames('progress is-info is-small my-5', (!isLoading)? 'is-hidden' : '')} max='100'>30%</progress>}
        </div>
        <PlotNav {...props} searchQuery={debouncedText}/>
      </div>
    </div>
  </section>
  <section id='home' className='container is-fullhd'>
      <Timeline items={visibleItems} scroll={search.date ? search.date.toLowerCase() : null} />
  </section>
    <section className='section'>
      <div className='container px-4'>
      <div id='page-bottom-boundary' style={{ border: '1px solid #00d1b2' }} ref={bottomBoundaryRef}></div>
      { (isLoading && !isSearching) && (
      <div>
      <span className='subtitle' aria-label='Loading data...' >Loading data...</span>
      <progress className={classNames('progress is-info is-small mb-5', (!isLoading)? 'is-hidden' : '')} max='100'>30%</progress>
      </div>
      )}

      </div>
  </section>
    
    </>
    
  )
});


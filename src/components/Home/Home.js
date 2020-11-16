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
  document.body.className = 'has-navbar-fixed-top has-background-grey-lighter';
  const { isLoading, items, visibleItems, isSearching,/*create, remove,*/ limitedFetch, fetchAndSearch, fetch } = eventStore;
  //counter for loading data while scrolling
  const counter = store({
    num: 0,
    increment: () => counter.num++,
    reset: () => counter.num = 0,
    timer: null
  });

  const search = store({
    query: '',
    date: props.header,
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
          <nav className="navbar is-fixed-top is-primary level px-6">

            <div className='level-left'>
              <div className='level-item'>
                <nav className="breadcrumb is-large" aria-label="breadcrumbs">
                  <ul>
                    <li className=""><a className=' has-text-white' href="#">Showcases</a></li>
                    <li className="is-active "><a className=' has-text-white' href="#" aria-current="page">Designing the Mozilla brand identity</a></li>
                    <li className="is-hidden-desktop"><a className=' has-text-white' href="#">About</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='level-right px-6'>
              <a className={classNames("level-item has-text-white is-hidden-touch", css.about)}> About</a>
            </div>
          </nav>

    

  <section className="hero is-primary">
    <div className="hero-head is-fixed-top has-background-primary">
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
     {<progress className={classNames('progress is-info is-small mb-5', (!isLoading)? 'is-hidden' : '')} max="100">30%</progress>}
    </p>
  </div>
  </div>
  </div>

  <div class="hero-body">
    <div class="container has-text-centered px-6">
      <h1 class="title">
        chart
      </h1>
      <h2 class="subtitle">
        chart content
      </h2>
    </div>
  </div>
  <div class="hero-foot">
    <nav class="tabs">
      <div class="container">
        <ul>
          <li class="is-active"><a>Overview</a></li>
          <li><a>Plot 1</a></li>
          <li><a>Plot 2</a></li>
          <li><a>Plot 3</a></li>
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
      <progress className={classNames('progress is-info is-small mb-5', (!isLoading)? 'is-hidden' : '')} max="100">30%</progress>
      </div>
      )}

      </div>
      </section>
    </div>
    </>
    
  )
})

const ResultsHeader = ({id, source, event}) => {
  //return()
};

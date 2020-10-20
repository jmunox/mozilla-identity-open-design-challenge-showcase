import React, { useEffect, useRef, useCallback } from 'react'
import { store, view } from 'react-easy-state'
import eventStore from 'stores/eventStore'
import classNames from 'classnames'
import memoize from 'fast-memoize';
import debounce from 'tiny-debounce'

import Timeline from 'components/Timeline/Timeline';

import * as css from './Home.scss'

const isEmpty = (value) => {
  if(value){
      if(value.trim().length>2) return false;
      else return true
  }
  else return true
}

export default view(() => {
  const { isLoading, items, visibleItems, isSearching, isAllFetched,/*create, remove,*/ limitedFetch, fetchAndSearch } = eventStore
  const fastSearch = memoize(fetchAndSearch)
  //counter for loading data while scrolling
  const counter = store({
    num: 1,
    increment: () => counter.num++
  })

  //counter for loading data while scrolling
  const search = store({
    query: '',
  })

  useEffect(() => {
    if(!isAllFetched) limitedFetch({limit: counter.num*50});
  }, [counter.num]); //


// working search
  const onSearch = debounce(event => {
    search.query = event.target.value
    fastSearch({searchQuery: search.query})
  }, 300) 

  // implement infinite scrolling with intersection observer
let bottomBoundaryRef = useRef(null);
const scrollObserver = useCallback(
  node => {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          if(!isSearching && !isAllFetched) counter.increment();
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
      <div className={css.title}>Designing the Mozilla Identity. {search.query}</div>
      <div class={css.field}>
        <div class={css.control}>
          <input class={classNames(css.input, css.isPrimary)} 
          type='text'
          placeholder='Search' 
          onChange={onSearch}
          />
        </div>
      </div>
      <div className=''>
      <p>{ isSearching && (<span aria-label='Searching data' >Searching...</span>)}
      {!isSearching && !isEmpty(search.query) && !visibleItems.length ? <h3>No matching data found!</h3> : <br/>}
      </p>
        
  </div>
      
      <Timeline items={isEmpty(search.query) ? items : visibleItems } />
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
      { (isLoading && !isSearching) && (<span aria-label='Loading more data' >Loading...</span>)}
    </div>
  )
})

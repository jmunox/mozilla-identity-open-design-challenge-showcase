import { store } from 'react-easy-state'
import { reqGet, reqPost } from 'utils/Req'
import {slowSearch, fastSearch} from 'utils/Search'
import memoize from 'fast-memoize';

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const _store = store({
  isLoading: false,
  isSearching: false,
  isAllFetched: false,
  items: [{ name: 'Author 1', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }, { name: 'Author 2', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }],
  visibleItems: [],
  async fetch(options) {
    let query = !options ? '' : options
    _store.isLoading = true
    const { res } = await reqGet('events?'+query)
    _store.items = res
    _store.isLoading = false
  },
  async limitedFetch({limit = 10}) {
    let options = '_page=1&_limit='+limit
    _store.fetch(options)
  },
  async fetchAndSearch({searchQuery = ''}) {
    _store.isSearching = true
    if(!_store.isAllFetched){
      await _store.fetchAll()
    }
      const res = fastSearch({items : _store.allItems, searchQuery : searchQuery})
    _store.visibleItems = res
    _store.isSearching = false
    
  },
  async fetchAll() {
    _store.isLoading = true
    const { res } = await reqGet('events')
    _store.items = res
    _store.allItems = res
    _store.isLoading = false
    _store.isAllFetched = true
  },


})

export default _store

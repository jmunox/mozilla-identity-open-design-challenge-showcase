import { store } from 'react-easy-state'
import { reqGet, reqPost } from 'utils/Req'
import {slowSearch, fastSearch} from 'utils/Search'
import dompurify from 'dompurify';
//import ReactHtmlParser from 'react-html-parser';


import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// Example: https://github.com/solkimicreb/react-easy-state/tree/master/examples/todo-mvc

const _store = store({
  isLoading: false,
  isSearching: false,
  items: [],
  visibleItems: [], //[{ name: 'Author 1', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }, { name: 'Author 2', date: new Date(), content: 'Lorem ipsum', event_type: 'Random', source: '/#' }],
  async fetch(options) {
    let query = !options ? '' : options
    _store.isLoading = true
    const { res } = await reqGet('events?'+query)
    const sanitizedItems = getSanitizedData(res);
    _store.visibleItems = sanitizedItems
    _store.isLoading = false
  },
  async limitedFetch({limit = 10}) {
    let options = '_page=1&_limit='+limit
    _store.fetch(options)
  },
  async fetchAndSearch({searchQuery = ''}) {
    _store.isSearching = true
    _store.isLoading = true
    const { res } = await reqGet('events')
    const sanitizedItems = getSanitizedData(res);
    //_store.items = sanitizedItems
    const resultSearch = fastSearch({items : sanitizedItems, searchQuery : searchQuery})
    _store.visibleItems = resultSearch
    _store.isSearching = false
    _store.isLoading = false
  },
  async fetchAll() {
    _store.isLoading = true
    const { res } = await reqGet('events')
    const sanitizedItems = getSanitizedData(res);
    _store.items = sanitizedItems
    _store.isLoading = false
  },

})

function getSanitizedData(items) {
  const sanitizer = dompurify.sanitize;
  const sanitizedItems = [];
  items.forEach((item, index) => {
    const date = dayjs(item.date).utc();
    let content = sanitizer(item.content);
    item.content = content;
    item.contentLength = content.length;
    const contentInnerHTML = item.content//.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ''); //remove HTML tags
    item.match = date.format('DD-MMM-YYYY') + ' ' + date.format('DD MMM YYYY')+ ' ' + date.format('DD MMMM YYYY, HH:mm:ss') + ' ' + item.name + ' ' + item.source + ' ' + item.event_type + ' ' + contentInnerHTML;
    item.key = index;
    sanitizedItems.push(item);
  });
  return sanitizedItems;
}

export default _store

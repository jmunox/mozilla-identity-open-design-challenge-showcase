import moment from 'moment';
import memoize from 'fast-memoize';
import dompurify from 'dompurify';


const search = ({items, matchSearch = defaultMatchSearch, searchQuery}) => {
    const sanitizedItems = getSanitizedData(items);
    const visibleItems = isEmpty(searchQuery) ? sanitizedItems : sanitizedItems.filter(({match}) => matchSearch({ match : match, searchQuery : searchQuery})) 
    return visibleItems;
}


export const fastSearch = memoize(search);
export const slowSearch = search;

const isEmpty = (value) => {
    if(value){
        if(value.trim().length>2) return false;
        else return true
    }
    else return true
}

function getSanitizedData( items) {
    const sanitizer = dompurify.sanitize;
    const sanitizedItems = [];
    items.forEach((item, index) => {
    const date = moment(item.date);
      item.content = sanitizer(item.content)
      const contentInnerHTML = item.content.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
      item.match = date.format('MMMM Do YYYY, h:mm:ss a') + ' ' + item.name + ' ' + item.source + ' ' + item.event_type + ' ' + contentInnerHTML;
      item.key = index;
      sanitizedItems.push(item);
    });
    return sanitizedItems;
}

// this is the search
const defaultMatchSearch = ({ match, searchQuery }) => {
    const processString = (text) => text.trim().toLowerCase();
    return processString(match).includes(processString(searchQuery));
};


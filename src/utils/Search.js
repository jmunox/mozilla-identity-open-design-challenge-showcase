import memoize from 'fast-memoize';

const search = ({items, matchSearch = defaultMatchSearch, searchQuery}) => {
    const visibleItems = isEmpty(searchQuery) ? items : items.filter(({match}) => matchSearch({ match : match, searchQuery : searchQuery}));
    return visibleItems;
};

export const fastSearch = memoize(search);
export const slowSearch = search;

const isEmpty = (value) => {
    if (value) {
        if (value.trim().length>1) return false;
        else return true;
    }
    else return true;
};

// this is the search
const defaultMatchSearch = ({ match, searchQuery }) => {
    const processString = (text) => text.trim().toLowerCase();
    return processString(match).includes(processString(searchQuery));
};


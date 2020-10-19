import React from 'react';
import {useBoolean} from 'utils/Hook';
import Dotdotdot from 'react-dotdotdot'
import Truncate from 'react-truncate';

export default (({
    lines = 3,
    more = 'Read more',
    less = 'Show less',
    children
    }) => {

    const {truncated, toggleTruncated} = useBoolean(false) 
    const {expanded, toggleExpanded} = useBoolean(false) 



return (
    <div>
        <Truncate
                    lines={!expanded && lines}
                    ellipsis={(
                        <span>... <a href='#' onClick={toggleExpanded}>{more}</a></span>
                    )}
                    onTruncate={toggleTruncated}
                >
            <p>{children}</p>
        </Truncate>
        {!truncated && expanded && (
            <span> <a href='#' onClick={toggleExpanded}>{less}</a></span>
        )}
    </div>
);
})
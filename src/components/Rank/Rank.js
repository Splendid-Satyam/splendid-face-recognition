import React from 'react';

const Rank = ({ name, entries }) => {

    return (
        <div>   
            <p className='white f3'>
                { `${ name }, your current entry count is... `  }</p>
            <h2 className='white f1'>
                { `${ entries }` }</h2>
        </div>

    )
}

export default Rank;
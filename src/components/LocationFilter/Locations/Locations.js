import React from 'react'

const Locations = ({ locations }) => {
    return (
        <ol className="locations">
            {locations && locations.map(p => <li key={p.id} aria-label={p.name} tabIndex="0">{p.name}</li>)}
        </ol>
    )
}

export default Locations
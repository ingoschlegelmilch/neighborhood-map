import React from 'react'

const Locations = ({ locations, onClick }) => {
    return (
        <ol className="locations">
            {locations && locations.map(p =>
                <li id={p.place_id}
                    key={p.id}
                    onClick={() => onClick(p)}
                    onKeyPress={() => onClick(p)}
                    aria-label={p.name}
                    role="menuitem"
                    tabIndex="0">{p.name}</li>
            )}
        </ol>
    )
}

export default Locations
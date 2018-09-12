import React from 'react'

const Locations = ({ locations, onClick }) => {
    return (
        <ol className="locations">
            {locations && locations.map(p =>
                <li key={p.id}
                    onClick={() => onClick(p)}
                    onKeyPress={() => onClick(p)}
                    aria-label={p.name}
                    tabIndex="0">{p.name}</li>
            )}
        </ol>
    )
}

export default Locations
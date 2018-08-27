import React from 'react'

import './locationFilter.css'

const LocationFilter = ({ expanded }) => (
    <div id="location-filter" className={expanded ? 'expanded' : null}>
        <input placeholder="Filter locations" />
        <ol>
            <li>De bevoir Deli</li>
            <li>De bevoir Arms</li>
            <li>Talbot</li>
        </ol>
    </div>
)

export default LocationFilter
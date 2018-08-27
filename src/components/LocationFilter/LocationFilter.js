import React from 'react'

import './locationFilter.css'
import Locations from './Locations/Locations'

const LocationFilter = ({ expanded, locations, query, onChange }) => (
    <div id="location-filter" className={expanded ? 'expanded' : null}>
        <input placeholder="Filter locations" value={query} onChange={(e) => onChange(e.target.value)} />
        <Locations locations={locations} />
    </div>
)

export default LocationFilter
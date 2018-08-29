import React from 'react'

import './locationFilter.css'
import Locations from './Locations/Locations'

const LocationFilter = ({ expanded, locations, query, onChange, focusInput, onClick }) => (
    <section
        id="location-filter"
        className={expanded ? 'expanded' : null}
        aria-label="Location filter"
        role="menu"
        aria-hidden={expanded ? null : "true"}
        tabIndex={expanded ? "0" : null}
    >
        <input
        ref={focusInput} 
        placeholder="Filter locations" 
        value={query} onChange={(e) => onChange(e.target.value)} 
        aria-label="Input field" />
        <Locations locations={locations} onClick={onClick} />
    </section>
)

export default LocationFilter
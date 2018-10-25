import React, { Component } from 'react'

import './locationFilter.css'
import Locations from './Locations/Locations'

class LocationFilter extends Component {
    
    componentDidUpdate() {
        const { expanded, focusInput } = this.props
        if (expanded) focusInput()
    }

    render() {
        const { selectedPlace, selectedMarker, expanded, locations, query, onChange, filterInput, focusInput, onClick } = this.props
        return (
            <section
                id="location-filter"
                className={expanded ? 'expanded' : null}
                aria-label="Location filter"
                role="menu"
                aria-hidden={expanded ? null : "true"}
                tabIndex={expanded ? "0" : null}
            >
                <input
                    ref={filterInput}
                    placeholder="Filter locations"
                    value={query} onChange={(e) => onChange(e.target.value)}
                    aria-label="Input field" />
                <Locations locations={locations} onClick={onClick} />
            </section>
        )
    }
}

export default LocationFilter
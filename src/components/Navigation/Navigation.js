import React from 'react'

import BurgerIcon from './BurgerIcon'
import './navigation.css'

const Navigation = ({ onClick, expanded }) => (
    <nav id="navigation">
        <h1 tabIndex="0">Neighborhood Map</h1>
        <a
            onKeyPress={onClick}
            onClick={onClick}
            role="button"
            aria-label="Toggle location filter"
            aria-haspopup="true"
            aria-controls="location-filter"
            tabIndex="0"
            aria-expanded={expanded ? "true" : "false"}
        >
            <BurgerIcon expanded={expanded} />
        </a>
    </nav>
)

export default Navigation
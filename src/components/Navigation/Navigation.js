import React from 'react'

import BurgerIcon from './BurgerIcon'
import './navigation.css'

const Navigation = ({ onClick, expanded }) => (
    <nav id="navigation">
        <a onClick={onClick}>
            <BurgerIcon expanded={expanded} />
        </a>
    </nav>
)

export default Navigation
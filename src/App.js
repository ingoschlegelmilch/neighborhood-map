import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Map from './components/Map/Map'
import LocationFilter from './components/LocationFilter/LocationFilter'

class App extends Component {
  state = {
    expandedNavigation: false
  }

  toggleNavigation() {
    this.setState({ expandedNavigation: !this.state.expandedNavigation })
  }

  render() {
    return (
      <div className="App">
        <Navigation
          onClick={(e) => this.toggleNavigation()} />
        <div id="container">
          <LocationFilter expanded={this.state.expandedNavigation} />
          <Map />
        </div>
      </div>
    );
  }
}

export default App;

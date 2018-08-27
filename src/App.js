import React, { Component } from 'react';

import './App.css';

import Navigation from './components/Navigation/Navigation'
import Map from './components/Map/Map'
import LocationFilter from './components/LocationFilter/LocationFilter'

class App extends Component {
  state = {
    expandedNavigation: false,
    places: [],
    filterQuery: "",
    filteredLocations: []
  }

  home() {
    return {
      lat: 51.543000,
      lng: -0.086503
    }
  }

  toggleNavigation = () => {
    this.setState({ expandedNavigation: !this.state.expandedNavigation })
  }

  updateFilterQuery = (filterQuery) => {
    this.setState({ filterQuery }, () => {
      this.setState({
        filteredLocations: this.state.places.filter(place => place.name.match(new RegExp(filterQuery, "i")))
      })
    })
  }

  searchNearby = (google, map, center) => {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: this.home(),
      radius: '500',
      type: ['food']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK)
        this.setState({
          places: results,
          filteredLocations: results
        });
    });
  };

  mapReady = (mapProps, map) => {
    this.searchNearby(mapProps.google, map, map.center)
  }

  render() {
    return (
      <div className="App">
        <Navigation
          onClick={(e) => this.toggleNavigation()} />
        <div id="container">
          <LocationFilter expanded={this.state.expandedNavigation}
            onChange={this.updateFilterQuery}
            value={this.state.filterQuery}
            locations={this.state.filteredLocations} />
          <div id="map">
            <Map onMapReady={(mapProps, map) => this.mapReady(mapProps, map)}
              places={this.state.filteredLocations} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

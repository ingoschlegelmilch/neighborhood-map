import React, { Component } from 'react'

import './App.css'

import Navigation from './components/Navigation/Navigation'
import Map from './components/Map/Map'
import LocationFilter from './components/LocationFilter/LocationFilter'

import offlinePlaces from './lib/offlinePlaces';

class App extends Component {

  state = {
    expandedNavigation: false,
    places: [],
    filterQuery: "",
    filteredLocations: [],
    width: 0,
    height: 0,
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    this.updateWindowDimensions()
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight, 
      isMobile: window.innerWidth > 320 && window.innerWidth <= 425,
      isTablet: window.innerWidth > 425 && window.innerWidth <= 1024,
      isDesktop: window.innerWidth > 1024 
    })
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

  searchNearHome = (google, map) => {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: this.home(),
      radius: '500',
      type: ['food']
    };

    try {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({
            places: results,
            filteredLocations: results
          });
        }         
      });
    } catch(e) {
      console.log('offline')
      this.setState({
        places: offlinePlaces,
        filteredLocations: offlinePlaces
      })
    }

  };

  mapReady = (mapProps, map) => {
    this.searchNearHome(mapProps.google, map)
  }

  render() {
    return (
      <div className="App">
        <Navigation onClick={(e) => this.toggleNavigation()} />
        <div id="container">

          <LocationFilter
            expanded={this.state.expandedNavigation}
            onChange={this.updateFilterQuery}
            value={this.state.filterQuery}
            locations={this.state.filteredLocations} />

          <div id="map">
            <Map 
              device={{ isMobile: this.state.isMobile, isTablet: this.state.isTablet }}
              expandedNavigation={this.state.expandedNavigation}
              onMapReady={(mapProps, map) => this.mapReady(mapProps, map)}
              places={this.state.filteredLocations} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;

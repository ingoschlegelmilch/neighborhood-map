import React, { Component } from 'react'
import { Marker } from 'google-maps-react'

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
    activeLocation: null,
    activeMarker: null,
    wikiEntries: []
  }

  // Handles responsibility state ()
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
    } catch (e) {
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

  // TODO: no idea why that's not working. I'm creating a ref and am trying to focus it.
  focusInput = () => {
   // this.filterInput.current.focus()
  }

  onMarkerClick = (place, marker) => {
    this.setState({activeMarker: marker})
  }

  wikiAPI = (query) => {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&exintro&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`)
        .then(r => r.json().then(data => this.setState({wikiEntries: data.query.search})))
        .catch(() => this.setState({wikiEntries: []}))
  }

  selectPlace = (place) => {  
    const selectedMarker = (
      <Marker key={place.id}
        title={place.title}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
        name={place.name}
        locationSelect={(_, marker) => this.onMarkerClick(place, marker)}
        position={place.geometry.location} />
    )
    this.wikiAPI(place.name);
    this.setState({
      selectedPlace: place,
      selectedMarker: selectedMarker,
    })
  }

  deselectPlace = () => {
    this.setState({
      selectedPlace: null,
      selectedMarker: null,
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navigation onClick={(e) => {
            this.toggleNavigation()
            this.focusInput()
          }}
          />
        </header>

        <main id="container">
          <LocationFilter
            focusInput={this.filterInput}
            expanded={this.state.expandedNavigation}
            onChange={this.updateFilterQuery}
            onClick={this.selectPlace}
            value={this.state.filterQuery}
            locations={this.state.filteredLocations} />

          <Map
            onSelectPlace={this.selectPlace}
            onDeselectPlace={this.deselectPlace}
            selectedPlace={this.state.selectedPlace}
            wikiEntries={this.state.wikiEntries}
            selectedMarker={this.state.selectedMarker}
            device={{ isMobile: this.state.isMobile, isTablet: this.state.isTablet }}
            expandedNavigation={this.state.expandedNavigation}
            onToggleNavigation={this.toggleNavigation}
            onMapReady={(mapProps, map) => this.mapReady(mapProps, map)}
            places={this.state.filteredLocations} />
        </main>
      </div>
    );
  }
}

export default App

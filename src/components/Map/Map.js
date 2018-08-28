import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'

import './map.css'

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    width = () => {
        const { isMobile, isTablet } = this.props.device
        if (this.props.expandedNavigation) {
            if (isMobile) return '30%'
            if (isTablet) return '50%'
            return '70%'
        }
        return '100%'
    }

    render() {

        return (
            <Map google={this.props.google}
                onClick={this.onMapClicked}
                zoom={14}
                containerStyle={{ position: 'absolute', width: this.width(), height: 'calc(100% - 4rem)' }}
                onReady={this.props.onMapReady}
                initialCenter={{
                    lat: 51.5456582,
                    lng: -0.086
                }}>
                {this.props.places && this.props.places.map(place => {
                    return <Marker key={place.id}
                        title={place.title}
                        icon={{
                            url: this.state.selectedPlace.id === place.id ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                        name={place.name}
                        onClick={(props, marker) => this.onMarkerClick(place, marker)}
                        position={place.geometry.location} />
                })}

                <InfoWindow onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)

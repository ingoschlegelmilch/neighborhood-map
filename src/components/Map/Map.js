import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'

import './map.css'

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) => {
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

    render() {
        const { places } = this.props;
        return (
            <Map google={this.props.google} onClick={this.onMapClicked}
                zoom={14}
                containerStyle={{ width: '100%', height: 'calc(100% - 2.5rem)' }}
                onReady={this.props.onMapReady}
                initialCenter={{
                    lat: 51.5456582,
                    lng: -0.086
                }}>
                {places && places.map(place => {
                    return <Marker key={place.id}
                        title={place.title}
                        name={place.name}
                        onClick={this.onMarkerClick}
                        position={place.geometry.location} />
                })}

                <InfoWindow onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        { console.log(this.state.selectedPlace)}
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

import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'

import './map.css'

class MapContainer extends Component {
    width = () => {
        const { isMobile, isTablet } = this.props.device
        if (this.props.expandedNavigation) {
            if (isMobile) return '30%'
            if (isTablet) return '50%'
            return '70%'
        }
        return '100%'
    }

    lat = (place) => {
        if (place) {
            return place.geometry.location.lat()
        }
        return 51.5456582
    }

    lng = (place) => {
        if (place) {
            return place.geometry.location.lng()
        }
        return -0.08318710000003193
    }

    wikiAPI = (query) => {
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&exintro&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`)
            .then(r => r.json())
            .then(data => data.query.search[0].snippet)
            .catch(() => "No Wikipedia entries found.")
    }

    render() {
        const { onSelectPlace, onDeselectPlace, selectedPlace, selectedMarker, places } = this.props

        if (selectedPlace) {
            console.log("place", {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng()
            })
        }
        return (
            <Map
                google={this.props.google}
                onClick={onDeselectPlace}
                zoom={14}
                keyboard={false}
                containerStyle={{ position: 'absolute', width: this.width(), height: 'calc(100% - 4rem)' }}
                containerProps={{ keyboard: false }}
                onReady={this.props.onMapReady}
                initialCenter={{
                    lat: 51.5456582,
                    lng: -0.086
                }}>
                {selectedPlace && selectedMarker}
                {<InfoWindow google={this.props.google} map={this.props.map} visible={Boolean(selectedPlace)}
                    position={
                        { lat: this.lat(selectedPlace), lng: this.lng(selectedPlace) }
                    }>
                    <div>
                        <h2>{selectedPlace && selectedPlace.name}</h2>
                        <div>{this.wikiAPI(selectedPlace && selectedPlace.name)}</div>
                    </div>
                </InfoWindow>
                }

                {!selectedPlace && places && places.map(place => {
                    return <Marker key={place.id}
                        title={place.title}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                        }}
                        name={place.name}
                        onClick={() => onSelectPlace(place)}
                        position={place.geometry.location} />
                })}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)

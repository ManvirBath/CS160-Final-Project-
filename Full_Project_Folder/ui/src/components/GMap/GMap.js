import React from 'react';
import './GMap.css';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

const ANIMATION = {
    NOANIMATION: 0,
    BOUNCE: 1,
    DROP: 2,
};
const API_KEY = 'AIzaSyDkOuv56cGnF3wRj-ufMisKuYR04orIiWQ';
const MARKER_PATH =
    'https://developers.google.com/maps/documentation/javascript/images/marker_green';
const mapStyles = {
    height: '100vh',
    width: '100%',
};
const options = {
    fullscreenControl: false,
    mapTypeControl: false,
};
const defaultCenter = {
    lat: 37.1,
    lng: -95.7,
};
const position = { lat: 33.772, lng: -95.214 };

const divStyle = {
    backgroundColor: 'white',
    padding: 15,
};
const libraries = ['places'];
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.autocomplete = null;
        this.map = null;
        this.placeService = null;
        this.onLoad = this.onLoad.bind(this);
        this.onPlaceChanged = this.onPlaceChanged.bind(this);
        this.state = {
            searchedLocation: null,
            atms: [],
            infoWindow: null,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.searchedLocation !== null &&
            !Object.is(this.state.searchedLocation, prevState.searchedLocation)
        ) {
            console.log('updating');
            this.searchNearBy();
        }
        if (
            this.state.searchedLocation === null &&
            prevState.searchedLocation !== null
        ) {
            this.setState({ atms: [] });
        }
    }
    onLoad(input) {
        if (input.__e3_) {
            this.autocomplete = input;
        } else if (input.map) {
            this.marker = input;
        } else {
            this.map = input;
            this.placeService = new window.google.maps.places.PlacesService(
                this.map
            );
        }
    }
    searchNearBy() {
        const { map, placeService } = this;
        const { searchedLocation } = this.state;
        const bounds = map.getBounds();
        const search = {
            bounds: bounds,
            types: ['atm'],
            name: ['chase atm'],
        };
        placeService.nearbySearch(search, (result, status, pagination) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState({ atms: result });
            }
        });
    }
    onPlaceChanged() {
        const { autocomplete, map } = this;
        let searchedLocation = null;
        if (autocomplete !== null && map !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                map.panTo(place.geometry.location);
                map.setZoom(13);
                searchedLocation = place;
            }
            this.setState({ searchedLocation });
        }
    }
    getInfoWindow() {
        const { infoWindow } = this.state;
        const {
            formatted_address = null,
            geometry,
            name,
            photos = null,
            formatted_phone_number = null,
        } = infoWindow;
        const position = infoWindow.geometry.location;
        return (
            <InfoWindow
                position={position}
                onCloseClick={() => {
                    this.setState({ infoWindow: null });
                }}
            >
                <div style={divStyle}>
                    {photos && (
                        <img
                            width="200px"
                            src={infoWindow.photos[0].getUrl()}
                            alt="atm"
                        />
                    )}
                    {formatted_address && <div>{formatted_address}</div>}
                    {formatted_phone_number && (
                        <div>{formatted_phone_number}</div>
                    )}
                    {name && <div>{name}</div>}
                </div>
            </InfoWindow>
        );
    }
    getATMS() {
        const { atms } = this.state;
        const xml = atms.map((atm) => {
            return (
                <Marker
                    key={atm.place_id}
                    animation={ANIMATION.DROP}
                    position={atm.geometry.location}
                    title={atm.name}
                    onClick={() => {
                        this.markerClick(atm);
                    }}
                />
            );
        });
        return xml;
    }
    getListRow({ index, style }) {
        const { atms } = this.state;
        const atm = atms[index];
        if (!atm) {
            return null;
        }
        return (
            <div
                className="atmInfo"
                style={style}
                onClick={() => {
                    this.markerClick(atm);
                }}
            >
                <div className="atmName">{atm.name}</div>
                <div className="atmVicinity">{atm.vicinity}</div>
            </div>
        );
    }
    hideOrNot() {
        return (
            <div
                onClick={() => {
                    this.setState((prevState) => {
                        return { hideList: !prevState.hideList };
                    });
                }}
                className="hideListButton"
            >
                {this.state.hideList ? (
                    <i className="open-option small material-icons">menu</i>
                ) : (
                    <i className="close-option small material-icons">close</i>
                )}
            </div>
        );
    }
    markerClick(atm) {
        const { place_id } = atm;
        const { placeService } = this;
        const request = {
            placeId: place_id,
            fields: [
                'name',
                'formatted_phone_number',
                'geometry',
                'formatted_address',
                'photo',
            ],
        };
        placeService.getDetails(request, (result, status) => {
            let details = null;
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                details = result;
            }
            this.setState({ infoWindow: result });
        });
        this.setState({ infoWindow: null });
    }
    render() {
        const { searchedLocation, atms, infoWindow } = this.state;
        const hideList = atms.length > 0 ? this.hideOrNot.bind(this)() : null;
        let button;
        if (localStorage.getItem('email') == null) {
            button = <Link className="homepage-header" to="/main">
                    Home page{' '}
            </Link>
        } else {
            button = <Link className="userdb-header" to="/userdashboard">
                {' '}
                Dashboard
            </Link>
        }
        return (
            <div className="MapContainer">
                <div style={{ background: 'white' }} className="gmap-header">
                    {button}
                </div>
                <div className="googleMap">
                    <LoadScript
                        googleMapsApiKey={API_KEY}
                        libraries={libraries}
                    >
                        <GoogleMap
                            options={options}
                            mapContainerStyle={mapStyles}
                            zoom={5}
                            center={defaultCenter}
                            onLoad={this.onLoad}
                        >
                            {searchedLocation !== null && (
                                <Marker
                                    animation={ANIMATION.DROP}
                                    position={
                                        searchedLocation.geometry.location
                                    }
                                    title="Initial Search Location"
                                />
                            )}
                            {infoWindow !== null && this.getInfoWindow()}
                            {atms.length > 0 && this.getATMS()}
                            <Autocomplete
                                onLoad={this.onLoad}
                                onPlaceChanged={this.onPlaceChanged}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter a chase atm"
                                    style={{
                                        boxSizing: 'border-box',
                                        border: '1px solid transparent',
                                        width: '240px',
                                        height: '32px',
                                        padding: '0 12px',
                                        borderRadius: '3px',
                                        boxShadow:
                                            '0 2px 6px rgba(0, 0, 0, 0.3)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        textOverflow: 'ellipses',
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        left: '50%',
                                        top: '10px',
                                        marginLeft: '-120px',
                                    }}
                                />
                            </Autocomplete>
                        </GoogleMap>
                    </LoadScript>
                    {hideList}
                    <div
                        className={`myList ${
                            this.state.hideList ? 'myList--hide' : ''
                        }`}
                    >
                        {atms.length > 0 && (
                            <AutoSizer>
                                {({ height }) => (
                                    <List
                                        className="List"
                                        height={height}
                                        itemCount={atms.length}
                                        itemSize={80}
                                        width={250}
                                    >
                                        {this.getListRow.bind(this)}
                                    </List>
                                )}
                            </AutoSizer>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default MapContainer;

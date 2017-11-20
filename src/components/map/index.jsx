import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const defaultCoordinates = { lat: -12.9722, lng: -38.5014 };
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=places`;

const Map = withScriptjs(withGoogleMap((props) => {
  declare var google;

  return (
    <GoogleMap
      defaultZoom={14}
      center={props.center || defaultCoordinates}
      onCenterChanged={props.onCenterChange}
      ref={props.getMap}
    >
      <If condition={props.withMarker}>
        <Marker position={props.markerPosition || defaultCoordinates} />
      </If>


      <If condition={props.centerMarker}>
        <div className="CenterMarker" />
      </If>

      <If condition={props.searchBox}>
        <SearchBox
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChange}
          ref={props.getSearchBox}
        >
          <input className="SearchBox" />
        </SearchBox>
      </If>
    </GoogleMap>
  );
}));

const Wrapper = props => (
  <div className="Map">
    <Map
      googleMapURL={googleMapURL}
      loadingElement={<div className="Map-loading" />}
      containerElement={<div className="Map-container" />}
      mapElement={<div className="Map-element" />}
      {...props}
    />
  </div>
);

export default Wrapper;

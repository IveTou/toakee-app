import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import config from '~/src/config';

import { withIndexStyle } from './styles';

const defaultCoordinates = { lat: -12.9722, lng: -38.5014 };
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAPS_API_KEY}&libraries=places`;

const Map = withScriptjs(withGoogleMap((props) => {
  declare var google;
  const {
    center,
    onCenterChange,
    getMap,
    withMarker,
    markerPosition,
    centerMarker,
    searchBox,
    onPlacesChange,
    classes,
    getSearchBox,
  } = props;

  return (
    <GoogleMap
      defaultZoom={14}
      center={center || defaultCoordinates}
      onCenterChanged={onCenterChange}
      ref={getMap}
    >
      <If condition={withMarker}>
        <Marker position={markerPosition || defaultCoordinates} />
      </If>

      <If condition={centerMarker}>
        <div className={classes.centerMarker} />
      </If>

      <If condition={searchBox}>
        <SearchBox
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={onPlacesChange}
          ref={getSearchBox}
        >
          <input className={classes.searchBox} />
        </SearchBox>
      </If>
    </GoogleMap>
  );
}));

const Wrapper = props => {
  const rootClasses = classNames(props.classes.root, props.mini && props.classes.mini);
  return (
    <div className={rootClasses}>
      <Map
        googleMapURL={googleMapURL}
        loadingElement={<div className={rootClasses} />}
        containerElement={<div className={rootClasses} />}
        mapElement={<div className={rootClasses} />}
        classes={props.classes}
        {...props}
      />
    </div>
  );
}

Wrapper.propTypes = {
  classes: PropTypes.object,
  mini: PropTypes.bool,
};

export default withIndexStyle(Wrapper);

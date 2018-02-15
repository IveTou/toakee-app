import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import PlacesAutocomplete from '~/src/components/places-autocomplete';
import FormField from '~/src/components/form-field';
import Map from '~/src/components/map';
import MaterialError from '~/src/components/material-error';
import { required } from '~/src/utils/validation';

export default class EventFormPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newPlace: false };
    autoBind(this);
  }

  handleFieldChange(e) {
    this.props.form.setFieldValue('place', {
      ...this.props.form.values.place,
      [e.target.name]: e.target.value,
    });
  }

  handleCenterChange() {
    const { lng, lat } = this.map.getCenter();
    const { setFieldValue, values } = this.props.form;
    setFieldValue('place', { ...values.place, coordinates: [lng(), lat()] });
  }

  handlePlacesChange() {
    const [{ name, formatted_address: address, geometry }] = this.searchBox.getPlaces();
    this.props.form.setFieldValue('place', {
      name,
      address,
      coordinates: [geometry.location.lng(), geometry.location.lat()],
    });
  }

  handleAutocompleteSelection(place) {
    if (!place) {
      this.setState({ newPlace: true });
    } else {
      this.props.form.setFieldValue('place', place);
    }
  }

  render() {
    const { state: { newPlace }, props: { form } } = this;
    const { values, errors, touched } = form;
    const { name, address, coordinates } = values.place;

    const center = coordinates && { lng: coordinates[0], lat: coordinates[1] };
    const errorMessages = touched.place
      ? {
        autocomplete: errors.place,
        map: !coordinates && newPlace && 'Por favor, centralize o mapa no local desejado.',
        name: !name && required,
        address: !address && required,
      }
      : {};

    return (
      <div className="EventFormPlace">
        <If condition={!newPlace}>
          <PlacesAutocomplete
            name="place"
            label="Nome do local"
            value={name}
            onSelect={this.handleAutocompleteSelection}
            error={errorMessages.autocomplete}
            margin="normal"
            fullWidth
          />
        </If>
        <If condition={newPlace}>
          <FormField
            label="Nome do local"
            name="name"
            value={name || ''}
            onChange={this.handleFieldChange}
            error={errorMessages.name}
            fullWidth
          />
        </If>
        <Map
          getMap={(map) => { this.map = map; }}
          getSearchBox={(searchBox) => { this.searchBox = searchBox; }}
          markerPosition={center}
          center={center}
          searchBox={newPlace}
          withMarker={!newPlace && center}
          onCenterChange={newPlace ? this.handleCenterChange : null}
          onPlacesChange={newPlace ? this.handlePlacesChange : null}
          centerMarker={newPlace}
        />
        <MaterialError error={errorMessages.map || ' '} />
        <If condition={newPlace}>
          <FormField
            label="Endereço"
            name="address"
            value={address || ''}
            onChange={this.handleFieldChange}
            error={errorMessages.address}
            fullWidth
          />
        </If>
      </div>
    );
  }
}

EventFormPlace.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
    touched: PropTypes.object,
  }),
};

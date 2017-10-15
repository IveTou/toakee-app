import React, { PropTypes } from 'react';
import { debounce } from 'lodash';
import { Search } from 'semantic-ui-react';
import autoBind from 'react-autobind';

import GooglePlacesApi from '~/src/toakee-core/apis/google-places.js';

export default class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [],
      predictions: [],
    };
    autoBind(this);
  }

  onSearchChange(e, { name, value }) {
    debounce(() => this.fetchPlaces(value), 200)();
    this.props.onChange(e, { name, value: { value } });
  }

  async fetchPlaces(query) {
    const predictions = await GooglePlacesApi.predict(query);
    const results = predictions.map(p => ({
      title: p.structured_formatting.main_text,
      description: p.structured_formatting.secondary_text,
      key: p.id,
      value: p.place_id,
    }));

    this.setState({ predictions, results });
  }

  handleResultSelect(e, { result: { value, title } }) {
    this.props.onResultSelect(e, {
      name: this.props.name,
      value: { googlePlacesId: value, value: title },
    });
  }

  render() {
    return (
      <Search
        placeholder={this.props.placeholder}
        results={this.state.results}
        onSearchChange={this.onSearchChange}
        onResultSelect={this.handleResultSelect}
        noResultsMessage="Nenhum local encontrado."
        value={this.props.value}
        name={this.props.name}
      />
    );
  }
}

PlacesAutocomplete.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onResultSelect: PropTypes.func,
  onChange: PropTypes.func,
};

PlacesAutocomplete.defaultProps = {
  onChange: () => {},
};


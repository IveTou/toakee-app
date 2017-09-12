import React, { PropTypes } from 'react';
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

  async onSearchChange(e, input) {
    const predictions = await GooglePlacesApi.predict(input);
    const results = predictions.map(p => ({
      title: p.structured_formatting.main_text,
      description: p.structured_formatting.secondary_text,
      key: p.id,
      value: p.place_id,
    }));

    this.setState({ predictions, results });
  }

  handleResultSelect(e, { value }) {
    this.props.onResultSelect(e, {
      name: this.props.name,
      value: { googlePlacesId: value },
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
      />
    );
  }
}

PlacesAutocomplete.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onResultSelect: PropTypes.func,
};

PlacesAutocomplete.defaultProps = {
  onChange: () => {},
};


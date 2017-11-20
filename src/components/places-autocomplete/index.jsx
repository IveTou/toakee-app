import React, { PropTypes } from 'react';
import { debounce } from 'lodash';
import autoBind from 'react-autobind';
import { AutoComplete } from 'material-ui';

import apolloClient from '~/src/apollo';

import { searchPlace } from './graphql';

let currentFetchingKey = 0;
const FETCH_DELAY = 250;
const addNew = { name: 'Adicionar novo...', id: -1 };

export default class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      value: props.value,
      suggestions: [addNew],
    };
    this.debouncedFetch = debounce(this.fetchPlaces, FETCH_DELAY);
  }

  async fetchPlaces(query) {
    currentFetchingKey += 1;
    const fetchingKey = currentFetchingKey;
    const { data } = await apolloClient.query({
      query: searchPlace,
      variables: { query },
    });
    if (data && data.places && fetchingKey === currentFetchingKey) {
      this.setState({ suggestions: [...data.places, addNew] });
    }
  }

  handleInputUpdate(value, _, { source }) {
    this.setState({ value });
    if (source === 'change' && value !== '') {
      this.debouncedFetch(value);
    }
  }

  handleNewRequest(request, index) {
    const option = index === -1 ? this.state.suggestions[0] : request;
    this.props.onSelect(option);
    this.setState({ value: option.name });
  }

  render() {
    const { placeholder, name, error } = this.props;
    const { suggestions, value } = this.state;

    return (
      <div>
        <AutoComplete
          name={name}
          floatingLabelText={placeholder}
          searchText={value}
          filter={AutoComplete.noFilter}
          dataSource={suggestions}
          onUpdateInput={this.handleInputUpdate}
          onNewRequest={this.handleNewRequest}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          errorText={error}
          openOnFocus={!!value}
          fullWidth
        />
      </div>
    );
  }
}

PlacesAutocomplete.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  error: PropTypes.string,
};

PlacesAutocomplete.defaultProps = {
  onSelect: () => {},
};

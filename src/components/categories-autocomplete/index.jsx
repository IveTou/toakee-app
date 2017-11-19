import React, { PropTypes } from 'react';
import { debounce, capitalize, trimStart } from 'lodash';
import autoBind from 'react-autobind';
import { AutoComplete } from 'material-ui';

import apolloClient from '~/src/apollo';

import { searchCategory } from './graphql';

let currentFetchingKey = 0;
const FETCH_DELAY = 250;

export default class CategoriesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      value: props.value,
      suggestions: [],
    };
    this.debouncedFetch = debounce(this.fetchCategories, FETCH_DELAY);
  }

  async fetchCategories(query) {
    currentFetchingKey += 1;
    const fetchingKey = currentFetchingKey;
    const { data } = await apolloClient.query({
      query: searchCategory,
      variables: { query },
    });
    if (data && data.categories && fetchingKey === currentFetchingKey) {
      const addValue = { title: `Adicionar: ${capitalize(query)}`, id: -1 };
      this.setState({ suggestions: [addValue, ...data.categories] });
    }
  }

  handleInputChange(_value) {
    const value = trimStart(_value);
    this.setState({ value });
    if (value !== '') {
      this.debouncedFetch(value);
    }
  }

  handleNewRequest(request) {
    if (this.props.clearOnSelect) {
      this.setState({ value: '' });
    }
    if (this.props.onSelect) {
      this.props.onSelect(request);
    }
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
          onChange={this.handleInputChange}
          onNewRequest={this.handleNewRequest}
          dataSourceConfig={{ text: 'title', value: 'id' }}
          errorText={error}
          openOnFocus={!!value}
          fullWidth
        />
      </div>
    );
  }
}

CategoriesAutocomplete.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  clearOnSelect: PropTypes.bool,
  error: PropTypes.string,
};

CategoriesAutocomplete.defaultProps = {
  onChange: () => {},
};


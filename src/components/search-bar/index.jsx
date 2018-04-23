import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { FormControl, Input, InputAdornment, IconButton, Icon } from 'material-ui';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import qs from 'query-string';

import { withIndexStyle } from './styles';

const ENTER = 13;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      query: qs.parse(props.location.search).q || '',
    };
  }

  componentWillReceiveProps({ location }) {
    this.setState({ query: qs.parse(location.search).q || '' });
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleKeyPress(e) {
    if (e.which === ENTER || e.keyCode === ENTER) {
      this.search();
    }
  }

  search() {
    this.props.history.push(`/search?q=${this.state.query}`);
  }

  render() {
    return (
      <FormControl fullWidth>
        <Input
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          className={this.props.classes.root}
          placeholder="Pesquisar no site"
          value={this.state.query}
          disableUnderline
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={this.search}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(
  withIndexStyle,
  withRouter,
)(SearchBar);

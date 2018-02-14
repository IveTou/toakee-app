import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Downshift from 'downshift';
import { debounce, trimStart, omit } from 'lodash';
import { Paper, TextField, MenuItem, ListItemText } from 'material-ui';

import { injectStyles } from './styles';

export class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.requestId = 1;
    this.cache = {};
    this.searchThrottled = debounce(this.performSearch, 150);

    this.state = {
      items: [],
      searchTerm: props.value || '',
    };
  }

  componentWillReceiveProps({ value: searchTerm }) {
    if (searchTerm !== this.state.searchTerm) {
      this.setState({ searchTerm });
    }
  }

  handleInputChange(ev) {
    const term = trimStart(ev.target.value);
    const validTerm = term.length > 1;
    this.setState({ items: [], searchTerm: term });

    if (validTerm) {
      this.searchThrottled(term);
    }
  }

  handleSelect(item) {
    this.setState({
      searchTerm: this.props.clearOnSelect ? '' : item.primary,
    });
    this.props.onSelect(item.value);
  }

  performSearch(term) {
    this.requestId += 1;
    const currentRequestId = this.requestId;
    const onSuccess = (result) => {
      this.cache[term] = result;
      if (currentRequestId === this.requestId) {
        this.setState({ items: result });
      }
    };

    if (this.cache[term]) {
      onSuccess(this.cache[term]);
    } else {
      this.props.onSearch(term).then(onSuccess);
    }
  }

  render() {
    const { searchTerm, items } = this.state;
    const {
      classes, error, ...otherProps
    } = omit(this.props, ['onSearch', 'onSelect', 'clearOnSelect']);
    const inputProps = {
      error: !!error,
      helperText: error,
      ...otherProps,
      value: searchTerm || '',
      onChange: this.handleInputChange,
    };

    return (
      <Downshift
        selectedItem={null}
        onChange={this.handleSelect}
        defaultHighlightedIndex={0}
        itemToString={i => i ? `${i.primary} ${i.secondary}` : ''}
        render={({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
          <div className={classes.root}>
            <TextField {...getInputProps(inputProps)} />
            <If condition={isOpen}>
              <Paper classes={{ root: classes.suggestions }}>
                {items.map((s, i) => (
                  <MenuItem
                    key={s.primary}
                    selected={highlightedIndex === i}
                    classes={{ root: classes.suggestion }}
                    {...getItemProps({ item: s })}
                  >
                    <ListItemText primary={s.primary} secondary={s.secondary} />
                  </MenuItem>
                ))}
              </Paper>
            </If>
          </div>
        )}
      />
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  clearOnSelect: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default injectStyles(Autocomplete);


import React, { PropTypes } from 'react';
import moment from 'moment';

import SearchPageResults from './results';

if (process.env.BROWSER) {
  require('./style.scss');
}


const SearchPage = ({ location }) => (
  <div className="SearchPage">
    <SearchPageResults
      title={`Termo buscado: ${location.query.q}`}
      start={moment().startOf('day')}
      query={location.query.q}
    />
    <SearchPageResults
      title="Eventos anteriores"
      end={moment().startOf('day')}
      query={location.query.q}
      hideOnEmpty
    />
  </div>
);

SearchPage.propTypes = {
  location: PropTypes.object,
};

export default SearchPage;

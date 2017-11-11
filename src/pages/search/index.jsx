import React, { PropTypes } from 'react';
import moment from 'moment';
import qs from 'query-string';

import DefaultLayout from '~/src/layouts/default';

import SearchPageResults from './results';

if (process.env.BROWSER) {
  require('./style.scss');
}


const SearchPage = ({ location: { search } }) => {
  const q = qs.parse(search).q;

  return (
    <DefaultLayout sidenavPartial>
      <div className="SearchPage">
        <SearchPageResults
          title={`Termo buscado: ${q}`}
          start={moment().startOf('day')}
          q={q}
        />
      </div>
    </DefaultLayout>
  );
};

SearchPage.propTypes = {
  location: PropTypes.object,
};

export default SearchPage;

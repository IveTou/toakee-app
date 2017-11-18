import React, { PropTypes } from 'react';
import { ReactTitle } from 'react-meta-tags';

import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';

if (process.env.BROWSER) {
  require('./style.scss');
}

const DefaultLayout = ({
  children,
  hideFooter,
  title = 'Descubra o que fazer em Salvador',
}) => (
  <div className="DefaultLayout">
    <ReactTitle title={`Toakee - ${title}`} />
    <TopBar />
    <main>{children}</main>
    <If condition={!hideFooter}>
      <Footer />
    </If>
  </div>
);

DefaultLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default DefaultLayout;

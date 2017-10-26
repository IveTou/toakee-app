import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { ReactTitle } from 'react-meta-tags';

import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';

if (process.env.BROWSER) {
  require('./style.scss');
}

const buildClasses = topbarTransparent => classNames('DefaultLayout', {
  'DefaultLayout--topbarTransparent': topbarTransparent,
});

const renderTitle = (event) => {
  const title = event ? `Toakee - ${event.title}` : 'Toakee - Descubra o que fazer em Salvador';
  return <ReactTitle title={title} />;
};

const DefaultLayout = ({ children, topbarTransparent, hideFooter, event }) => (
  <div className={buildClasses(topbarTransparent)}>
    {renderTitle(event)}
    <TopBar transparent={topbarTransparent} />
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
  topbarTransparent: PropTypes.bool,
  hideFooter: PropTypes.bool,
  event: PropTypes.object,
};

export default DefaultLayout;

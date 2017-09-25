import React, { PropTypes } from 'react';
import classNames from 'classnames';

import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';

if (process.env.BROWSER) {
  require('./style.scss');
}

const buildClasses = topbarTransparent => classNames('DefaultLayout', {
  'DefaultLayout--topbarTransparent': topbarTransparent,
});

const DefaultLayout = ({ children, topbarTransparent, hideFooter }) => (
  <div className={buildClasses(topbarTransparent)}>
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
};

export default DefaultLayout;

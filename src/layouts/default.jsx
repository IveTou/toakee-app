import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { ReactTitle } from 'react-meta-tags';

import TopBar from '~/src/components/top-bar';
import SideNav from '~/src/components/side-nav';
import Footer from '~/src/components/footer';

if (process.env.BROWSER) {
  require('./style.scss');
}

const buildClasses = topbarTransparent => classNames('DefaultLayout', {
  'DefaultLayout--topbarTransparent': topbarTransparent,
});

const DefaultLayout = ({
  children,
  topbarTransparent,
  hideFooter,
  title = 'Descubra o que fazer em Salvador',
}) => (
  <div className={buildClasses(topbarTransparent)}>
    <ReactTitle title={`Toakee - ${title}`} />
    <TopBar transparent={topbarTransparent} />
    <main>
      <SideNav>{children}</SideNav>
    </main>
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
  title: PropTypes.string,
};

export default DefaultLayout;

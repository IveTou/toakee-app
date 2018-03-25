import React from 'react';
import PropTypes from 'prop-types';
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

const DefaultLayout = ({
  children,
  topbarTransparent,
  hideFooter,
  title = 'Descubra o que fazer em Salvador',
}) => (
  <div className={buildClasses(topbarTransparent)}>
    <ReactTitle title={`Toakee - ${title}`} />
    <TopBar transparent={topbarTransparent} />
    <main>{children}</main>
    <If condition={!hideFooter}>
      <Footer />
    </If>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  topbarTransparent: PropTypes.bool,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default DefaultLayout;

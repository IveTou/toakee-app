import React, { PropTypes } from 'react';
import MetaTags from 'react-meta-tags';
import classNames from 'classnames';

import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';

import config from '~/src/config';

if (process.env.BROWSER) {
  require('./style.scss');
}

const buildClasses = topbarTransparent => classNames('DefaultLayout', {
  'DefaultLayout--topbarTransparent': topbarTransparent,
});

const DefaultLayout = ({ children, topbarTransparent, hideFooter }) => (
  <div className={buildClasses(topbarTransparent)}>
    <MetaTags>
      <title>Toakee</title>
      <meta id="og-title" property="og:title" content="Toakee - O melhor guia de eventos." />
      <meta
        id="og-description"
        name="og:description"
        content="Encontre o melhor evento da sua vida!" />
      <meta
        id="og-image"
        property="og:image"
        content="${config.ASSETS_BASE_URI}/core/site/login-bg.jpg" />
      <meta id="og-url" property="og:url" content={location.href} />
    </MetaTags>
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

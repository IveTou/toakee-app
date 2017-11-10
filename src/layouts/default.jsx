import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
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

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transparent: props.topbarTransparent, navHidden: false };
    autoBind(this);
  }

  toggleNav(){
    this.setState({ navHidden: !this.state.navHidden });
  }

  render() {
    const {
      children,
      topbarTransparent,
      hideFooter,
      title = 'Descubra o que fazer em Salvador',
    } = this.props;
    const { navHidden } = this.state;

    return (
      <div className={buildClasses(topbarTransparent)}>
        <ReactTitle title={`Toakee - ${title}`} />
        <TopBar transparent={topbarTransparent} toggle={this.toggleNav} />
        <main>
          <SideNav hidden={navHidden} />
          <div className="content">{children}</div>
        </main>
        <If condition={!hideFooter}>
          <Footer />
        </If>
      </div>
    );
  }
}

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

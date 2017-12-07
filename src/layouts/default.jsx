import React, { PropTypes } from 'react';
import { ReactTitle } from 'react-meta-tags';
import autoBind from 'react-autobind';
import classNames from 'classnames';

import { withInfo } from '~/src/hocs';
import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';
import SideNav from '~/src/components/sidenav';

if (process.env.BROWSER) {
  require('./style.scss');
}

export class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { navOpen: props.deviceInfo.is('desktop') };
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const {
      children,
      hideFooter,
      miniVariant,
      title = 'Descubra o que fazer em Salvador',
    } = this.props;
    const navOpen = this.state.navOpen;
    const classes = classNames('main', { 'main--mini': navOpen });

    return (
      <div className="DefaultLayout">
        <ReactTitle title={`Toakee - ${title}`} />
        <TopBar toggle={this.toggleNav} deviceInfo={this.props.deviceInfo} />
        <SideNav open={navOpen} mini={miniVariant} />
        <main className={classes}>{children}</main>
        <If condition={!hideFooter}>
          <Footer mini={navOpen} />
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
  deviceInfo: PropTypes.object,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
  miniVariant: PropTypes.bool,
};

export default withInfo(DefaultLayout, ['deviceInfo']);

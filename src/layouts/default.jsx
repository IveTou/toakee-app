import React from 'react';
import PropTypes from 'prop-types';
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
      title = 'Descubra o que fazer em Salvador',
    } = this.props;
    const { navOpen } = this.state;
    const classes = classNames('main', { 'main--compressed': navOpen });
    const small = !this.props.deviceInfo.is('desktop');

    return (
      <div className="DefaultLayout">
        <ReactTitle title={`Toakee - ${title}`} />
        <TopBar onToggle={this.toggleNav} small={small} />
        <SideNav open={navOpen} />
        <main className={classes}>{children}</main>
        <If condition={!hideFooter}>
          <Footer compressed={navOpen} />
        </If>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  deviceInfo: PropTypes.object,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default withInfo(DefaultLayout, ['deviceInfo']);

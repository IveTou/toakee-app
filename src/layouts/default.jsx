import React from 'react';
import PropTypes from 'prop-types';
import { ReactTitle } from 'react-meta-tags';
import autoBind from 'react-autobind';
import { compose } from 'recompose';

import { withInfo } from '~/src/hocs';
import TopBar from '~/src/components/top-bar';
import Footer from '~/src/components/footer';
import SideNav from '~/src/components/sidenav';
import Scroller from '~/src/components/scroller';
import { fbInit } from '~/src/utils/facebook';

import { withDefaultStyle } from './styles';

export class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { navOpen: props.deviceInfo.is('desktop') };
  }

  componentDidMount() {
    fbInit(() => {});
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const {
      classes,
      children,
      hideFooter,
      title = 'Descubra o que fazer em Salvador',
    } = this.props;
    const { navOpen } = this.state;
    const isMobile = !this.props.deviceInfo.is('desktop');

    return (
      <div className={classes.root}>
        <ReactTitle title={`Toakee - ${title}`} />
        <TopBar onToggle={this.toggleNav} mobile={isMobile} />
        <SideNav mobile={isMobile} open={navOpen} onToggle={this.toggleNav} />
        <main className={classes.main}>
          <Scroller />
          {children}
          <If condition={!hideFooter}>
            <Footer />
          </If>
        </main>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.object,
  deviceInfo: PropTypes.object,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
};

export default compose(
  withInfo(['deviceInfo']),
  withDefaultStyle,
)(DefaultLayout);

import React, { PropTypes } from 'react';
import { Drawer, Divider, Menu, MenuItem } from 'material-ui';
import { SocialPerson } from 'material-ui/svg-icons';

if (process.env.BROWSER) {
  require('./style.scss');
}

const SideNav = ({ open }) => (
  <Drawer className="SideNav" open={open} containerStyle={{ marginTop: '72px' }}>
    <Menu>
      <MenuItem primaryText="Preview" leftIcon={<SocialPerson />} />
      <MenuItem primaryText="Share" leftIcon={<SocialPerson />} />
      <Divider />
      <MenuItem primaryText="Make a copy" leftIcon={<SocialPerson />} />
    </Menu>
  </Drawer>
);

SideNav.propTypes = {
  open: PropTypes.bool,
};

export default SideNav;

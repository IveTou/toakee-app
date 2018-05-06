import React from 'react';
import { set }from 'lodash';

export class Scroller extends React.Component {
  render() {
    set(document.querySelector('main'), 'scrollTop', 0);
    return null;
  }
}

export default Scroller;

import { set } from 'lodash';

const Scroller = () => {
  if(global.document) {
    set(document.querySelector('main'), 'scrollTop', 0);
  }
  return null;
}

export default Scroller;

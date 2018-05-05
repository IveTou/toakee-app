import { set }from 'lodash';

const Scroller = () => {
  set(document.querySelector('main'), 'scrollTop', 0);
  return null;
}

export default Scroller;

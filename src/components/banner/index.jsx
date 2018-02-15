import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'material-ui';

if (process.env.BROWSER) {
  require('./style.scss');
}

const Banner = () => (
  <Link className="Banner" to="/">
    <div className="Banner-description" >
      <h1 className="Banner-description-title">Title Title Title text have to fill just 2 lines so limit that</h1>
      <div className="Banner-description-calendar">
        <div className="Banner-description-calendar-month">
        Jan
        </div>
        <div className="Banner-description-calendar-day">
         28
        </div>
      </div>
      <div className="Banner-description-timeAndPlace">
        <div className="Banner-description-timeAndPlace-place">
          <Icon>place</Icon><span>place the placeis name has to be in 2 line no more and fill the lmited space</span>
        </div>
        <div className="Banner-description-timeAndPlace-time">
          <Icon>schedule</Icon><span>17h</span>
        </div>
      </div>
      <If condition={true}>
        <h2 className="Banner-description-call">Veja como foi</h2>
      </If>
    </div>
  </Link>
);

export default Banner;

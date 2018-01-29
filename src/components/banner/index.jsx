import React from 'react';
import { Link } from 'react-router-dom';
import { ActionSchedule, MapsPlace } from 'material-ui/svg-icons';
import { white } from 'material-ui/styles/colors';
import { banners } from '~/src/constants';

if (process.env.BROWSER) {
  require('./style.scss');
}

declare var banner;

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
          <MapsPlace color={white} /><span>place the placeis name has to be in 2 line no more and fill the lmited space</span>
        </div>
        <div className="Banner-description-timeAndPlace-time">
          <ActionSchedule color={white} /><span>17h</span>
        </div>
      </div>
      <If condition={true}>
        <h2 className="Banner-description-call">Veja como foi</h2>
      </If>
    </div>
  </Link>
);

export default Banner;

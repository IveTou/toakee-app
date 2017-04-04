import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import { fetchEvents } from '~/src/toakee-core/ducks/events';
import { fetchGuestLists } from '~/src/toakee-core/ducks/guest-lists';

import Input from '~/src/components/input';
import Button from '~/src/components/button';
import TextArea from '~/src/components/text-area';

if (process.env.BROWSER) {
  require('./style.scss');
}

class EventPage extends React.Component {
  componentWillMount() {
    const { slug } = this.props.router.params;
    const { event, dispatch } = this.props;

    const params = event.id
      ? { eventId: event.id }
      : { eventSlug: slug };

    dispatch(fetchGuestLists(params));
    if (!event.id) {
      dispatch(fetchEvents({ slug }));
    }
  }

  render() {
    const { event, guestLists } = this.props;
    const { title, description, place, start, price, flyer } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const flyerSrc = flyer || 'imgs/partying';

    declare var guestList;
    declare var idx;

    return (
      <div className="EventPage">
        <div className="EventPage-header">
          <div className="EventPage-header-flyer mdl-card mdl-shadow--2dp">
            <img alt={flyerAlt} className="EventPage-header-flyer-img" src={flyerSrc} />
          </div>
          <div className="EventPage-header-right">
            <div className="EventPage-header-right-title">
              {title}
            </div>
            <If condition={place}>
              <div className="EventPage-header-right-place">
                {place.name}
              </div>
            </If>
          </div>
        </div>

        <div className="EventPage-info">
          <If condition={start}>
            <div className="EventPage-info-item">
              <i className="fa fa-calendar"/>
              <span>{fullDateFormat(start)}</span>
            </div>
            <div className="EventPage-info-item">
              <i className="fa fa-clock-o"/>
              <span>{timeFormat(start)}</span>
            </div>
          </If>
          <If condition={place && place.address}>
            <div className="EventPage-info-item">
              <i className="fa fa-map-marker"/>
              <span>{place.address}</span>
            </div>
          </If>
          <If condition={price}>
            <div className="EventPage-info-item">
              <i className="fa fa-blr">R$</i>
              <span>{price}</span>
            </div>
          </If>
        </div>

        <div className="EventPage-body">
          <div className="EventPage-body-description">
            <div className="EventPage-body-title">Descrição</div>
            <div
              className="EventPage-body-content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className="EventPage-body-guestLists">
            <div className="EventPage-body-title">Nome na lista</div>
            <div className="EventPage-body-content">
              <For each="guestList" index="idx" of={guestLists}>
                <Input key={guestList.id} type="radio" name="guestList" value={guestList.id} checked={idx === 0}>
                  {guestList.name}
                </Input>
              </For>
              <TextArea
                rows="4"
                className="EventPage-body-guestLists-area"
                name="names"
                placeholder="Escreva cada nome em uma linha"
              />
              <Button
                className="EventPage-body-guestLists-button"
                label="Enviar"
                type="submit"
                accent
                colored
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ events, guestLists }, { router }) => {
  const event = events
    .get('data')
    .filter(({ slug }) => slug === router.params.slug)
    .first() || {};

  return {
    event,
    guestLists: guestLists.get('data').filter(({ eventId }) => event.id === eventId).toArray(),
  }
})(EventPage);

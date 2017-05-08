import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

import config from '~/src/config';
import { formRef } from '~/src/utils/form';

import { fullDateFormat, timeFormat } from '~/src/utils/moment';
import { fetchEvents } from '~/src/toakee-core/ducks/events';
import { fetchGuestLists } from '~/src/toakee-core/ducks/guest-lists';
import { addNamesToGuestList } from '~/src/toakee-core/ducks/invitations';

import Input from '~/src/components/input';
import Button from '~/src/components/button';
import TextArea from '~/src/components/text-area';

if (process.env.BROWSER) {
  require('./style.scss');
}

let listener = () => {};
window.recaptchaCallback = () => listener();

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const { slug } = this.props.router.params;
    const { event, dispatch } = this.props;

    const params = event.id
      ? { eventId: event.id }
      : { eventSlug: slug };

    dispatch(fetchGuestLists(params));
    if (!event.id || !event.description) {
      dispatch(fetchEvents({ slug, full: true }));
    }
  }

  submit(e) {
    e.preventDefault();

    listener = () => {
      const recaptchaToken = this.form['g-recaptcha-response'].value;
      if (recaptchaToken) {
        const names = this.form.names.value
          .split('\n')
          .map(name => name.trim().replace(/\s\s+/g, ' '))
          .filter(name => name);

        if (names.length) {
          const { event, dispatch } = this.props;
          const guestListId = this.form.guestList.value;
          dispatch(addNamesToGuestList(event.id, guestListId, names, recaptchaToken));
        }
      }
    };
  }

  render() {
    const { event, guestLists } = this.props;
    const { title, description, place, start, price, flyer } = event;
    const flyerAlt = `Flyer do ${title || 'evento'}`;
    const flyerSrc = flyer || `${config.ASSETS_BASE_URI}/core/site/partying`;

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
              <i className="fa fa-calendar" />
              <span>{fullDateFormat(start)}</span>
            </div>
            <div className="EventPage-info-item">
              <i className="fa fa-clock-o" />
              <span>{timeFormat(start)}</span>
            </div>
          </If>
          <If condition={place && place.address}>
            <div className="EventPage-info-item">
              <i className="fa fa-map-marker" />
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
          <If condition={guestLists.length}>
            <div className="EventPage-body-guestLists">
              <div className="EventPage-body-title">Nome na lista</div>
              <div className="EventPage-body-content">
                <form ref={formRef(this)} className="EventPage-form">
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
                    className="EventPage-body-guestLists-button g-recaptcha"
                    label="Enviar"
                    type="submit"
                    dataProps={{ sitekey: config.RECAPTCHA_SITE_KEY, callback: 'recaptchaCallback' }}
                    accent
                    colored
                    onClick={this.submit}
                  />
                </form>
              </div>
            </div>
          </If>
        </div>
      </div>
    );
  }
}

EventPage.propTypes = {
  event: PropTypes.object,
  dispatch: PropTypes.func,
  guestLists: PropTypes.array,
  router: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

export default connect(({ events, guestLists }, { router }) => {
  const event = events
    .get('data')
    .filter(({ slug }) => slug === router.params.slug)
    .first() || {};

  return {
    event,
    guestLists: guestLists.get('data').filter(({ eventId }) => event.id === eventId).toArray(),
  };
})(EventPage);

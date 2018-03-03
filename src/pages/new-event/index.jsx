import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { Typography } from 'material-ui';

import { showSnackbar } from '~/src/ducks/snackbar';
import { withViewer } from '~/src/hocs';
import CloudinaryApi from '~/src/toakee-core/apis/cloudinary.js';

import EventForm from '~/src/components/event-form';

import { createEventMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

const NewEventPage = ({
  history,
  viewer: { isAdmin },
  alertError,
  alertSuccess,
  createEvent,
}) => {
  const handleSubmit = async (form) => {
    const { flyer, categories, prices, place } = form;
    const { url: flyerUrl } = await CloudinaryApi.uploadFlyer(flyer);

    const { data } = await createEvent({
      ...form,
      flyer: flyerUrl,
      categories: categories.map(({ id, title }) => (id ? { id } : { title })),
      status: isAdmin ? 'ACTIVE' : 'PENDING',
      prices: (prices.length === 1 && prices[0].value)
        ? [{ value: prices[0].value }]
        : prices.filter(p => p.description && p.value),
      place: place.id
        ? { id: place.id }
        : pick(place, ['name', 'address', 'coordinates', 'googlePlacesId']),
    });

    alertSuccess();
    if (!isAdmin) {
      setTimeout(() => history.push(`/evento/${data.createEvent.id}`), 2000);
    }
  };

  return (
    <div className="NewEventPage">
      <Typography className="NewEventPage-title" variant="title">Novo Evento</Typography>
      <EventForm onSubmit={handleSubmit} onError={alertError} />
    </div>
  );
};

NewEventPage.propTypes = {
  viewer: PropTypes.object,
  history: PropTypes.object,
  createEvent: PropTypes.func,
  alertError: PropTypes.func,
  alertSuccess: PropTypes.func,
};

const NewEventPageWithMutation = graphql(createEventMutation, {
  props: ({ mutate }) => ({
    createEvent: variables => mutate({ variables }),
  }),
})(withViewer(NewEventPage));

export default connect(
  () => ({}),
  dispatch => ({
    alertError: () => dispatch(showSnackbar({
      message: 'Existem erros no formulário, verifique os campos em vermelho...',
    })),
    alertSuccess: () => dispatch(showSnackbar({
      message: 'Evento criado com sucesso!',
    })),
  }),
)(NewEventPageWithMutation);

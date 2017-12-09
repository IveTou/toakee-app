import React, { PropTypes } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { reduce, pick } from 'lodash';

import { showSnackbar } from '~/src/ducks/snackbar';
import { withViewer } from '~/src/hocs';
import DefaultLayout from '~/src/layouts/default';
import CloudinaryApi from '~/src/toakee-core/apis/cloudinary.js';

import EventForm from '~/src/components/event-form';

import query, { updateEventMutation } from './graphql';

const EditEventPage = ({
  event,
  history,
  viewer,
  alertError,
  alertSuccess,
  updateEvent,
}) => {
  if (event.creator.id !== viewer.id && !viewer.isAdmin) {
    history.replace(`/evento/${event.id}`);
  }

  const handleSubmit = async (form) => {
    const { id, flyer } = form;
    const { url: flyerUrl } = flyer.url ? flyer : await CloudinaryApi.uploadFlyer(flyer);

    const patch = reduce(form, (obj, value, key) => {
      if (key === 'flyer') {
        return event.flyer === flyerUrl ? obj : { ...obj, flyer: flyerUrl };
      } else if (key === 'place') {
        const place = value.id
          ? { id: value.id }
          : pick(value, ['name', 'address', 'coordinates', 'googlePlacesId']);
        return event.place === value ? obj : { ...obj, place };
      }
      return event[key] === value ? obj : { ...obj, [key]: value };
    }, {});

    await updateEvent({ eventId: id, patch });

    alertSuccess();
    if (!viewer.isAdmin) {
      setTimeout(() => history.push(`/evento/${id}`), 2000);
    }
  };

  return (
    <DefaultLayout>
      <EventForm onSubmit={handleSubmit} onError={alertError} event={event} />
    </DefaultLayout>
  );
};

EditEventPage.propTypes = {
  viewer: PropTypes.object,
  event: PropTypes.object,
  history: PropTypes.object,
  updateEvent: PropTypes.func,
  alertError: PropTypes.func,
  alertSuccess: PropTypes.func,
};

const injectData = graphql(query, {
  options: ({ match }) => ({
    variables: { id: match.params.id },
  }),
  props: ({ data: { event } }) => ({ event }),
});

const injectUpdateEventMutation = graphql(updateEventMutation, {
  props: ({ mutate }) => ({
    updateEvent: variables => mutate({
      variables,
      update: (store, { data: { updateEvent } }) => {
        const data = store.readQuery({ query, variables: { id: variables.eventId } });
        data.event = updateEvent;
        store.writeQuery({ query, data });
      },
    }),
  }),
});

const EditEventPageWithData = compose(
  injectData,
  injectUpdateEventMutation,
)(withViewer(EditEventPage));

export default connect(
  () => ({}),
  dispatch => ({
    alertError: () => dispatch(showSnackbar({
      message: 'Existem erros no formulário, verifique os campos em vermelho...',
    })),
    alertSuccess: () => dispatch(showSnackbar({
      message: 'Evento atualizado com sucesso!',
    })),
  }),
)(EditEventPageWithData);

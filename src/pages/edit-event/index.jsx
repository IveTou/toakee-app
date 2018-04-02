import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { reduce, pick, xorBy, xorWith, isEqual } from 'lodash';
import { Typography } from 'material-ui';

import { showSnackbar } from '~/src/ducks/snackbar';
import { withViewer } from '~/src/hocs';
import DefaultLayout from '~/src/layouts/default';
import CloudinaryApi from '~/src/toakee-core/apis/cloudinary.js';

import EventForm from '~/src/components/event-form';

import query, { updateEventMutation } from './graphql';

if (process.env.BROWSER) {
  require('./style.scss');
}

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
      } else if (key === 'start' || key === 'end') {
        return value.isSame(event[key]) ? obj : { ...obj, [key]: value };
      } else if (key === 'prices') {
        const mapping = cs => cs.map(c => pick(c, ['description', 'value']));
        const prices = mapping(value);
        return xorWith(prices, mapping(event[key]), isEqual).length
          ? { ...obj, [key]: value }
          : obj;
      } else if (key === 'categories') {
        const mapping = cs => cs.map(c => pick(c, ['id', 'title']));
        const categories = mapping(value);
        return xorBy(categories, mapping(event[key]), 'title').length
          ? { ...obj, [key]: categories }
          : obj;
      } else if (key === 'discountLists') {
        const mapping = dls => dls.map(dl => pick(dl, ['id', 'name', 'registrationDeadline']));
        const comparator = dl => `${dl.name}|${dl.registrationDeadline}`;
        const discountLists = mapping(value);
        return xorBy(discountLists, mapping(event[key]), comparator).length
          ? { ...obj, [key]: discountLists }
          : obj;
      }
      return isEqual(event[key], value) ? obj : { ...obj, [key]: value };
    }, {});

    await updateEvent({ eventId: id, patch });

    alertSuccess();
    if (!viewer.isAdmin) {
      setTimeout(() => history.push(`/evento/${id}`), 2000);
    }
  };

  return (
    <DefaultLayout>
      <div className="EditEventPage">
        <Typography className="EditEventPage-title" variant="title">Editar Evento</Typography>
        <EventForm onSubmit={handleSubmit} onError={alertError} event={event} />
      </div>
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

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik } from 'formik';
import { Button } from 'material-ui';
import { compose, withStateHandlers } from 'recompose';

import { throwInner } from '~/src/utils/validation';
import { omitTypenames } from '~/src/utils/graphql';
import { withGraphqlError } from '~/src/hocs/graphql';

import EventFormSection from './section';
import EventFormMain from './main';
import EventFormPlace from './place';
import EventFormPrices from './prices';
import EventFormDescription from './description';

import { withIndexStyle } from './styles';
import { schema } from './validation';

const sections = [
  { title: '1. Principal', component: EventFormMain },
  { title: '2. Local', component: EventFormPlace },
  { title: '3. Preços', component: EventFormPrices },
  { title: '4. Descrição e Categorias', component: EventFormDescription },
];

const initialValues = (event) => {
  const {
    start, end, flyer,
    prices = [{}], categories = [],
    ...eventProps
  } = event || {};

  return {
    title: '',
    place: {},
    description: '',
    categories: omitTypenames(categories),
    prices: omitTypenames(prices),
    flyer: flyer ? { url: flyer } : {},
    start: start ? moment(start) : null,
    end: end ? moment(end) : null,
    ...eventProps,
  };
};

export const EventForm = ({
  event, onSubmit, onError, onGraphqlError, onToggle, expanded, classes
}) => (
  <Formik
    initialValues={initialValues(event)}
    validateOnChange={false}
    validate={(values) =>
      schema.validate(values, { abortEarly: false })
        .catch(error => {
          onError();
          throwInner(error);
        })
    }
    onSubmit={(values, { setSubmitting }) => {
      onSubmit(values)
        .then(() => setSubmitting(false))
        .catch(onGraphqlError);
    }}
    render={({ handleSubmit, isSubmitting, ...form }) => (
      <form className={classes.root} onSubmit={handleSubmit}>
        <For each="section" of={sections} index="idx">
          <EventFormSection
            key={idx}
            Section={section.component}
            title={section.title}
            onToggle={() => onToggle(idx)}
            expanded={expanded[idx]}
            form={form}
          />
        </For>
        <div className={classes.submit}>
          <Button
            type="submit"
            disabled={isSubmitting}
            color="primary"
            variant="raised"
          >
            Salvar
          </Button>
        </div>
      </form>
    )}
  />
);

EventForm.propTypes = {
  event: PropTypes.object,
  classes: PropTypes.object,
  onToggle: PropTypes.func,
  onError: PropTypes.func,
  onGraphqlError: PropTypes.func,
  onSubmit: PropTypes.func,
  expanded: PropTypes.arrayOf(PropTypes.bool),
};

const withState = withStateHandlers(
  { expanded: sections.map(_ => true) },
  {
    onToggle: ({ expanded }) => i => ({
      expanded: expanded.map((v, idx) => idx === i ? !v : v),
    })
  },
);

export default compose(
  withState,
  withIndexStyle,
  withGraphqlError,
)(EventForm);

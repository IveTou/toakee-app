import React, { PropTypes } from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { RaisedButton } from 'material-ui';

import EventFormSection from './section';
import EventFormMain, { validation as mainValidation } from './main';
import EventFormDates, { validation as datesValidation } from './dates';
import EventFormPlace, { validation as placeValidation } from './place';
import EventFormPrices from './prices';
import EventFormDescription from './description';

if (process.env.BROWSER) {
  require('./style.scss');
}

export const EventForm = ({ handleSubmit, isSubmitting, ...form }) => (
  <div className="EventForm">
    <form onSubmit={handleSubmit}>
      <div className="EventForm-body">
        <EventFormSection title="1. Principal" form={form} Section={EventFormMain} />
        <EventFormSection title="2. Data" form={form} Section={EventFormDates} />
        <EventFormSection title="3. Local" form={form} Section={EventFormPlace} />
        <EventFormSection title="4. Preços" form={form} Section={EventFormPrices} />
        <EventFormSection
          title="5. Descrição e Categorias"
          form={form}
          Section={EventFormDescription}
        />
      </div>

      <div className="EventForm-submit">
        <RaisedButton
          type="submit"
          label="Salvar"
          disabled={isSubmitting}
          primary
        />
      </div>
    </form>
  </div>
);

EventForm.propTypes = {
  deviceInfo: PropTypes.object,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default withFormik({
  mapPropsToValues: ({ event = {} }) => {
    const { start, end, flyer, ...eventProps } = event;

    return {
      title: '',
      place: {},
      prices: [],
      description: '',
      categories: [],
      flyer: flyer ? { url: flyer } : {},
      start: start ? new Date(start) : null,
      end: end ? new Date(end) : null,
      ...eventProps,
    };
  },
  validateOnChange: false,
  validate: async (values, { onError }) =>
    Yup.object()
      .shape({
        ...mainValidation,
        ...datesValidation,
        ...placeValidation,
      })
      .validate(values, { abortEarly: false })
      .catch(({ inner }) => {
        onError();
        throw inner.reduce((acc, curr) => ({ ...acc, [curr.path]: curr.message }), {});
      }),
  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values)
      .then(() => setSubmitting(false))
      .catch(props.onError);
  },
  displayName: 'EventForm',
})(EventForm);

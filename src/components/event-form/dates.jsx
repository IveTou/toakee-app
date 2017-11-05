import React, { PropTypes } from 'react';
import moment from 'moment';
import { Form, Segment } from 'semantic-ui-react';
import Yup from 'yup';
import DatePicker from 'react-datepicker';

import ErrorLabel from '~/src/components/error-label';

if (process.env.BROWSER) {
  require('react-datepicker/dist/react-datepicker-cssmodules.css');
}

const EventFormDates = ({
  form: { values, errors, setFieldValue, touched },
}) => (
  <Segment className="EventFormDates">
    <Form.Input
      label="Começa"
      labelPosition="right corner"
      error={touched.start && !!errors.start}
    >
      <DatePicker
        placeholderText="Clique para selecionar"
        selected={values.start}
        dateFormat="DD/MM/YY HH:mm"
        timeFormat="HH:mm"
        showTimeSelect
        onChange={time => setFieldValue('start', time)}
        shouldCloseOnSelect={false}
        customInput={<input style={{ width: '100%' }} />}
      />
      <ErrorLabel error={touched.start && errors.start} />
    </Form.Input>
    <Form.Input
      label="Termina"
      labelPosition="right corner"
      error={touched.end && !!errors.end}
    >
      <DatePicker
        placeholderText="Clique para selecionar"
        selected={values.end}
        dateFormat="DD/MM/YY HH:mm"
        timeFormat="HH:mm"
        showTimeSelect
        onChange={time => setFieldValue('end', time)}
        shouldCloseOnSelect={false}
        customInput={<input style={{ width: '100%' }} />}
      />
      <ErrorLabel error={touched.end && errors.end} />
    </Form.Input>
  </Segment>
);

EventFormDates.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    touched: PropTypes.object,
  }),
};

export const validation = {
  start: Yup.mixed()
    .required('Por favor, insira a data de início.')
    .test(
      'isFuture',
      'Por favor, insira uma data futura.',
      date => moment().isBefore(date),
    ),
  end: Yup.mixed()
    .required('Por favor, insira a data de término.')
    .when('start', (start, schema) => (
      schema.test(
        'isAfterStart',
        'Por favor, insira uma data após a data de início.',
        end => end && end.isAfter(start),
      )
    )),
};

export default EventFormDates;

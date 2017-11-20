import React, { PropTypes } from 'react';
import Yup from 'yup';
import { DatePicker, TimePicker } from 'material-ui';

import MaterialError from '~/src/components/material-error';

const EventFormDates = ({
  form: { values, errors, setFieldValue, touched },
}) => {
  const handleDateChange = (field, dateTime) => {
    const [name, period] = field.split(':');
    const date = values[name] || new Date();
    if (period === 'date') {
      date.setFullYear(dateTime.getFullYear());
      date.setMonth(dateTime.getMonth());
      date.setDate(dateTime.getDate());
    } else {
      date.setHours(dateTime.getHours());
      date.setMinutes(dateTime.getMinutes());
    }
    setFieldValue(name, date);
  };

  return (
    <div className="EventFormDates">
      <div className="EventFormDates-picker">
        <DatePicker
          floatingLabelText="Data início"
          value={values.start}
          onChange={(_, date) => handleDateChange('start:date', date)}
          errorText={touched.start && errors.start && ' '}
          autoOk
          fullWidth
        />
      </div>
      <div className="EventFormDates-picker">
        <TimePicker
          floatingLabelText="Horário"
          value={values.start}
          format="24hr"
          onChange={(_, time) => handleDateChange('start:time', time)}
          errorText={touched.start && errors.start && ' '}
          autoOk
          fullWidth
        />
      </div>
      <MaterialError error={touched.start && errors.start} />
      <div className="EventFormDates-picker">
        <DatePicker
          floatingLabelText="Data término"
          value={values.end}
          onChange={(_, date) => handleDateChange('end:date', date)}
          errorText={touched.end && errors.end && ' '}
          autoOk
          fullWidth
        />
      </div>
      <div className="EventFormDates-picker">
        <TimePicker
          floatingLabelText="Horário"
          value={values.end}
          format="24hr"
          onChange={(_, time) => handleDateChange('end:time', time)}
          errorText={touched.end && errors.end && ' '}
          autoOk
          fullWidth
        />
      </div>
      <MaterialError error={touched.end && errors.end} />
    </div>
  );
};

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
      'isAfterNow',
      'Por favor, insira uma data futura.',
      start => start > new Date(),
    ),
  end: Yup.mixed()
    .required('Por favor, insira a data de término.')
    .when('start', (start, schema) => schema.test(
      'isAfterStart',
      'Por favor, insira uma data após a data de início.',
      end => end && (end > (start || new Date())),
    )),
};

export default EventFormDates;

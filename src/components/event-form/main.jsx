import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { Icon } from 'material-ui';
import FormField from '~/src/components/form-field';
import { DateTimePicker } from 'material-ui-pickers';

import MaterialError from '~/src/components/material-error';
import { withMainStyle } from './styles';

moment.locale('pt-br');
const dateFormat = 'D [de] MMM [às] HH:mm';

const EventFormMain = ({
  form: { values, errors, handleChange, setFieldValue, touched },
  classes,
}) => {
  const handleDropzoneChange = ([file]) => setFieldValue('flyer', file);
  const dropzoneClasses = classNames(classes.dropzone, {
    [classes.dropzoneError]: touched.flyer && !!errors.flyer,
  });

  const flyer = values.flyer.url || values.flyer.preview;

  return (
    <div className={classes.root}>
      <If condition={flyer}>
        <div className={classes.preview}>
          <img src={flyer} className={classes.previewImg} />
        </div>
      </If>
      <Dropzone
        className={dropzoneClasses}
        multiple={false}
        accept="image/*"
        onDrop={handleDropzoneChange}
      >
        <Icon className={classes.dropzoneIcon}>file_upload</Icon>
        Clique para adicionar flyer
      </Dropzone>
      <MaterialError error={touched.flyer && errors.flyer} center />
      <FormField
        className={classes.formField}
        name="title"
        label="Título"
        value={values.title}
        onChange={handleChange}
        error={touched.title && errors.title}
        fullWidth
      />
      <div className={classes.dates}>
        <div>
          <DateTimePicker
            label="Data início"
            cancelLabel="Cancelar"
            value={values.start}
            onChange={dateTime => setFieldValue('start', dateTime)}
            error={touched.start && !!errors.start}
            format={dateFormat}
            ampm={false}
            fullWidth
            autoOk
          />
          <MaterialError error={touched.start && errors.start} />
        </div>
        <div>
          <DateTimePicker
            label="Data término"
            cancelLabel="Cancelar"
            value={values.end}
            onChange={dateTime => setFieldValue('end', dateTime)}
            error={touched.end && errors.end}
            format={dateFormat}
            ampm={false}
            fullWidth
            autoOk
          />
          <MaterialError error={touched.end && errors.end} />
        </div>
      </div>
    </div>
  );
};

EventFormMain.propTypes = {
  classes: PropTypes.object,
  form: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    touched: PropTypes.object,
  }),
};

export default withMainStyle(EventFormMain);

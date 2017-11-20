import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Yup from 'yup';
import classNames from 'classnames';
import { TextField, FontIcon } from 'material-ui';

import MaterialError from '~/src/components/material-error';

const MAX_IMAGE_SIZE = 3145728;
const MAX_TITLE_LEN = 40;

const EventFormMain = ({
  form: { values, errors, handleChange, setFieldValue, touched },
}) => {
  const handleDropzoneChange = ([file]) => setFieldValue('flyer', file);
  const dropzoneClasses = classNames('EventFormMain-dropzone', {
    'EventFormMain-dropzone--error': touched.flyer && !!errors.flyer,
  });

  const flyer = values.flyer.url || values.flyer.preview;

  return (
    <div className="EventFormMain">
      <If condition={flyer}>
        <div className="EventFormMain-preview">
          <img
            src={flyer}
            className="EventFormMain-preview-img"
          />
        </div>
      </If>
      <Dropzone
        className={dropzoneClasses}
        multiple={false}
        accept="image/*"
        onDrop={handleDropzoneChange}
      >
        <FontIcon className="EventFormMain-dropzone-icon material-icons">file_upload</FontIcon>
        <div className="EventFormMain-dropzone-disclaimer">
          Clique para adicionar flyer
        </div>
      </Dropzone>
      <MaterialError error={touched.flyer && errors.flyer} center />
      <TextField
        name="title"
        floatingLabelText="Título"
        value={values.title}
        onChange={handleChange}
        errorText={touched.title && errors.title}
        fullWidth
      />
    </div>
  );
};

EventFormMain.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    touched: PropTypes.object,
  }),
};

export const validation = {
  title: Yup.string()
    .required('O título é obrigatório')
    .max(MAX_TITLE_LEN, 'O título não pode conter mais de ${max} caracteres'), // eslint-disable-line no-template-curly-in-string
  flyer: Yup.mixed()
    .test(
      'existence',
      'Por favor, adicione um flyer para o seu evento.',
      file => file.url || !!file.size,
    )
    .test(
      'format',
      'A imagem deve ser do formato \'.png\' ou \'.jpg\'.',
      file => file.url || /image\/*/.test(file.type),
    )
    .test(
      'size',
      'A imagem não pode ter mais de 5mb.',
      file => file.url || file.size <= MAX_IMAGE_SIZE,
    ),
};

export default EventFormMain;

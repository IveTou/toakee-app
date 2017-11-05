import React, { PropTypes } from 'react';
import { Form, Segment, Icon, Image } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Yup from 'yup';
import classNames from 'classnames';

import ErrorLabel from '~/src/components/error-label';

const MAX_IMAGE_SIZE = 3145728;
const MAX_TITLE_LEN = 40;

const EventFormMain = ({
  form: { values, errors, handleChange, setFieldValue, touched },
}) => {
  const handleDropzoneChange = ([file]) => setFieldValue('flyer', file);
  const dropzoneClasses = classNames('EventFormMain-dropzone', {
    'EventFormMain-dropzone--error': touched.flyer && !!errors.flyer,
  });

  return (
    <Segment className="EventFormMain">
      <If condition={values.flyer.preview}>
        <Image
          src={values.flyer.preview}
          className="EventFormMain-preview"
          label={<ErrorLabel error={touched.flyer && errors.flyer} />}
        />
      </If>
      <Dropzone
        className={dropzoneClasses}
        multiple={false}
        accept="image/*"
        onDrop={handleDropzoneChange}
      >
        <ErrorLabel error={touched.flyer && errors.flyer} />
        <Icon name="upload" size="huge" />
        <div className="EventFormMain-dropzone-disclaimer">
          Clique para adicionar flyer
        </div>
      </Dropzone>
      <Form.Input
        name="title"
        placeholder="Título"
        value={values.title}
        onChange={handleChange}
        error={touched.title && !!errors.title}
        labelPosition="right corner"
      >
        <input />
        <ErrorLabel error={touched.title && errors.title} />
      </Form.Input>
    </Segment>
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
    .max(MAX_TITLE_LEN, 'O título não pode conter mais de ${max} caracteres'),
  flyer: Yup.mixed()
    .test(
      'existence',
      'Por favor, adicione um flyer para o seu evento.',
      file => !!file.size,
    )
    .test(
      'format',
      'A imagem deve ser do formato \'.png\' ou \'.jpg\'.',
      file => /image\/*/.test(file.type),
    )
    .test(
      'size',
      'A imagem não pode ter mais de 5mb.',
      file => file.size <= MAX_IMAGE_SIZE,
    ),
};

export default EventFormMain;

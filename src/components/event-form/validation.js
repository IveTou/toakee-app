// eslint-disable no-template-curly-in-string

import Yup from 'yup';
import { setDefaults, required } from '~/src/utils/validation';

const IMAGE_MAX_SIZE = 3145728;
const TITLE_MAX_LEN = 40;

setDefaults();

export const schema = Yup.object().shape({
  title: Yup.string().required().max(TITLE_MAX_LEN),

  flyer: Yup.mixed()
    .test('existence', required, file => file.url || !!file.size)
    .test(
      'format',
      'A imagem deve ser do formato \'.png\' ou \'.jpg\'.',
      file => file.url || /image\/*/.test(file.type),
    )
    .test(
      'size',
      'A imagem não pode ter mais de 5mb.',
      file => file.url || file.size <= IMAGE_MAX_SIZE,
    ),

  start: Yup.mixed()
    .required()
    .test(
      'isAfterNow',
      'Por favor, insira uma data futura.',
      start => start > new Date(),
    ),

  end: Yup.mixed()
    .required()
    .when('start', (start, schema) => schema.test(
      'isAfterStart',
      'Por favor, insira uma data após a data de início.',
      end => end && (end > (start || new Date())),
    )),

  place: Yup.mixed()
    .test(
      'placeConfigured',
      required,
      place => (place.id || (place.name && place.address && place.coordinates)),
    ),
});

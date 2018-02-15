import { setLocale } from 'yup/lib/customLocale'

export const required = 'Campo obrigatório';
export const min = 'Mínimo de ${min} caracteres';
export const max = 'Máximo de ${max} caracteres';

export const setDefaults = () =>
  setLocale({
    mixed: { required },
    string: { required, max },
  });

export const throwInner = ({ inner }) => {
  throw inner.reduce((acc, curr) => ({ [curr.path]: curr.message, ...acc }), {});
};


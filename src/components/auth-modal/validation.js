import Yup from 'yup';

const USERNAME_MIN_LEN = 4;
const USERNAME_MAX_LEN = 20;

const PASS_MIN_LEN = 6;
const PASS_MAX_LEN = 30;

const FIRST_NAME_MIN_LEN = 3;
const FIRST_NAME_MAX_LEN = 20;

const LAST_NAME_MIN_LEN = 3;
const LAST_NAME_MAX_LEN = 20;

const required = 'Campo obrigatório';
const invalid = 'Campo inválido';
const min = 'Mínimo de ${min} caracteres';
const max = 'Máximo de ${max} caracteres';

const firstName = Yup.string()
  .required(required)
  .min(FIRST_NAME_MIN_LEN, min)
  .max(FIRST_NAME_MAX_LEN, max);

const lastName = Yup.string()
  .required(required)
  .min(LAST_NAME_MIN_LEN, min)
  .max(LAST_NAME_MAX_LEN, max)

const username = Yup.string()
  .required(required)
  .min(USERNAME_MIN_LEN, min)
  .max(USERNAME_MAX_LEN, max)
  .matches(
    /^[a-zA-Z][a-zA-Z0-9]+$/,
    'O usuário não pode conter caracteres especiais, nem começar com número',
  );

const password = Yup.string()
  .required(required)
  .min(PASS_MIN_LEN, min)
  .max(PASS_MAX_LEN, max)

const email = Yup.string()
  .required(required)
  .email(invalid);

export const loginSchema = Yup.object().shape({ username, password });
export const signUpSchema = Yup.object().shape({
  firstName, lastName, email, username, password,
});

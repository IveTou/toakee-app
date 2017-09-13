import validate from 'validate.js';

validate.validators.presence.options = { message: 'Favor preencher todos os dados.' };
validate.options = { fullMessages: false };

const presence = true;

export const validateSignUp = obj => validate(obj, {
  firstName: {
    presence,
  },
  lastName: {
    presence,
  },
  username: {
    presence,
    length: {
      minimum: 6,
      maximum: 14,
      tooShort: 'O usuário precisa ter no mínimo 6 caracteres.',
      tooLong: 'O usuário não pode conter mais de 14 caracteres.',
    },
    format: {
      pattern: '[a-z][a-z0-9]+',
      message: 'Usuário só pode conter letras e números, não pode começar com números.',
      flags: 'i',
    },
  },
  email: {
    presence,
    email: { message: 'O email não parece válido.' },
  },
  password: {
    presence,
    length: {
      minimum: 6,
      maximum: 30,
      tooShort: 'A senha precisa conter no mínimo 6 caracteres.',
      tooLong: 'A senha não pode conter mais de 30 caracteres.',
    },
  },
});

export const validateLogin = obj => validate(obj, {
  username: { presence },
  password: { presence },
});

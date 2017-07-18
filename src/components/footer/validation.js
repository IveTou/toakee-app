import validate from 'validate.js';

validate.validators.presence.options = { message: 'Favor preencher todos os dados.' };
validate.options = { fullMessages: false };

const presence = true;

export const validateContact = obj => validate(obj, {
  name: {
    presence,
    length: {
      minimum: 2,
      maximum: 14,
      tooShort: 'Seu nome precisa ter no mínimo 2 caracteres.',
      tooLong: 'Seu nome não pode conter mais de 14 caracteres.',
    },
  },
  email: {
    presence,
    email: { message: 'O email não parece válido.' },
  },
});

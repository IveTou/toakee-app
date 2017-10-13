import validate from 'validate.js';

validate.validators.presence.options = { message: 'Favor preencher este campo.' };
validate.options = { fullMessages: false };

const presence = true;

export const validateContact = obj => validate(obj, {
  name: { presence },
  email: { presence, email: { message: 'O email não parece válido.' } },
});

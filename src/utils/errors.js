export const errors = {
  'All.UNFILLED': 'Por favor, preencha todos os campos.',
  'Request.NOT_FOUND': 'A solicitação de amizade não foi encontrada.',
  'User.NOT_FOUND': 'Usuário não encontrado',
  'User.INVALID_CREDENTIALS': 'A senha e o usuário não conferem.',
  'User.ALREADY_EXISTS': 'Usuário já cadastrado.',
  'User.DUPLICATED_EMAIL': 'Já existe um cadastro com esse email.',
  'Recaptcha.INVALID': 'Opa. Você foi muito rápido, pareceu até um robô.',
};

export const errorFromKey =
  key => (errors[key] || 'Um erro ocorreu, tente novamente mais tarde.');

export const extractGraphQLError = error => errorFromKey(error.graphQLErrors[0].message);

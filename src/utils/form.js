export const stateSetter =
  (_this, state) => value => _this.setState({ [state]: value });

export const errors = {
  'All.UNFILLED': 'Por favor, preencha todos os campos.',
  'Request.NOT_FOUND': 'A solicitação de amizade não foi encontrada.',
  'User.NOT_FOUND': 'Usuário não encontrado',
  'User.INVALID_CREDENTIALS': 'A senha e o usuário não conferem.',
  'User.ALREADY_EXISTS': 'Usuário já cadastrado.',
};

export const errorFromKey =
  key => (errors[key] || 'Um erro ocorreu, tente novamente mais tarde.');

// eslint-disable-next-line no-param-reassign
export const formRef = _this => (ref) => { _this.form = ref; };

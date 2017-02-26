export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const setSocialToken = (network, token) => {
  localStorage.setItem(`${network}Token`, token);
};

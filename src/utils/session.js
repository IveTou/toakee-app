import Cookie from 'js-cookie';

export const logout = () => {
  localStorage.clear();
  Cookie.remove('token');
};
export const login = (token) => {
  localStorage.setItem('token', token);
  Cookie.set('token', token);
};

export const getToken = () => localStorage.getItem('token');
export const setSocialToken = (network, token) => {
  localStorage.setItem(`${network}Token`, token);
};
export const isLogged = () => !!getToken();

export const tracker = (viewer, eventName) => (
  viewer
  ? { name: `Logged ${eventName}`, pid: viewer.id }
  : { name: `Unlogged ${eventName}`, pid: 'Guest' }
);

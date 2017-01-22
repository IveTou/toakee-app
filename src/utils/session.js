export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const setFacebookToken = token => localStorage.setItem('facebookToken', token);

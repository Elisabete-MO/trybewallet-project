// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PERSONAL = 'ADD_PERSONAL';

export const addEmailAction = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addPersonalAction = (payload) => ({
  type: ADD_PERSONAL,
  payload,
});

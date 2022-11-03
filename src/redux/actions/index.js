// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmailAction = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return dispatch(addCurrencies(json));
};

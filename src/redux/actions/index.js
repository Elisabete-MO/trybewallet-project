// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSES = 'DEL_EXPENSES';

export const addEmailAction = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return dispatch(addCurrencies(json));
};

export const addExpenses = (payload, moedas) => ({
  type: ADD_EXPENSES,
  payload,
  moedas,
});

export const deleteExpenses = (payload) => ({
  type: DEL_EXPENSES,
  payload,
});

export const fetchExpenses = (payload) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return dispatch(addExpenses(payload, json));
};

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_CURRENCIES, REQUEST_CURRENCIES, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  const { payload, moedas } = action;
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case ADD_CURRENCIES:
    return { ...state,
      currencies: Object.keys(payload).filter((e) => e !== 'USDT'),
    };
  case ADD_EXPENSES:
    return { ...state,
      expenses: [
        ...state.expenses,
        { id: payload.id,
          value: payload.value,
          currency: payload.currency,
          method: payload.method,
          tag: payload.tag,
          description: payload.description,
          exchangeRates: moedas,
        }],
    };
  default:
    return state;
  }
};

export default wallet;

// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state,
      email: payload.email,
    };
  default:
    return state;
  }
};

export default user;

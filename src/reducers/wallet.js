const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies, // action deve ter chave currencies com o resultado da API
    };
  default:
    return state;
  }
};

export default walletReducer;

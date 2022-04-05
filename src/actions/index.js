// Coloque aqui suas actions

export const addEmail = (stateEmail) => ({
  type: 'ADD_EMAIL',
  email: stateEmail,
  currencies: [],
  expenses: [],
});

export const requestCurrencies = () => ({
  type: 'BEGIN_REQUEST',
  isFetching: true,
});

export const receiveCurrencies = (currencies) => ({
  type: 'ADD_CURRENCIES',
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const dataKeys = Object.keys(data);
        const filteredDataKeys = dataKeys.filter((key) => key !== 'USDT');
        dispatch(receiveCurrencies(filteredDataKeys));
      });
  };
}

export const submitAction = (expenses) => ({
  type: 'SUBMIT_ACTION',
  expenses,
});

export const deleteExpenseAction = (id) => ({
  type: 'DELETE_EXPENSE',
  id,
});

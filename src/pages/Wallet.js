import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, submitAction, deleteExpenseAction } from '../actions';

const lintInsuportavel = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      idState: 0,
      valueState: 0,
      descriptionState: '',
      currencyState: 'USD',
      methodState: 'Dinheiro',
      tagState: lintInsuportavel,
      total: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteExpenseComplete = this.deleteExpenseComplete.bind(this);
  }

  componentDidMount() {
    const { addCurrenciesToStore } = this.props;
    addCurrenciesToStore();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { currencyState, valueState, idState,
      total, descriptionState, methodState, tagState } = this.state;
    const { getExpenses } = this.props;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();

    const actionExpenses = {
      id: idState,
      value: valueState,
      description: descriptionState,
      currency: currencyState,
      method: methodState,
      tag: tagState,
      exchangeRates: responseJson };

    getExpenses(actionExpenses);

    const taxaConversao = parseFloat(responseJson[currencyState].ask);
    console.log(taxaConversao);
    const valorConvertido = taxaConversao * valueState;

    this.setState(({
      idState: idState + 1,
      valueState: 0,
      descriptionState: '',
      currencyState: 'USD',
      methodState: 'Dinheiro',
      tagState: lintInsuportavel,
      total: total + valorConvertido,
    }));
  }

  deleteExpenseComplete(id, valorConvertido) {
    const { deleteExpense } = this.props;
    const { total } = this.state;
    this.setState({
      total: Math.abs(total - valorConvertido),
    });
    deleteExpense(id);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { valueState, descriptionState, currencyState,
      methodState, tagState, total } = this.state;
    return (
      <div>
        <header data-testid="email-field">{ email }</header>
        TrybeWallet
        <form name="expense-form">

          <fieldset>
            <label htmlFor="expense-value">
              Valor:
              <input
                id="expense-value"
                data-testid="value-input"
                onChange={ this.handleChange }
                name="valueState"
                value={ valueState }
              />
            </label>

            <label htmlFor="expense-description">
              Descrição:
              <input
                id="expense-description"
                data-testid="description-input"
                onChange={ this.handleChange }
                name="descriptionState"
                value={ descriptionState }
              />
            </label>

            <label name="Moeda" htmlFor="select-moeda">
              Moeda
              <select
                id="select-moeda"
                onChange={ this.handleChange }
                name="currencyState"
                value={ currencyState }
              >
                {currencies.map((nome) => (
                  <option value={ nome } key={ nome }>
                    { nome }
                  </option>
                ))}
              </select>
            </label>

            <select
              data-testid="method-input"
              placeholder="Método de pagamento"
              name="methodState"
              onChange={ this.handleChange }
              value={ methodState }
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>

            <select
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tagState"
              value={ tagState }
            >
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saúde"> Saúde </option>
            </select>

          </fieldset>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((element) => {
                const { id, value, description,
                  currency, method, tag,
                  exchangeRates } = element;
                const valorConvertido = (parseFloat(exchangeRates[currency].ask)
                  * parseFloat(value)).toFixed(2);
                return (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>
                      { method }
                    </td>
                    <td>{ parseFloat(value).toFixed(2) }</td>
                    <td>{ exchangeRates[currency].name.split('/')[0] }</td>
                    <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                    <td>
                      { valorConvertido }
                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.deleteExpenseComplete(id, valorConvertido) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div data-testid="total-field" name="total">
          { total.toFixed(2) }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrenciesToStore: () => dispatch(fetchCurrencies()),
  getExpenses: (expenses) => dispatch(submitAction(expenses)),
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCurrenciesToStore: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      currency: PropTypes.string,
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

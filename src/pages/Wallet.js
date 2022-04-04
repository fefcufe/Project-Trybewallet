import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, submitAction } from '../actions';

const lintInsuportavel = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: lintInsuportavel,
      total: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const { currency, value, id, total, description, method, tag } = this.state;
    const { getExpenses } = this.props;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJson = await response.json();

    const actionExpenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: responseJson };

    getExpenses(actionExpenses);

    const taxaConversao = Number(responseJson[currency].ask);
    const valorConvertido = taxaConversao * value;

    this.setState(({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: lintInsuportavel,
      total: total + valorConvertido,
    }));
  }

  render() {
    const { email, currencies } = this.props;
    const { value, description, currency, method, tag, total } = this.state;
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
                name="value"
                value={ value }
              />
            </label>

            <label htmlFor="expense-description">
              Descrição:
              <input
                id="expense-description"
                data-testid="description-input"
                onChange={ this.handleChange }
                name="description"
                value={ description }
              />
            </label>

            <label name="Moeda" htmlFor="select-moeda">
              Moeda
              <select
                id="select-moeda"
                onChange={ this.handleChange }
                name="currency"
                value={ currency }
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
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>

            <select
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCurrenciesToStore: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

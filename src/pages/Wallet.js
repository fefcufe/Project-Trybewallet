import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrenciesToStore } = this.props;
    addCurrenciesToStore();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header data-testid="email-field">{ email }</header>
        TrybeWallet
        <form name="expense-form">

          <fieldset>
            <label htmlFor="expense-value">
              Valor:
              <input id="expense-value" data-testid="value-input" />
            </label>

            <label htmlFor="expense-description">
              Descrição:
              <input id="expense-description" data-testid="description-input" />
            </label>

            <label name="Moeda" htmlFor="select-moeda">
              Moeda
              <select
                id="select-moeda"
                placeholder="Escolha a moeda"
              >
                {currencies.map((nome) => (
                  <option value={ nome } key={ nome }>
                    { nome }
                  </option>
                ))}
              </select>
            </label>

            <select data-testid="method-input">
              <option> Dinheiro </option>
              <option> Cartão de crédito </option>
              <option> Cartão de débito </option>
            </select>

            <select data-testid="tag-input">
              <option> Alimentação </option>
              <option> Lazer </option>
              <option> Trabalho </option>
              <option> Transporte </option>
              <option> Saúde </option>
            </select>

          </fieldset>

        </form>
        <div data-testid="total-field">
          0
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
});

const mapDispatchToProps = (dispatch) => ({
  addCurrenciesToStore: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCurrenciesToStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

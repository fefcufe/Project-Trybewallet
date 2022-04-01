import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail, fetchCurrencies } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      componentStatemail: '',
      password: '',
      isButtonDisabled: true,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.validateLoginButton = this.validateLoginButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onEmailChange({ target }) {
    const { value } = target;
    this.setState({
      componentStatemail: value,
    }, this.validateLoginButton);
  }

  onPasswordChange({ target }) {
    const { value } = target;
    this.setState({
      password: value,
    }, this.validateLoginButton);
  }

  validateLoginButton() {
    // Regular expression obtida de https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

    const { componentStatemail, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidation = emailRegex.test(componentStatemail);
    const maxPasswordLength = 6;
    const passwordValidation = password.length >= maxPasswordLength;
    if (emailValidation && passwordValidation) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleClick() {
    const { history, addEmailtoStore } = this.props;
    const { componentStatemail } = this.state;
    addEmailtoStore(componentStatemail);
    history.push('/carteira');
  }

  render() {
    const { componentStatemail, password, isButtonDisabled } = this.state;

    return (

      <div className="login">
        <h3>Login</h3>
        <input
          data-testid="email-input"
          placeholder="email"
          onChange={ this.onEmailChange }
          value={ componentStatemail }
          type="email"
        />

        <input
          data-testid="password-input"
          placeholder="password"
          onChange={ this.onPasswordChange }
          value={ password }
          type="password"
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  addEmailtoStore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmailtoStore: (stateEmail) => dispatch(addEmail(stateEmail)),
  addCurrenciesToStore: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Login);

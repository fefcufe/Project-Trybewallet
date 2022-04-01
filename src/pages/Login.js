import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.validateLoginButton = this.validateLoginButton.bind(this);
  }

  onEmailChange({ target }) {
    const { value } = target;
    this.setState({
      email: value,
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

    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidation = emailRegex.test(email);
    const maxPasswordLength = 6;
    const passwordValidation = password.length >= maxPasswordLength;
    if (emailValidation && passwordValidation) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const handleClick = () => {
      const { history } = this.props;
      history.push('/carteira');
    };

    return (

      <div className="login">
        <h3>Login</h3>
        <input
          data-testid="email-input"
          placeholder="email"
          onChange={ this.onEmailChange }
          value={ email }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/login.css';

class Login extends React.Component {
  state = {
    name: '',
    btnDisabled: true,
    isLoading: false,
    redirect: false,
  };

  activateBtn = () => {
    const { name } = this.state;
    const minNameSize = 3;
    if (name.length >= minNameSize) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value }, () => this.activateBtn());
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ redirect: true });
  };

  render() {
    const { btnDisabled, isLoading, redirect } = this.state;
    return (
      <Route exact path="/">
        {isLoading ? <Loading /> : (
          <div id="page-login">
            <img
              id="image-login"
              src="https://www.svgrepo.com/show/486358/music.svg"
              alt="Ícone da página"
            />
            <h1 id="title-login">TrybeTunes</h1>
            <form>
              <label htmlFor="name-login-input">
                <input
                  id="name-login-input"
                  type="text"
                  placeholder="Digitar nome"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </Route>
    );
  }
}

export default Login;

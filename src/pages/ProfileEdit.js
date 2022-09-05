import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    image: '',
    email: '',
    description: '',
    loading: false,
    redirect: false,
    btnDisabled: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, image, email, description } = await user;
    this.setState(
      { name, image, email, description, loading: false },
      () => this.verifyInputs(),
    );
  }

  handleChange = (event) => {
    const { target: { id, value } } = event;
    this.setState({ [id]: value }, () => this.verifyInputs());
  };

  verifyInputs = () => {
    const { name, image, email, description } = this.state;
    const result = (name.length > 0)
    && (image.length > 0)
    && (email.length > 0)
    && (description.length > 0);
    const verifyEmail = email.includes('@');
    return (result && verifyEmail) ? this.setState({ btnDisabled: false })
      : this.setState({ btnDisabled: true });
  };

  handleClick = async () => {
    this.setState({ loading: true });
    const { name, image, email, description } = this.state;
    await updateUser({ name, image, email, description });
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const { redirect, loading, btnDisabled,
      name, image, email, description } = this.state;
    return (
      <Route path="/profile/edit">
        { loading ? <Loading /> : (
          <div data-testid="page-profile-edit">
            <h1>Profile Edit</h1>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                id="name"
                value={ name }
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="edit-input-email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                data-testid="edit-input-description"
                id="description"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
            <label htmlFor="image">
              <input
                id="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ btnDisabled }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </div>)}
        {redirect && <Redirect exact to="/profile" />}
      </Route>
    );
  }
}

export default ProfileEdit;

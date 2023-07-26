import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
          <div>
            <h1>Profile Edit</h1>
            <label htmlFor="name">
              Nome:
              <input
                id="name"
                value={ name }
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                id="email"
                value={ email }
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                id="description"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
            <label htmlFor="image">
              <input
                id="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
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

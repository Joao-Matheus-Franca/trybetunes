import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/profileEdit.css';

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
          <div id="main-profile-edit">
            <h2 id="title-profile-edit">Editar perfil</h2>
            <form id="edit-form">
              <label className="edit-label" htmlFor="name">
                Nome:
                <input
                  className="edit-input"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                  type="text"
                />
              </label>
              <label className="edit-label" htmlFor="email">
                E-mail:
                <input
                  className="edit-input"
                  id="email"
                  value={ email }
                  onChange={ this.handleChange }
                  type="text"
                />
              </label>
              <label className="edit-label" htmlFor="description">
                Descrição:
                <textarea
                  className="edit-input"
                  id="description"
                  onChange={ this.handleChange }
                  value={ description }
                />
              </label>
              <label className="edit-label" htmlFor="image">
                Imagem de perfil:
                <input
                  className="edit-input"
                  id="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                id="save-profile-infos"
                type="button"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </form>
          </div>)}
        {redirect && <Redirect exact to="/profile" />}
      </Route>
    );
  }
}

export default ProfileEdit;

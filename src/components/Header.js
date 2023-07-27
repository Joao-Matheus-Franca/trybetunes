import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/header.css';

class Header extends React.Component {
  state = {
    user: '',
    isLoading: true,
  };

  async componentDidMount() {
    const userData = await getUser();
    this.setState({ user: userData.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <header id="header">
            <div id="title-image-header">
              <h1 id="title-header">TrybeTunes</h1>
              <img
                id="image-header"
                src="https://www.svgrepo.com/show/486358/music.svg"
                alt="Ícone da página"
              />
            </div>
            <nav id="navbar-header">
              <Link className="navbar-button-header" to="/search">Pesquisar</Link>
              <Link className="navbar-button-header" to="/favorites">Favoritos</Link>
              <Link className="navbar-button-header" to="/profile">Perfil</Link>
              <p id="user-name-header">{ `Usuário: ${user}`}</p>
            </nav>
          </header>)
    );
  }
}

export default Header;
